/* Anime & Cartoons for Sora — v0.5 curated catalog and authorized direct-link fallback.
   No scraping, DRM bypass, or unverified playback URLs. */
var SHOWS = [
 ['Naruto','Naruto'],['Naruto Shippuden','Naruto'],['Boruto','Naruto'],['Naruto Movies','Naruto'],
 ['Dragon Ball','Dragon Ball'],['Dragon Ball Z','Dragon Ball'],['Dragon Ball Kai','Dragon Ball'],['Dragon Ball Super','Dragon Ball'],['Dragon Ball Daima','Dragon Ball'],['Dragon Ball Movies','Dragon Ball'],
 ['Demon Slayer','Demon Slayer'],['Demon Slayer Movies','Demon Slayer'],
 ['Pokémon','Pokémon'],['Pokémon Movies','Pokémon'],
 ['Beyblade','Beyblade'],['Beyblade Metal Fusion','Beyblade'],['Beyblade Burst','Beyblade'],['Beyblade X','Beyblade'],['Beyblade Movies','Beyblade'],
 ['Ninjago','Ninjago'],['Ninjago Dragons Rising','Ninjago'],['Ninjago Movies','Ninjago'],
 ['Sonic Boom','Sonic'],['Sonic Prime','Sonic'],['Sonic Movies','Sonic'],
 ['Trollhunters','Tales of Arcadia'],['3Below','Tales of Arcadia'],['Wizards Tales of Arcadia','Tales of Arcadia'],['Trollhunters Rise of the Titans','Tales of Arcadia'],
 ['Transformers Prime','Transformers Prime'],['Transformers Prime Beast Hunters Predacons Rising','Transformers Prime']
];
// Add ONLY verified, authorized direct MP4/HLS URLs that can be played in Sora.
// Keys are exact catalog titles. Each episode entry: {number:'1', url:'https://.../video.mp4'}.
// Leave empty until a licensed provider or rightsholder offers playable direct links.
var OFFICIAL_EPISODES = {};
// Each title can have multiple candidate streams for an episode. Example shape:
// {number:'1', season:1, sources:[{url:'https://...',audio:'en-official',provider:'Official'},
//                                  {url:'https://...',audio:'ja-en-sub',provider:'Official'}]}
// Sources must be supplied by a rights holder or licensed distributor.
// A source must be manually verified by the module maintainer before use.
// Do not infer rights or dub authenticity from a URL or a language tag.
function orderedCandidates(entry) {
  var candidates = Array.isArray(entry.sources) ? entry.sources : [entry];
  return candidates.filter(approvedEpisode).sort(function(a,b) {
    var priority = {'en-official':0,'ja-en-sub':1};
    return priority[a.audio] - priority[b.audio];
  });
}
function availableEntries(title) {
  return (OFFICIAL_EPISODES[title] || []).filter(function(ep) { return ep && orderedCandidates(ep).length > 0; });
}
// For official English dubs use audio:'en-official'; Japanese + English subs
// use audio:'ja-en-sub'. Unverified/fan dubs are never automatically accepted.
function approvedEpisode(ep) {
  return ep && /^(en-official|ja-en-sub)$/.test(ep.audio || '') &&
    /^https:\/\/[^\s]+\.(mp4|m3u8)(?:[?#][^\s]*)?$/i.test(ep.url || '');
}
function episodeUrl(titleIndex, episodeIndex) {
  return 'https://catalog.invalid/episode/' + titleIndex + '/' + episodeIndex;
}
function episodeLookup(url) {
  var m = String(url || '').match(/^https:\/\/catalog\.invalid\/episode\/(\d+)\/(\d+)$/);
  if (!m) return null;
  var titleIndex = Number(m[1]), episodeIndex = Number(m[2]);
  if (titleIndex < 0 || titleIndex >= SHOWS.length) return null;
  var accepted = availableEntries(SHOWS[titleIndex][0]);
  return accepted[episodeIndex] || null;
}
function catalogUrl(index) { return 'https://catalog.invalid/title/' + index; }
function catalogIndex(url) {
  var m = String(url || '').match(/^https:\/\/catalog\.invalid\/title\/(\d+)$/);
  var n = m ? Number(m[1]) : -1;
  return n >= 0 && n < SHOWS.length ? n : -1;
}

async function searchResults(keyword) {
  var q = String(keyword || '').toLowerCase().trim();
  var out = [];
  for (var i = 0; i < SHOWS.length; i++) {
    var title = SHOWS[i][0], group = SHOWS[i][1];
    if (!q || title.toLowerCase().indexOf(q) !== -1 || group.toLowerCase().indexOf(q) !== -1) {
      out.push({title:title, image:'', href:catalogUrl(i)});
    }
  }
  return JSON.stringify(out);
}
async function extractDetails(url) {
  var i = catalogIndex(url);
  if (i < 0) return JSON.stringify([]);
  return JSON.stringify([{description:SHOWS[i][0] + ' — curated catalog entry. Episodes appear only when an authorized playlist has been configured.', aliases:SHOWS[i][1], airdate:''}]);
}
async function extractEpisodes(url) {
  var i = catalogIndex(url);
  if (i < 0) return JSON.stringify([]);
  var eps = availableEntries(SHOWS[i][0]);
  var out = [];
  for (var j = 0; j < eps.length; j++) {
    out.push({href:episodeUrl(i, j), number:String(eps[j].number || j + 1), season: String(eps[j].season || 1)});
  }
  return JSON.stringify(out);
}
async function extractStreamUrl(url) {
  var episode = episodeLookup(url);
  return episode ? orderedCandidates(episode)[0].url : null;
}
