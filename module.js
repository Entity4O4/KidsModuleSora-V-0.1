/* Anime & Cartoons v0.8
   Curated catalog + official viewing guides + direct-MP4 diagnostic.
   The diagnostic is a sample video, NOT an anime episode.
*/

var SHOWS = [
 ['Naruto','Naruto'],
 ['Naruto Shippuden','Naruto'],
 ['Boruto','Naruto'],
 ['Naruto Movies','Naruto'],

 ['Dragon Ball','Dragon Ball'],
 ['Dragon Ball Z','Dragon Ball'],
 ['Dragon Ball Kai','Dragon Ball'],
 ['Dragon Ball Super','Dragon Ball'],
 ['Dragon Ball Daima','Dragon Ball'],
 ['Dragon Ball Movies','Dragon Ball'],

 ['Demon Slayer','Demon Slayer'],
 ['Demon Slayer Movies','Demon Slayer'],

 ['Pokémon','Pokémon'],
 ['Pokémon Movies','Pokémon'],

 ['Beyblade','Beyblade'],
 ['Beyblade Metal Fusion','Beyblade'],
 ['Beyblade Burst','Beyblade'],
 ['Beyblade X','Beyblade'],
 ['Beyblade Movies','Beyblade'],

 ['Ninjago','Ninjago'],
 ['Ninjago Dragons Rising','Ninjago'],
 ['Ninjago Movies','Ninjago'],

 ['Sonic Boom','Sonic'],
 ['Sonic Prime','Sonic'],
 ['Sonic Movies','Sonic'],

 ['Trollhunters','Tales of Arcadia'],
 ['3Below','Tales of Arcadia'],
 ['Wizards Tales of Arcadia','Tales of Arcadia'],
 ['Trollhunters Rise of the Titans','Tales of Arcadia'],

 ['Transformers Prime','Transformers Prime'],
 ['Transformers Prime Beast Hunters Predacons Rising','Transformers Prime'],

 ['Playback Test - Flower MP4','Playback Test']
];

var COVER =
 'https://raw.githubusercontent.com/Entity4O4/KidsModuleSora-V-0.1/main/cover.png';

var TEST_TITLE = 'Playback Test - Flower MP4';

/*
 * These are official information/viewing-guide pages.
 * They are NOT direct video streams.
 */
var OFFICIAL_GUIDES = {
 'Naruto':
  'https://naruto-official.com/en/anime',

 'Pokémon':
  'https://www.pokemon.com/es/dibujos-animados/donde-ver-los-episodios-y-peliculas-pokemon',

 'Demon Slayer':
  'https://demonslayer-anime.com/'
};

/*
 * Diagnostic only.
 * This is MDN's flower sample video, not Big Buck Bunny
 * and not an anime episode.
 */
var OFFICIAL_EPISODES = {};

OFFICIAL_EPISODES[TEST_TITLE] = [
 {
  number: '1',
  season: 1,
  sources: [
   {
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    test: true,
    provider: 'MDN sample video'
   }
  ]
 }
];

/*
 * Accept either:
 * 1. Explicitly marked diagnostic media; or
 * 2. A future stream with a declared audio/subtitle preference.
 *
 * Only direct HTTPS MP4/HLS links pass this check.
 * A normal webpage URL is not a video stream.
 */
function approvedEpisode(ep) {
 if (!ep) return false;

 var validUrl =
  /^https:\/\/[^\s]+\.(mp4|m3u8)(?:[?#][^\s]*)?$/i.test(ep.url || '');

 if (!validUrl) return false;

 if (ep.test === true) return true;

 return /^(en-official|ja-en-sub)$/.test(ep.audio || '');
}

function orderedCandidates(entry) {
 var candidates = Array.isArray(entry.sources)
  ? entry.sources
  : [entry];

 return candidates
  .filter(approvedEpisode)
  .sort(function(a, b) {
   var priority = {
    'en-official': 0,
    'ja-en-sub': 1
   };

   return (priority[a.audio] === undefined ? 99 : priority[a.audio]) -
          (priority[b.audio] === undefined ? 99 : priority[b.audio]);
  });
}

function availableEntries(title) {
 return (OFFICIAL_EPISODES[title] || []).filter(function(ep) {
  return ep && orderedCandidates(ep).length > 0;
 });
}

function catalogUrl(i) {
 return 'https://catalog.invalid/title/' + i;
}

function catalogIndex(url) {
 var m = String(url || '').match(
  /^https:\/\/catalog\.invalid\/title\/(\d+)$/
 );

 var n = m ? Number(m[1]) : -1;

 return n >= 0 && n < SHOWS.length ? n : -1;
}

function episodeUrl(i, j) {
 return 'https://catalog.invalid/episode/' + i + '/' + j;
}

function episodeLookup(url) {
 var m = String(url || '').match(
  /^https:\/\/catalog\.invalid\/episode\/(\d+)\/(\d+)$/
 );

 if (!m) return null;

 var i = Number(m[1]);
 var j = Number(m[2]);

 if (i < 0 || i >= SHOWS.length) return null;

 return availableEntries(SHOWS[i][0])[j] || null;
}

async function searchResults(keyword) {
 var q = String(keyword || '').toLowerCase().trim();
 var out = [];

 for (var i = 0; i < SHOWS.length; i++) {
  var title = SHOWS[i][0];
  var group = SHOWS[i][1];

  if (
   !q ||
   title.toLowerCase().indexOf(q) !== -1 ||
   group.toLowerCase().indexOf(q) !== -1
  ) {
   out.push({
    title: title,
    image: COVER,
    href: catalogUrl(i)
   });
  }
 }

 return JSON.stringify(out);
}

async function extractDetails(url) {
 var i = catalogIndex(url);

 if (i < 0) return JSON.stringify([]);

 var title = SHOWS[i][0];
 var group = SHOWS[i][1];
 var description;

 if (title === TEST_TITLE) {
  description =
   'Temporary playback diagnostic using MDN sample flower.mp4. ' +
   'This is a test video, not an anime episode.';
 } else {
  description =
   title +
   ' — catalog entry. Episodes will appear when compatible, ' +
   'authorized direct video streams are configured.';

  var guide = OFFICIAL_GUIDES[group];

  if (guide) {
   description += ' Official information/viewing guide: ' + guide;
  } else {
   description +=
    ' Check the rights holder or licensed streaming services ' +
    availableForRegionText() + '.';
  }
 }

 return JSON.stringify([
  {
   description: description,
   aliases: group,
   airdate: ''
  }
 ]);
}

function availableForRegionText() {
 return 'available in your region';
}

async function extractEpisodes(url) {
 var i = catalogIndex(url);

 if (i < 0) return JSON.stringify([]);

 var eps = availableEntries(SHOWS[i][0]);
 var out = [];

 for (var j = 0; j < eps.length; j++) {
  out.push({
   href: episodeUrl(i, j),
   number: String(eps[j].number || j + 1),
   season: String(eps[j].season || 1)
  });
 }

 return JSON.stringify(out);
}

async function extractStreamUrl(url) {
 var ep = episodeLookup(url);

 if (!ep) return null;

 var candidates = orderedCandidates(ep);

 return candidates.length ? candidates[0].url : null;
}
