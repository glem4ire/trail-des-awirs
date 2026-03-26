// gpx.js — Visualisation des tracés GPX dans les cartes parcours
// Ce script charge les fichiers GPX et affiche :
//   - par défaut : une carte interactive (Leaflet + OpenStreetMap fond sombre)
//   - au clic sur "Profil" : un graphique SVG de l'altitude sur le parcours
// Il dépend de Leaflet.js qui doit être chargé avant ce fichier.

(function () {

  // Association index → fichier GPX (0 = 6km, 1 = 12km, 2 = 21km)
  var FILES = [
    'gpx/Awirs Trail 6km.gpx',
    'gpx/Awirs Trail 12km.gpx',
    'gpx/Awirs Trail 21km.gpx'
  ];

  // Couleur orange du design, réutilisée pour les tracés et les graphiques
  var ORANGE = '#e8703a';


  // ─── 1. LECTURE DU FICHIER GPX ───────────────────────────────────────────
  // Un fichier GPX est un fichier XML. Il contient des balises <trkpt> (track point)
  // avec la latitude, la longitude et l'altitude de chaque point du tracé.
  // Cette fonction lit ce XML et retourne un tableau d'objets {lat, lon, ele}.

  function parseGPX(text) {
    // DOMParser transforme le texte XML en un objet manipulable par JavaScript
    var doc = new DOMParser().parseFromString(text, 'application/xml');

    // getElementsByTagName fonctionne même si le XML a un namespace (xmlns=...)
    var nodes = doc.getElementsByTagName('trkpt');
    var pts = [];

    for (var i = 0; i < nodes.length; i++) {
      var pt = nodes[i];
      var eleNodes = pt.getElementsByTagName('ele');
      pts.push({
        lat: parseFloat(pt.getAttribute('lat')),   // latitude  (Nord/Sud)
        lon: parseFloat(pt.getAttribute('lon')),   // longitude (Est/Ouest)
        ele: eleNodes.length ? parseFloat(eleNodes[0].textContent) : 0  // altitude (mètres)
      });
    }
    return pts;
  }


  // ─── 2. CARTE LEAFLET ────────────────────────────────────────────────────
  // Leaflet est une bibliothèque JavaScript qui affiche des cartes interactives.
  // On utilise les tuiles CartoDB "Dark Matter" (fond noir) pour coller au design du site.
  // Le tracé du parcours est dessiné en orange par-dessus la carte.

  function buildMap(divId, pts) {
    var map = L.map(divId, {
      scrollWheelZoom: false,  // désactivé pour éviter le zoom accidentel en scrollant la page
      zoomControl: false       // on retire les boutons +/- pour économiser l'espace
    });

    // Fond de carte sombre de CartoDB (licence libre, attribution requise)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Convertit nos points {lat, lon} en format [[lat, lon]] attendu par Leaflet
    var latlngs = pts.map(function (p) { return [p.lat, p.lon]; });

    // Dessine le tracé du parcours sous forme de ligne orange
    var line = L.polyline(latlngs, { color: ORANGE, weight: 3, opacity: 0.9 }).addTo(map);

    // Ajuste automatiquement le zoom pour que tout le parcours soit visible
    map.fitBounds(line.getBounds(), { padding: [12, 12] });

    // Petit cercle orange pour marquer le point de départ
    L.circleMarker(latlngs[0], {
      radius: 5,
      fillColor: ORANGE,
      color: '#fff',
      weight: 2,
      fillOpacity: 1
    }).addTo(map);

    return map;  // on retourne la carte pour pouvoir appeler invalidateSize() plus tard
  }


  // ─── 3. PROFIL D'ALTITUDE SVG ────────────────────────────────────────────
  // SVG (Scalable Vector Graphics) est un format de dessin vectoriel.
  // On dessine le graphique directement dans le navigateur en calculant
  // les coordonnées de chaque point à partir des altitudes du GPX.
  // Le résultat : une courbe orange qui monte et descend selon le terrain.

  function buildElevation(divId, pts) {
    var div = document.getElementById(divId);
    if (!div || !pts.length) return;

    // Dimensions de l'espace de dessin SVG (viewBox fixe, le SVG s'étire via CSS width:100%)
    var VW = 400, VH = 120;
    // Marges internes pour laisser de la place aux labels d'altitude
    var P = { t: 14, r: 8, b: 20, l: 36 };

    // Trouve l'altitude mini et maxi pour calibrer l'échelle verticale
    var eles = pts.map(function (p) { return p.ele; });
    var lo    = Math.min.apply(null, eles);
    var hi    = Math.max.apply(null, eles);
    var range = hi - lo || 1;  // évite la division par zéro si tous les points sont à la même altitude

    // Dimensions intérieures (zone de dessin sans les marges)
    var iW = VW - P.l - P.r;
    var iH = VH - P.t - P.b;

    // Calcule la position horizontale (x) d'un point selon son index dans le tableau
    // On protège contre la division par zéro si le tracé n'a qu'un seul point
    var denomX = pts.length > 1 ? pts.length - 1 : 1;
    function px(i)   { return P.l + (i / denomX) * iW; }
    // Calcule la position verticale (y) selon l'altitude (plus haut = y plus petit en SVG)
    function py(ele) { return P.t + (1 - (ele - lo) / range) * iH; }

    // Construit la séquence de commandes SVG pour tracer la courbe
    // "M" = moveto (premier point), "L" = lineto (points suivants)
    var linePath = pts.map(function (p, i) {
      return (i === 0 ? 'M' : 'L') + px(i).toFixed(1) + ',' + py(p.ele).toFixed(1);
    }).join(' ');

    // Ferme la zone sous la courbe pour créer un remplissage (aire)
    var areaPath = linePath
      + ' L' + px(pts.length - 1).toFixed(1) + ',' + (P.t + iH).toFixed(1)
      + ' L' + P.l.toFixed(1)                + ',' + (P.t + iH).toFixed(1)
      + ' Z';  // Z = ferme le chemin

    // Injecte le SVG dans le div
    div.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg"' +
      ' width="100%" height="' + VH + '" viewBox="0 0 ' + VW + ' ' + VH + '"' +
      ' preserveAspectRatio="none">' +   // "none" = étire horizontalement pour remplir la largeur

      // Zone remplie sous la courbe (orange très transparent)
      '<path d="' + areaPath + '" fill="' + ORANGE + '" fill-opacity="0.12"/>' +

      // Ligne de base horizontale en bas du graphique
      '<line x1="' + P.l + '" y1="' + (P.t + iH) + '"' +
      ' x2="' + (P.l + iW) + '" y2="' + (P.t + iH) + '"' +
      ' stroke="rgba(240,232,213,0.15)" stroke-width="1"/>' +

      // Courbe d'altitude en orange
      '<path d="' + linePath + '" fill="none" stroke="' + ORANGE + '" stroke-width="1.8"/>' +

      // Label de l'altitude maximale (affiché en haut à gauche)
      '<text x="' + (P.l - 4) + '" y="' + (P.t + 4) + '" text-anchor="end"' +
      ' fill="rgba(240,232,213,0.4)" font-size="9" font-family="DM Sans,sans-serif">' +
      Math.round(hi) + 'm</text>' +

      // Label de l'altitude minimale (affiché en bas à gauche)
      '<text x="' + (P.l - 4) + '" y="' + (P.t + iH + 4) + '" text-anchor="end"' +
      ' fill="rgba(240,232,213,0.4)" font-size="9" font-family="DM Sans,sans-serif">' +
      Math.round(lo) + 'm</text>' +

      '</svg>';
  }


  // ─── 4. ONGLETS DE BASCULE ───────────────────────────────────────────────
  // Gère le clic sur "Carte" ou "Profil" pour afficher l'une ou l'autre visualisation.
  // Le profil SVG est généré à la demande (pas avant le premier clic) pour éviter
  // de calculer les coordonnées sur un div encore invisible (largeur = 0).

  function setupToggle(i, pts, map) {
    var btnMap  = document.querySelector('.viz-tab[data-viz="' + i + '"][data-tab="map"]');
    var btnElev = document.querySelector('.viz-tab[data-viz="' + i + '"][data-tab="elev"]');
    var divMap  = document.getElementById('viz-map-'  + i);
    var divElev = document.getElementById('viz-elev-' + i);
    if (!btnMap || !btnElev) return;

    // Clic sur "Carte" → affiche la carte, masque le profil
    btnMap.addEventListener('click', function () {
      divMap.style.display  = '';
      divElev.style.display = 'none';
      btnMap.classList.add('viz-tab--active');
      btnElev.classList.remove('viz-tab--active');
      // Leaflet doit recalculer la taille si son container était caché
      map.invalidateSize();
    });

    // Clic sur "Profil" → masque la carte, affiche et génère le profil SVG
    btnElev.addEventListener('click', function () {
      divMap.style.display  = 'none';
      divElev.style.display = '';
      btnMap.classList.remove('viz-tab--active');
      btnElev.classList.add('viz-tab--active');
      // Génère le SVG seulement la première fois (dataset.done = marqueur booléen)
      if (!divElev.dataset.done) {
        buildElevation('viz-elev-' + i, pts);
        divElev.dataset.done = '1';
      }
    });
  }


  // ─── 5. INITIALISATION ───────────────────────────────────────────────────
  // Boucle sur les 3 fichiers GPX, les télécharge, les parse,
  // puis crée la carte et prépare les onglets pour chaque parcours.

  function init() {
    FILES.forEach(function (file, i) {
      // fetch() télécharge le fichier GPX depuis le serveur local
      fetch(file)
        .then(function (response) { return response.text(); })
        .then(function (xml) {
          var pts = parseGPX(xml);
          if (!pts.length) return;

          // Crée la carte Leaflet (visible par défaut)
          var map = buildMap('viz-map-' + i, pts);

          // Le profil est masqué au départ (généré à la demande)
          var divElev = document.getElementById('viz-elev-' + i);
          if (divElev) divElev.style.display = 'none';

          // Branche les onglets de bascule
          setupToggle(i, pts, map);
        })
        .catch(function () {
          // Si le fichier GPX est introuvable, masque discrètement la zone de viz
          var viz = document.querySelector('.parcours-viz[data-parcours="' + i + '"]');
          if (viz) viz.style.display = 'none';
        });
    });
  }

  // Attend que toute la page HTML soit chargée avant de démarrer
  document.addEventListener('DOMContentLoaded', init);

})();
