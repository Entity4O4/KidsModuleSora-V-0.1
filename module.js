/* Anime & Cartoons v0.7 — playback diagnostic; remove test title after validation.
   Big Buck Bunny © Blender Foundation, CC BY 3.0. */
var SHOWS = [
 ['Naruto','Naruto'],['Naruto Shippuden','Naruto'],['Boruto','Naruto'],['Naruto Movies','Naruto'],
 ['Dragon Ball','Dragon Ball'],['Dragon Ball Z','Dragon Ball'],['Dragon Ball Kai','Dragon Ball'],['Dragon Ball Super','Dragon Ball'],['Dragon Ball Daima','Dragon Ball'],['Dragon Ball Movies','Dragon Ball'],
 ['Demon Slayer','Demon Slayer'],['Demon Slayer Movies','Demon Slayer'],
 ['Pokémon','Pokémon'],['Pokémon Movies','Pokémon'],
 ['Beyblade','Beyblade'],['Beyblade Metal Fusion','Beyblade'],['Beyblade Burst','Beyblade'],['Beyblade X','Beyblade'],['Beyblade Movies','Beyblade'],
 ['Ninjago','Ninjago'],['Ninjago Dragons Rising','Ninjago'],['Ninjago Movies','Ninjago'],
 ['Sonic Boom','Sonic'],['Sonic Prime','Sonic'],['Sonic Movies','Sonic'],
 ['Trollhunters','Tales of Arcadia'],['3Below','Tales of Arcadia'],['Wizards Tales of Arcadia','Tales of Arcadia'],['Trollhunters Rise of the Titans','Tales of Arcadia'],
 ['Transformers Prime','Transformers Prime'],['Transformers Prime Beast Hunters Predacons Rising','Transformers Prime'],
 ['Playback Test - Big Buck Bunny','Playback Test']
];
var COVER = 'https://raw.githubusercontent.com/Entity4O4/KidsModuleSora-V-0.1/main/cover.png';
var TEST_TITLE = 'Playback Test - Big Buck Bunny';
// Direct MP4 test media from Blender Foundation. Requires network access.
var OFFICIAL_EPISODES = {};
OFFICIAL_EPISODES[TEST_TITLE] = [{number:'1',season:1,sources:[{
 url:'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
 audio:'en-official',provider:'Blender Foundation'
}]}];
function approvedEpisode(ep) {
 return !!(ep && /^(en-official|ja-en-sub)$/.test(ep.audio || '') &&
 /^https:\/\/[^\s]+\.(mp4|m3u8)(?:[?#][^\s]*)?$/i.test(ep.url || ''));
}
function orderedCandidates(entry) {
 var candidates = Array.isArray(entry.sources) ? entry.sources : [entry];
 return candidates.filter(approvedEpisode).sort(function(a,b) {
  var priority={'en-official':0,'ja-en-sub':1};
  return priority[a.audio]-priority[b.audio];
 });
}
function availableEntries(title) {
 return (OFFICIAL_EPISODES[title] || []).filter(function(ep){return ep && orderedCandidates(ep).length>0;});
}
function catalogUrl(i) {return 'https://catalog.invalid/title/'+i;}
function catalogIndex(url) {
 var m=String(url||'').match(/^https:\/\/catalog\.invalid\/title\/(\d+)$/);
 var n=m?Number(m[1]):-1;
 return n>=0 && n<SHOWS.length?n:-1;
}
function episodeUrl(i,j) {return 'https://catalog.invalid/episode/'+i+'/'+j;}
function episodeLookup(url) {
 var m=String(url||'').match(/^https:\/\/catalog\.invalid\/episode\/(\d+)\/(\d+)$/);
 if(!m)return null;
 var i=Number(m[1]),j=Number(m[2]);
 return i>=0 && i<SHOWS.length ? availableEntries(SHOWS[i][0])[j] || null : null;
}
async function searchResults(keyword) {
 var q=String(keyword||'').toLowerCase().trim(),out=[];
 for(var i=0;i<SHOWS.length;i++) {
  var title=SHOWS[i][0],group=SHOWS[i][1];
  if(!q || title.toLowerCase().indexOf(q)!==-1 || group.toLowerCase().indexOf(q)!==-1)
   out.push({title:title,image:COVER,href:catalogUrl(i)});
 }
 return JSON.stringify(out);
}
async function extractDetails(url) {
 var i=catalogIndex(url);
 if(i<0)return JSON.stringify([]);
 var title=SHOWS[i][0];
 return JSON.stringify([{description:title===TEST_TITLE?'Temporary openly licensed playback diagnostic; not part of the final collection.':title+' — curated catalog entry. Episodes appear when authorized streams are configured.',aliases:SHOWS[i][1],airdate:''}]);
}
async function extractEpisodes(url) {
 var i=catalogIndex(url);
 if(i<0)return JSON.stringify([]);
 var eps=availableEntries(SHOWS[i][0]),out=[];
 for(var j=0;j<eps.length;j++)out.push({href:episodeUrl(i,j),number:String(eps[j].number||j+1),season:String(eps[j].season||1)});
 return JSON.stringify(out);
}
async function extractStreamUrl(url) {
 var ep=episodeLookup(url);
 return ep ? orderedCandidates(ep)[0].url : null;
}
