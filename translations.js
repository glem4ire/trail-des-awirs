// translations.js — Toutes les traductions FR/NL du site Trail des Awirs
//
// COMMENT ÇA MARCHE :
// La fonction _t(clé, texte FR, texte NL) enregistre les deux traductions
// d'un coup. Résultat : pour modifier un texte, les deux langues sont
// côte à côte — pas besoin de scroller dans le fichier.
//
// POUR AJOUTER UN NOUVEAU TEXTE :
// 1. Ajouter un appel _t('section.cle', 'Texte FR', 'Texte NL') ici
// 2. Ajouter data-i18n="section.cle" sur l'élément HTML correspondant

// Objet qui contiendra toutes les traductions, rempli par _t() ci-dessous
var translations = { fr: {}, nl: {} };

// Fonction utilitaire : enregistre une traduction FR et NL pour la même clé
function _t(key, fr, nl) {
  translations.fr[key] = fr;
  translations.nl[key] = nl;
}


/* ═══════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════ */

_t('nav.parcours',           'Parcours',                'Parcours');
_t('nav.horaires',           'Horaires',                'Tijdschema');
_t('nav.inscrire',           "S'inscrire",              'Inschrijven');


/* ═══════════════════════════════════════════════════════════════════
   HERO — Bloc d'accroche en haut de page
   ═══════════════════════════════════════════════════════════════════ */

_t('hero.title',             'TRAIL<br>DES<br>AWIRS',   'TRAIL<br>DES<br>AWIRS');
_t('hero.date',              '22 Août 2026',            '22 Augustus 2026');

_t('hero.sub',
  "Un trail accessible et authentique au cœur des sentiers vallonnés et techniques des Awirs. Trois parcours, une ambiance chaleureuse, bar et barbecue pour finir.",
  'Een toegankelijke en authentieke trail in het hart van de glooiende en technische paden van de Awirs. Drie parcours, een warme sfeer, bar en barbecue achteraf.');

_t('hero.btn.primary',       "S'inscrire maintenant",   'Nu inschrijven');
_t('hero.btn.secondary',     'Voir les parcours',       'Bekijk de parcours');

/* Chiffres-clés affichés à droite du hero (desktop uniquement) */
_t('hero.stat.participants.num', '+200',                 '+200');
_t('hero.stat.participants',     'Participants',         'Deelnemers');
_t('hero.stat.parcours.num',     '3',                    '3');
_t('hero.stat.parcours',         'Parcours',             'Parcours');
_t('hero.stat.distance.num',     '21km',                 '21km');
_t('hero.stat.distance',         'Max distance',         'Max afstand');


/* ═══════════════════════════════════════════════════════════════════
   ONGLETS VISUALISATION GPX (Carte / Profil)
   ═══════════════════════════════════════════════════════════════════ */

_t('viz.map',                'Carte',                   'Kaart');
_t('viz.elev',               'Profil',                  'Profiel');


/* ═══════════════════════════════════════════════════════════════════
   SECTION PARCOURS — Titres et descriptions des 3 parcours
   ═══════════════════════════════════════════════════════════════════ */

_t('parcours.label',         'Les parcours',            'De parcours');
_t('parcours.title',         '3 PARCOURS<br>POUR TOUS', '3 PARCOURS<br>VOOR IEDEREEN');

/* Labels communs aux stats de chaque parcours */
_t('stat.denivele',          'Dénivelé',                'Hoogteverschil');
_t('stat.depart',            'Départ',                  'Start');
_t('stat.ravitaillement',    'Ravitaillement',          'Bevoorradingspost');
_t('stat.ravitaillement.val','1 point',                 '1 post');

/* --- Parcours 01 : Promenade / Débutant (6 km) --- */
_t('parcours.01.distance',       '6 km',                '6 km');
_t('parcours.01.nom',            'Promenade · Débutant', 'Wandeling · Beginner');
_t('parcours.01.desc',
  "Un tracé simple et accessible, ouvert à tous y compris aux marcheurs et participants accompagnés de leur chien. Esprit convivial et familial.",
  'Een eenvoudig en toegankelijk traject, open voor iedereen inclusief wandelaars en deelnemers met hun hond. Gezellige en familiale sfeer.');
_t('parcours.01.denivele.val',   '144 m D+',            '144 m D+');
_t('parcours.01.depart.val',     '15h15',               '15u15');

/* --- Parcours 02 : Confirmé (12 km) --- */
_t('parcours.02.distance',       '12 km',               '12 km');
_t('parcours.02.nom',            'Confirmé',            'Gevorderd');
_t('parcours.02.desc',
  "Un parcours vallonné avec un dénivelé marqué et quelques passages techniques. Idéal pour vivre une vraie expérience trail sur une distance stimulante.",
  'Een glooiend parcours met een uitgesproken hoogteverschil en enkele technische passages. Ideaal voor een echte trail-ervaring op een uitdagende afstand.');
_t('parcours.02.denivele.val',   '220 m D+',            '220 m D+');
_t('parcours.02.depart.val',     '15h15',               '15u15');

/* --- Parcours 03 : Expert (21 km) --- */
_t('parcours.03.distance',       '21 km',               '21 km');
_t('parcours.03.nom',            'Expert',              'Expert');
_t('parcours.03.desc',
  "Un tracé long, technique et exigeant au cœur des reliefs des Awirs. Pour les coureurs en quête de dépassement sur des sentiers engagés et variés.",
  'Een lang, technisch en veeleisend traject in het hart van de heuvels van de Awirs. Voor lopers op zoek naar een uitdaging op gevarieerde paden.');
_t('parcours.03.denivele.val',   '700 m D+',            '700 m D+');
_t('parcours.03.depart.val',     '15h00',               '15u00');


/* ═══════════════════════════════════════════════════════════════════
   SECTION HORAIRES — Programme de la journée
   ═══════════════════════════════════════════════════════════════════ */

_t('horaires.label',         'Programme de la journée',  'Programma van de dag');
_t('horaires.title',         'HORAIRES',                 'TIJDSCHEMA');

/* Chaque créneau a une heure (.time) et un événement */
_t('horaires.13h.time',      '13h00',                    '13u00');
_t('horaires.13h',           'Ouverture<br>des inscriptions', 'Opening<br>inschrijvingen');

_t('horaires.15h.time',      '15h00',                    '15u00');
_t('horaires.15h',           'Départ<br>21 km',          'Start<br>21 km');

_t('horaires.15h15.time',    '15h15',                    '15u15');
_t('horaires.15h15',         'Départ<br>12 km &amp; 6 km', 'Start<br>12 km &amp; 6 km');

_t('horaires.17h30.time',    '17h30',                    '17u30');
_t('horaires.17h30',         'Remise<br>des prix',       'Prijsuitreiking');


/* ═══════════════════════════════════════════════════════════════════
   SECTION ÉQUIPE ORGANISATRICE (Inkipit)
   ═══════════════════════════════════════════════════════════════════ */

_t('equipe.label',           "L'ORGANISATION",           'DE ORGANISATIE');
_t('equipe.title',           'INKIPIT',                  'INKIPIT');

_t('equipe.desc',
  "Bastian, Sébastien, Nicolas et Guillaume — quatre passionnés de trail qui ont décidé de faire découvrir les Awirs comme terrain de jeu. Une première édition lancée avec le cœur.",
  'Bastian, Sébastien, Nicolas en Guillaume — vier traillovers die de Awirs als speelterrein willen laten ontdekken. Een eerste editie vanuit het hart.');

_t('equipe.facebook',        'Suivez-nous sur Facebook', 'Volg ons op Facebook');
_t('equipe.instagram',       'Suivez-nous sur Instagram','Volg ons op Instagram');


/* ═══════════════════════════════════════════════════════════════════
   SECTION INSCRIPTION (CTA)
   ═══════════════════════════════════════════════════════════════════ */

_t('inscription.label',      "Rejoins l'aventure",       'Doe mee met het avontuur');
_t('inscription.title',      'PRÊT·E<br>À COURIR\u00a0?', 'KLAAR OM<br>TE LOPEN\u00a0?');

_t('inscription.text',
  "Les inscriptions sont gérées par O'top Services. Pré-inscris-toi en ligne ou directement sur place dès 13h le jour de l'événement.",
  "De inschrijvingen worden beheerd door O'top Services. Schrijf je online in of rechtstreeks ter plaatse vanaf 13u op de dag van het evenement.");

_t('inscription.btn',        "S'inscrire sur O'top Services →", 'Inschrijven via O\'top Services →');

/* Tooltip affiché au survol des boutons d'inscription désactivés (data-soon) */
_t('inscription.soon',       'Il faut encore attendre un peu\u00a0!', 'Nog even geduld\u00a0!');


/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */

_t('footer.info',
  'ASBL Inkipit — Contact : <a href="mailto:awirstrail@gmail.com">awirstrail@gmail.com</a>',
  'ASBL Inkipit — Contact : <a href="mailto:awirstrail@gmail.com">awirstrail@gmail.com</a>');


/* ═══════════════════════════════════════════════════════════════════
   LOGIQUE DE CHANGEMENT DE LANGUE
   Tout ce qui suit gère la bascule FR ↔ NL sur le site.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * setLang(lang) — Applique la langue choisie sur toute la page.
 *
 * Parcourt tous les éléments HTML qui ont un attribut data-i18n="clé"
 * et remplace leur contenu par la traduction correspondante.
 * Met aussi à jour les tooltips (data-i18n-tooltip) et le bouton FR/NL.
 *
 * @param {string} lang — 'fr' ou 'nl'
 */
function setLang(lang) {
  // Indique la langue active au navigateur (utile pour l'accessibilité et le SEO)
  document.documentElement.lang = lang;

  // Récupère le dictionnaire de la langue choisie
  var t = translations[lang];

  // Met à jour le texte de tous les éléments traduisibles
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Met à jour le texte du tooltip sur les liens désactivés (data-soon)
  // Le tooltip est stocké dans l'attribut data-tooltip, lu par le CSS (attr())
  document.querySelectorAll('[data-i18n-tooltip]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-tooltip');
    if (t[key] !== undefined) el.setAttribute('data-tooltip', t[key]);
  });

  // Le bouton affiche toujours la LANGUE ALTERNATIVE (celle vers laquelle on peut basculer)
  document.querySelector('.lang-toggle').textContent = lang === 'fr' ? 'NL' : 'FR';

  // Sauvegarde le choix dans le navigateur pour la prochaine visite
  try { localStorage.setItem('trail-lang', lang); } catch(e) {}
}

/**
 * Bloque le clic sur tous les liens marqués data-soon
 * (inscriptions pas encore ouvertes)
 */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-soon]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();  // empêche la navigation vers le lien
    });
  });
});

/**
 * toggleLang() — Bascule entre FR et NL.
 * Appelé au clic sur le bouton de langue dans la nav.
 */
function toggleLang() {
  setLang(document.documentElement.lang === 'fr' ? 'nl' : 'fr');
}

/**
 * Initialisation au chargement de la page.
 * On applique TOUJOURS setLang(), même pour le français.
 * Ainsi le texte affiché vient TOUJOURS de ce fichier (translations.js),
 * et jamais du texte par défaut écrit dans le HTML.
 */
(function() {
  var saved;
  try { saved = localStorage.getItem('trail-lang'); } catch(e) {}
  setLang(saved === 'nl' ? 'nl' : 'fr');
})();
