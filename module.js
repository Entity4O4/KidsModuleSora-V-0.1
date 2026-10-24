/* Anime & Cartoons v1.4
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

  ['Playback Test - Flower MP4','Playback Test'],
  ['Playback Test - Big Buck Bunny HLS','Playback Test'],
  ['Playback Test - Multiple Streams','Playback Test']
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
  'https://naruto-official.com/en/anime/naruto1',

 'Naruto Shippuden':
  'https://naruto-official.com/en/anime/naruto2',

 'Boruto':
  'https://naruto-official.com/en/anime/boruto',

 'Naruto Movies':
  'https://naruto-official.com/en/anime',

 'Pokémon':
  'https://parents.pokemon.com/es-es/animation/',

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
// v1.4 — Public HLS playback diagnostic
var HLS_TEST_TITLE = 'Playback Test - Big Buck Bunny HLS';

OFFICIAL_EPISODES[HLS_TEST_TITLE] = [
 {
  number: '1',
  season: 1,
  sources: [
   {
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    test: true,
    provider: 'Mux public HLS test stream'
   }
  ]
 }
];
var MULTI_TEST_TITLE = 'Playback Test - Multiple Streams';

OFFICIAL_EPISODES[MULTI_TEST_TITLE] = [
 {
  number: '1',
  season: 1,
  sources: [
   {
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    test: true,
    provider: 'MP4 test'
   },
   {
    url: 'https://yt.chocolatemoo53.com/api/manifest/hls_variant/expire/1792866794/ei/iqXcauKDDMu5ir4P1MTHwQo/ip/2602%3Afb54%3A1434%3A60cc%3Aff22%3Adbf5%3Ac2%3A2c05/id/6aacfe284f9ba4a4/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr5---sn-vgqsknde.googlevideo.com/cps/507/met/1792845194%2C/mh/aP/mm/18%2C29/mn/sn-vgqsknde%2Csn-vgqsrn6y/ms/aub%2Crdu/mv/m/mvi/5/pl/43/rms/aub%2Caub/hfr/1/demuxed/1/tts_caps/1/maudio/1/initcwndbps/2393125/bui/AWzQHwo4cslCpP-EiDttlp7BnrAXa42-_OYHVGdsSuaLpvibdn7RWtwnl9_7nnA-ClxyCvY7rQ-kFQtY/spc/mpRQ_8hQaAJjt6kfZCIm1YYUTCXbwyHsb5W8r9aIJsfu9-yohEyMKESSI4K2mOo/vprv/1/go/1/rqh/5/epbp/1/mt/1792844702/fvip/2/nvgoi/1/short_key/1/ncsapi/1/keepalive/yes/fexp/51565115/dover/13/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Chfr%2Cdemuxed%2Ctts_caps%2Cmaudio%2Cbui%2Cspc%2Cvprv%2Cgo%2Crqh%2Citag%2Cplaylist_type/sig/AE0s2JYwRQIgDjYDLzBXvPhfmoWH0YNMeBMr0GiH-evqujxNXCxo7d4CIQDokH0V4Kgac2fTF-uQOcyLoccdQH9ei56TUhTa79UYiQ%3D%3D/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRQIgCuuN_jvCRh6u27SbAA8FpW8iIptJQuaIkQvKpZBz3goCIQCIfEz7v9UfHG5m8cnZB-gU5PEZWCa7OIhpAGVgGnU_VA%3D%3D/file/index.m3u8',
    test: true,
    provider: 'HLS test'
   }
  ]
 }
];
// v1.4 — Authorized source registry
// This is source metadata, NOT a collection of playable episodes.

// v1.4 — Complete source registry
// Region codes are investigation targets, NOT confirmed availability.
// Empty arrays mean no source has been verified yet.

var SOURCE_REGISTRY = {
  'Naruto': [
    {
      provider: 'Naruto Official',
      region: ['ES', 'GB'],
      pageUrl: 'https://naruto-official.com/en/anime/naruto1',
      playback: 'external',
      verifiedStream: false
    }
  ],

  'Naruto Shippuden': [
    {
      provider: 'Naruto Official',
      region: ['ES', 'GB'],
      pageUrl: 'https://naruto-official.com/en/anime/naruto2',
      playback: 'external',
      verifiedStream: false
    }
  ],

  'Boruto': [
    {
      provider: 'Naruto Official',
      region: ['ES', 'GB'],
      pageUrl: 'https://naruto-official.com/en/anime/boruto',
      playback: 'external',
      verifiedStream: false
    }
  ],

  'Naruto Movies': [],

  'Dragon Ball': [],
  'Dragon Ball Z': [],
  'Dragon Ball Kai': [],
  'Dragon Ball Super': [],
  'Dragon Ball Daima': [],
  'Dragon Ball Movies': [],

  'Demon Slayer': [],
  'Demon Slayer Movies': [],

  'Pokémon': [],
  'Pokémon Movies': [],

  'Beyblade': [],
  'Beyblade Metal Fusion': [],
  'Beyblade Burst': [],
  'Beyblade X': [],
  'Beyblade Movies': [],

  'Ninjago': [],
  'Ninjago Dragons Rising': [],
  'Ninjago Movies': [],

  'Sonic Boom': [],
  'Sonic Prime': [],
  'Sonic Movies': [],

  'Trollhunters': [],
  '3Below': [],
  'Wizards Tales of Arcadia': [],
  'Trollhunters Rise of the Titans': [],

  'Transformers Prime': [],
  'Transformers Prime Beast Hunters Predacons Rising': []
};
// Returns only sources explicitly verified for in-app playback.
function playableSourcesFor(title, region) {
  var entries = SOURCE_REGISTRY[title] || [];

  return entries.filter(function(source) {
    return source.verifiedStream === true &&
      source.playback === 'direct' &&
      source.region.indexOf(region) !== -1 &&
      typeof source.streamUrl === 'string' &&
      /^https:\/\//.test(source.streamUrl);
  });
}
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
 var title = SHOWS[i][0];
 var group = SHOWS[i][1];

 var guide = OFFICIAL_GUIDES[title] || OFFICIAL_GUIDES[group];

 if (guide) {
  return guide + '#catalog-' + i;
 }

 return 'https://catalog.invalid/title/' + i;
}

function catalogIndex(url) {
 var text = String(url || '');

 var m = text.match(/#catalog-(\d+)$/);

 if (!m) {
  m = text.match(
   /^https:\/\/catalog\.invalid\/title\/(\d+)$/
  );
 }

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

  var guide = OFFICIAL_GUIDES[title] || OFFICIAL_GUIDES[group];

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

// v1.4 — Audio preference and multiple stream support

// v1.4 — Verified language and quality labels
function streamDisplayName(source) {
  if (source.test === true) {
    return source.provider || 'Playback Test';
  }

  var label;

  if (source.audio === 'en-official') {
    label = '🇬🇧 English Dub';
  } else if (source.audio === 'ja-en-sub') {
    label = '🇯🇵 Japanese Sub';
  } else {
    label = source.provider || 'Video';
  }

  var allowedQualities = [
    '2160p',
    '1440p',
    '1080p',
    '720p',
    '480p',
    '360p'
  ];

  if (
    source.qualityVerified === true &&
    allowedQualities.indexOf(source.quality) !== -1
  ) {
    label += ' · ' + source.quality;
  }

  return label;
}

async function extractStreamUrl(url) {
  var ep = episodeLookup(url);

  if (!ep) return null;

  var candidates = orderedCandidates(ep);

  if (!candidates.length) return null;

  var m = String(url || '').match(
    /^https:\/\/catalog\.invalid\/episode\/(\d+)\/(\d+)$/
  );

  if (!m) return null;

  var i = Number(m[1]);

  if (i < 0 || i >= SHOWS.length) return null;

  var title = SHOWS[i][0];

  // Preserve the original single-stream behavior
  // for the two existing playback tests.
  if (title === TEST_TITLE || title === HLS_TEST_TITLE) {
    return candidates[0].url;
  }

  // Show server selection for the multiple-stream test
  // and future anime episodes.
  return JSON.stringify({
    streams: candidates.map(function(source) {
      return {
        title: streamDisplayName(source),
        streamUrl: source.url
      };
    })
  });
}
