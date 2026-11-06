/* THE CULTURED VAULT DEMO APPLICATION
   Dependency-free browser prototype. The sample catalogue is local code data;
   personal demo reviews are stored only in this browser's localStorage. */
// ---------------------------------------------------------------------------
// 1. Sample catalogue. Add or edit entries here; see README.fi.md for the schema.
// ---------------------------------------------------------------------------
const works = [
{id:"film-the-godfather-1972",title:"The Godfather",creator:"Francis Ford Coppola",type:"film",year:1972,genres:["Crime","Drama"],country:"United States",owner:0,community:9.2,ownerReview:""},
{id:"film-spirited-away-2001",title:"Spirited Away",creator:"Hayao Miyazaki",type:"animation",year:2001,genres:["Adventure","Fantasy"],country:"Japan",owner:0,community:9.1,ownerReview:""},
{id:"film-parasite-2019",title:"Parasite",creator:"Bong Joon-ho",type:"film",year:2019,genres:["Thriller","Drama"],country:"South Korea",owner:0,community:9.0,ownerReview:""},
{id:"film-blade-runner-1982",title:"Blade Runner",creator:"Ridley Scott",type:"film",year:1982,genres:["Science fiction","Neo-noir"],country:"United States",owner:0,community:8.9,ownerReview:""},
{id:"series-twin-peaks-1990",title:"Twin Peaks",creator:"David Lynch & Mark Frost",type:"series",year:1990,genres:["Mystery","Drama"],country:"United States",owner:0,community:8.8,ownerReview:""},
{id:"series-the-wire-2002",title:"The Wire",creator:"David Simon",type:"series",year:2002,genres:["Crime","Drama"],country:"United States",owner:0,community:9.3,ownerReview:""},
{id:"series-over-the-garden-wall-2014",title:"Over the Garden Wall",creator:"Patrick McHale",type:"animation",year:2014,genres:["Adventure","Fantasy"],country:"United States",owner:0,community:9.0,ownerReview:""},
{id:"documentary-the-act-of-killing-2012",title:"The Act of Killing",creator:"Joshua Oppenheimer",type:"documentary",year:2012,genres:["History","Politics"],country:"Denmark · Norway · United Kingdom",owner:0,community:8.7,ownerReview:""},
{id:"album-dark-side-of-the-moon-1973",title:"The Dark Side of the Moon",creator:"Pink Floyd",type:"music",year:1973,genres:["Progressive rock"],country:"United Kingdom",owner:0,community:9.4,ownerReview:""},
{id:"album-songs-for-the-deaf-2002",title:"Songs for the Deaf",creator:"Queens of the Stone Age",type:"music",year:2002,genres:["Alternative rock","Stoner rock"],country:"United States",owner:0,community:9.1,ownerReview:""},
{id:"album-disintegration-1989",title:"Disintegration",creator:"The Cure",type:"music",year:1989,genres:["Gothic rock","Alternative rock"],country:"United Kingdom",owner:0,community:9.2,ownerReview:""},
{id:"podcast-99-percent-invisible",title:"99% Invisible",creator:"Roman Mars",type:"podcast",year:null,genres:["Design","Architecture","Culture"],country:"United States",owner:0,community:8.9,ownerReview:""},
{id:"game-journey-2012",title:"Journey",creator:"thatgamecompany",type:"game",year:2012,genres:["Adventure","Art game"],country:"United States",owner:0,community:8.9,ownerReview:""},
{id:"book-the-left-hand-of-darkness-1969",title:"The Left Hand of Darkness",creator:"Ursula K. Le Guin",type:"book",year:1969,genres:["Science fiction"],country:"United States",owner:0,community:9.0,ownerReview:""}
];

// ---------------------------------------------------------------------------
// 1b. 100 additional curated pop-culture entries from the 1980s, 1990s and 2000s.
// Scores and review notes are illustrative demo content, not real community votes.
// Each row: id, title, creator, type, year, genres, country, owner score, sample community score.
// ---------------------------------------------------------------------------
const additionalWorks = [
  ["series-cheers-1982","Cheers","James Burrows et al.","series",1982,["Comedy","Sitcom"],"United States",8.2,8.3],
  ["series-knight-rider-1982","Knight Rider","Glen A. Larson","series",1982,["Action","Science fiction"],"United States",8.9,9.4],
  ["series-miami-vice-1984","Miami Vice","Anthony Yerkovich","series",1984,["Crime","Drama"],"United States",9.6,8.6],
  ["series-macgyver-1985","MacGyver","Lee David Zlotoff","series",1985,["Action","Adventure"],"United States",8.6,9.7],
  ["series-star-trek-tng-1987","Star Trek: The Next Generation","Gene Roddenberry","series",1987,["Science fiction","Adventure"],"United States",9.3,8.9],
  ["series-red-dwarf-1988","Red Dwarf","Rob Grant & Doug Naylor","series",1988,["Science fiction","Comedy"],"United Kingdom",8.3,8.1],
  ["series-x-files-1993","The X-Files","Chris Carter","series",1993,["Science fiction","Mystery"],"United States",9.0,9.2],
  ["series-buffy-1997","Buffy the Vampire Slayer","Joss Whedon","series",1997,["Fantasy","Horror"],"United States",9.7,8.4],
  ["series-sopranos-1999","The Sopranos","David Chase","series",1999,["Crime","Drama"],"United States",8.7,9.5],
  ["series-friends-1994","Friends","David Crane & Marta Kauffman","series",1994,["Comedy","Sitcom"],"United States",9.4,8.7],
  ["series-seinfeld-1989","Seinfeld","Larry David & Jerry Seinfeld","series",1989,["Comedy","Sitcom"],"United States",8.4,9.8],
  ["series-frasier-1993","Frasier","David Angell, Peter Casey & David Lee","series",1993,["Comedy","Sitcom"],"United States",9.1,9.0],
  ["series-er-1994","ER","Michael Crichton","series",1994,["Medical drama","Drama"],"United States",9.8,8.2],
  ["series-west-wing-1999","The West Wing","Aaron Sorkin","series",1999,["Political drama","Drama"],"United States",8.8,9.3],
  ["series-six-feet-under-2001","Six Feet Under","Alan Ball","series",2001,["Drama","Dark comedy"],"United States",9.5,8.5],
  ["series-firefly-2002","Firefly","Joss Whedon","series",2002,["Science fiction","Western"],"United States",8.5,9.6],
  ["series-battlestar-galactica-2004","Battlestar Galactica","Ronald D. Moore","series",2004,["Science fiction","Drama"],"United States",9.2,8.8],
  ["series-lost-2004","Lost","J. J. Abrams, Jeffrey Lieber & Damon Lindelof","series",2004,["Mystery","Adventure"],"United States",8.2,8.0],
  ["series-deadwood-2004","Deadwood","David Milch","series",2004,["Western","Drama"],"United States",8.9,9.1],
  ["series-breaking-bad-2008","Breaking Bad","Vince Gilligan","series",2008,["Crime","Drama"],"United States",9.6,8.3],
  ["animation-simpsons-1989","The Simpsons","Matt Groening","animation",1989,["Animated series","Satire","Comedy"],"United States",8.6,9.4],
  ["animation-rugrats-1991","Rugrats","Arlene Klasky, Gábor Csupó & Paul Germain","animation",1991,["Cartoon","Comedy","Family"],"United States",9.3,8.6],
  ["animation-batman-tas-1992","Batman: The Animated Series","Bruce Timm & Eric Radomski","animation",1992,["Animated series","Superhero","Noir"],"United States",8.3,9.7],
  ["animation-xmen-1992","X-Men: The Animated Series","Stan Lee & Jack Kirby (characters)","animation",1992,["Animated series","Superhero"],"United States",9.0,8.9],
  ["animation-sailor-moon-1992","Sailor Moon","Naoko Takeuchi (original manga)","animation",1992,["Anime","Fantasy","Adventure"],"Japan",9.7,8.1],
  ["animation-animaniacs-1993","Animaniacs","Tom Ruegger","animation",1993,["Cartoon","Comedy","Musical"],"United States",8.7,9.2],
  ["animation-evangelion-1995","Neon Genesis Evangelion","Hideaki Anno","animation",1995,["Anime","Mecha","Psychological"],"Japan",9.4,8.4],
  ["animation-hey-arnold-1996","Hey Arnold!","Craig Bartlett","animation",1996,["Cartoon","Comedy","Coming-of-age"],"United States",8.4,9.5],
  ["animation-south-park-1997","South Park","Trey Parker & Matt Stone","animation",1997,["Animated series","Satire","Comedy"],"United States",9.1,8.7],
  ["animation-king-of-hill-1997","King of the Hill","Mike Judge & Greg Daniels","animation",1997,["Animated series","Comedy"],"United States",9.8,9.8],
  ["animation-powerpuff-1998","The Powerpuff Girls","Craig McCracken","animation",1998,["Cartoon","Superhero","Comedy"],"United States",8.8,9.0],
  ["animation-futurama-1999","Futurama","Matt Groening & David X. Cohen","animation",1999,["Animated series","Science fiction","Comedy"],"United States",9.5,8.2],
  ["animation-spongebob-1999","SpongeBob SquarePants","Stephen Hillenburg","animation",1999,["Cartoon","Comedy","Family"],"United States",8.5,9.3],
  ["animation-cowboy-bebop-1998","Cowboy Bebop","Shinichirō Watanabe","animation",1998,["Anime","Science fiction","Neo-noir"],"Japan",9.2,8.5],
  ["animation-samurai-jack-2001","Samurai Jack","Genndy Tartakovsky","animation",2001,["Animated series","Action","Adventure"],"United States",8.2,9.6],
  ["animation-justice-league-2001","Justice League","Bruce Timm","animation",2001,["Animated series","Superhero"],"United States",8.9,8.8],
  ["animation-clone-wars-2003","Star Wars: Clone Wars","Genndy Tartakovsky","animation",2003,["Animated series","Science fiction","Action"],"United States",9.6,8.0],
  ["animation-teen-titans-2003","Teen Titans","Glen Murakami","animation",2003,["Animated series","Superhero","Action"],"United States",8.6,9.1],
  ["animation-fullmetal-2003","Fullmetal Alchemist","Hiromu Arakawa (original manga)","animation",2003,["Anime","Fantasy","Adventure"],"Japan",9.3,8.3],
  ["animation-avatar-2005","Avatar: The Last Airbender","Michael Dante DiMartino & Bryan Konietzko","animation",2005,["Animated series","Fantasy","Adventure"],"United States",8.3,9.4],
  ["animation-death-note-2006","Death Note","Tsugumi Ohba & Takeshi Obata (original manga)","animation",2006,["Anime","Mystery","Thriller"],"Japan",9.0,8.6],
  ["film-the-thing-1982","The Thing","John Carpenter","film",1982,["Horror","Science fiction"],"United States",9.7,9.7],
  ["film-the-shining-1980","The Shining","Stanley Kubrick","film",1980,["Horror","Psychological"],"United Kingdom · United States",8.7,8.9],
  ["film-ghostbusters-1984","Ghostbusters","Ivan Reitman","film",1984,["Comedy","Fantasy"],"United States",9.4,8.1],
  ["film-terminator-1984","The Terminator","James Cameron","film",1984,["Science fiction","Action"],"United States",8.4,9.2],
  ["film-brazil-1985","Brazil","Terry Gilliam","film",1985,["Science fiction","Dystopian","Satire"],"United Kingdom",9.1,8.4],
  ["film-back-to-future-1985","Back to the Future","Robert Zemeckis","film",1985,["Science fiction","Adventure","Comedy"],"United States",9.8,9.5],
  ["film-aliens-1986","Aliens","James Cameron","film",1986,["Science fiction","Horror","Action"],"United States",8.8,8.7],
  ["film-stand-by-me-1986","Stand by Me","Rob Reiner","film",1986,["Coming-of-age","Drama"],"United States",9.5,9.8],
  ["film-princess-bride-1987","The Princess Bride","Rob Reiner","film",1987,["Fantasy","Adventure","Comedy"],"United States",8.5,9.0],
  ["film-predator-1987","Predator","John McTiernan","film",1987,["Science fiction","Action"],"United States",9.2,8.2],
  ["film-die-hard-1988","Die Hard","John McTiernan","film",1988,["Action","Thriller"],"United States",8.2,9.3],
  ["film-they-live-1988","They Live","John Carpenter","film",1988,["Science fiction","Horror","Satire"],"United States",8.9,8.5],
  ["film-beetlejuice-1988","Beetlejuice","Tim Burton","film",1988,["Fantasy","Comedy","Horror"],"United States",9.6,9.6],
  ["film-goodfellas-1990","Goodfellas","Martin Scorsese","film",1990,["Crime","Drama"],"United States",8.6,8.8],
  ["film-edward-scissorhands-1990","Edward Scissorhands","Tim Burton","film",1990,["Fantasy","Romance","Drama"],"United States",9.3,8.0],
  ["film-silence-lambs-1991","The Silence of the Lambs","Jonathan Demme","film",1991,["Thriller","Crime","Horror"],"United States",8.3,9.1],
  ["film-reservoir-dogs-1992","Reservoir Dogs","Quentin Tarantino","film",1992,["Crime","Thriller"],"United States",9.0,8.3],
  ["film-jurassic-park-1993","Jurassic Park","Steven Spielberg","film",1993,["Science fiction","Adventure"],"United States",9.7,9.4],
  ["film-pulp-fiction-1994","Pulp Fiction","Quentin Tarantino","film",1994,["Crime","Drama"],"United States",8.7,8.6],
  ["film-se7en-1995","Se7en","David Fincher","film",1995,["Crime","Thriller","Mystery"],"United States",9.4,9.7],
  ["film-fargo-1996","Fargo","Joel & Ethan Coen","film",1996,["Crime","Dark comedy"],"United States",8.4,8.9],
  ["film-big-lebowski-1998","The Big Lebowski","Joel & Ethan Coen","film",1998,["Comedy","Crime"],"United States",9.1,8.1],
  ["film-matrix-1999","The Matrix","Lana & Lilly Wachowski","film",1999,["Science fiction","Action"],"United States",9.8,9.2],
  ["film-fight-club-1999","Fight Club","David Fincher","film",1999,["Drama","Thriller"],"United States",8.8,8.4],
  ["film-american-psycho-2000","American Psycho","Mary Harron","film",2000,["Psychological","Satire","Thriller"],"United States",9.5,9.5],
  ["film-donnie-darko-2001","Donnie Darko","Richard Kelly","film",2001,["Science fiction","Psychological"],"United States",8.5,8.7],
  ["film-oldboy-2003","Oldboy","Park Chan-wook","film",2003,["Thriller","Mystery","Drama"],"South Korea",9.2,9.8],
  ["film-kill-bill-2003","Kill Bill: Vol. 1","Quentin Tarantino","film",2003,["Action","Crime"],"United States",8.2,9.0],
  ["film-eternal-sunshine-2004","Eternal Sunshine of the Spotless Mind","Michel Gondry","film",2004,["Science fiction","Romance","Drama"],"United States",8.9,8.2],
  ["film-no-country-2007","No Country for Old Men","Joel & Ethan Coen","film",2007,["Crime","Thriller","Drama"],"United States",9.6,9.3],
  ["animation-akira-1988","Akira","Katsuhiro Otomo","animation",1988,["Anime","Science fiction","Cyberpunk"],"Japan",8.6,8.5],
  ["animation-totoro-1988","My Neighbor Totoro","Hayao Miyazaki","animation",1988,["Anime","Fantasy","Family"],"Japan",9.3,9.6],
  ["animation-grave-fireflies-1988","Grave of the Fireflies","Isao Takahata","animation",1988,["Anime","War","Drama"],"Japan",8.3,8.8],
  ["animation-kiki-1989","Kiki's Delivery Service","Hayao Miyazaki","animation",1989,["Anime","Fantasy","Coming-of-age"],"Japan",9.0,8.0],
  ["animation-nausicaa-1984","Nausicaä of the Valley of the Wind","Hayao Miyazaki","animation",1984,["Anime","Fantasy","Science fiction"],"Japan",9.7,9.1],
  ["animation-castle-sky-1986","Castle in the Sky","Hayao Miyazaki","animation",1986,["Anime","Adventure","Fantasy"],"Japan",8.7,8.3],
  ["animation-who-framed-roger-1988","Who Framed Roger Rabbit","Robert Zemeckis","animation",1988,["Animation","Live action","Comedy"],"United States",9.4,9.4],
  ["animation-nightmare-before-christmas-1993","The Nightmare Before Christmas","Henry Selick","animation",1993,["Stop motion","Fantasy","Musical"],"United States",8.4,8.6],
  ["animation-ghost-in-shell-1995","Ghost in the Shell","Mamoru Oshii","animation",1995,["Anime","Science fiction","Cyberpunk"],"Japan",9.1,9.7],
  ["animation-princess-mononoke-1997","Princess Mononoke","Hayao Miyazaki","animation",1997,["Anime","Fantasy","Adventure"],"Japan",9.8,8.9],
  ["animation-perfect-blue-1997","Perfect Blue","Satoshi Kon","animation",1997,["Anime","Psychological","Thriller"],"Japan",8.8,8.1],
  ["animation-toy-story-1995","Toy Story","John Lasseter","animation",1995,["Animation","Adventure","Comedy"],"United States",9.5,9.2],
  ["animation-iron-giant-1999","The Iron Giant","Brad Bird","animation",1999,["Animation","Science fiction","Drama"],"United States",8.5,8.4],
  ["animation-mulan-1998","Mulan","Barry Cook & Tony Bancroft","animation",1998,["Animation","Adventure","Musical"],"United States",9.2,9.5],
  ["animation-lion-king-1994","The Lion King","Roger Allers & Rob Minkoff","animation",1994,["Animation","Adventure","Drama"],"United States",8.2,8.7],
  ["animation-aladdin-1992","Aladdin","Ron Clements & John Musker","animation",1992,["Animation","Fantasy","Musical"],"United States",8.9,9.8],
  ["animation-shrek-2001","Shrek","Andrew Adamson & Vicky Jenson","animation",2001,["Animation","Fantasy","Comedy"],"United States",9.6,9.0],
  ["animation-monsters-inc-2001","Monsters, Inc.","Pete Docter","animation",2001,["Animation","Comedy","Family"],"United States",8.6,8.2],
  ["animation-finding-nemo-2003","Finding Nemo","Andrew Stanton","animation",2003,["Animation","Adventure","Family"],"United States",9.3,9.3],
  ["animation-lilo-stitch-2002","Lilo & Stitch","Chris Sanders & Dean DeBlois","animation",2002,["Animation","Science fiction","Comedy"],"United States",8.3,8.5],
  ["animation-howls-moving-castle-2004","Howl's Moving Castle","Hayao Miyazaki","animation",2004,["Anime","Fantasy","Romance"],"Japan",9.0,9.6],
  ["animation-paprika-2006","Paprika","Satoshi Kon","animation",2006,["Anime","Science fiction","Psychological"],"Japan",9.7,8.8],
  ["animation-tokyo-godfathers-2003","Tokyo Godfathers","Satoshi Kon","animation",2003,["Anime","Comedy","Drama"],"Japan",8.7,8.0],
  ["animation-millennium-actress-2001","Millennium Actress","Satoshi Kon","animation",2001,["Anime","Drama","Romance"],"Japan",9.4,9.1],
  ["animation-coraline-2009","Coraline","Henry Selick","animation",2009,["Stop motion","Fantasy","Horror"],"United States",8.4,8.3],
  ["animation-fantastic-mr-fox-2009","Fantastic Mr. Fox","Wes Anderson","animation",2009,["Stop motion","Comedy","Adventure"],"United States",9.1,9.4],
  ["animation-persepolis-2007","Persepolis","Marjane Satrapi & Vincent Paronnaud","animation",2007,["Animation","Biography","Drama"],"France · Iran",9.8,8.6],
  ["animation-wall-e-2008","WALL·E","Andrew Stanton","animation",2008,["Animation","Science fiction","Romance"],"United States",8.8,9.7],
  ["animation-ratatouille-2007","Ratatouille","Brad Bird","animation",2007,["Animation","Comedy","Family"],"United States",9.5,8.9]
];
works.push(...additionalWorks.map(([id,title,creator,type,year,genres,country,owner,community]) => ({
 id,title,creator,type,year,genres,country,owner,community,
 ownerReview: "Curated sample catalogue entry. Replace this text with an instance owner's own review."
})));
works.forEach(work => { work.owner = 0; work.ownerReview = ""; });

// ---------------------------------------------------------------------------
// 2. Bilingual media labels, interface messages and application state.
// ---------------------------------------------------------------------------
const typeLabels = {
fi:{film:"Elokuva",series:"Sarja",animation:"Animaatio",documentary:"Dokumentti",podcast:"Podcast",music:"Musiikki",game:"Peli",book:"Kirja"},
en:{film:"Film",series:"Series",animation:"Animation",documentary:"Documentary",podcast:"Podcast",music:"Music",game:"Game",book:"Book"}
};
const ui = {
fi:{count: n => `Näytetään ${n} teosta`, owner:"Ylläpitäjän arvio", community:"Yhteisö", review:"Näytä esimerkkien arvostelut", hide:"Piilota arvostelut", noReview:"Tälle teokselle ei ole paikallista demoarviota.", saved:"Demoarvio tallennettu tähän selaimeen.", yourReview:"Oma paikallinen demoarviosi", choose:"Valitse teos", communityNote:"Yhteisön keskiarvo"},
en:{count: n => `Showing ${n} works`, owner:"Owner rating", community:"Community", review:"Show sample reviews", hide:"Hide reviews", noReview:"There is no local demo review for this work.", saved:"Demo review saved in this browser.", yourReview:"Your local demo review", choose:"Choose a work", communityNote:"Community average"}
};
let language = "fi";
let activeCategory = "all";
const grid = document.getElementById("catalogue-grid");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const reviewSelect = document.getElementById("review-work");
const storageKey = "cultured-vault-demo-reviews-v1";

// ---------------------------------------------------------------------------
// 3. Storage, language and catalogue filtering helpers.
// Parse storage defensively so malformed data does not break the catalogue.
// ---------------------------------------------------------------------------
function getLocalReviews(){try{return JSON.parse(localStorage.getItem(storageKey)||"[]")}catch{return []}}
function setLanguage(next){
 if(next!=="fi"&&next!=="en")return;
 language=next;document.documentElement.lang=language;
 document.querySelectorAll("[data-fi][data-en]").forEach(el=>{el.textContent=el.dataset[language]});
 document.querySelectorAll("[data-fi-placeholder][data-en-placeholder]").forEach(el=>{el.placeholder=el.dataset[language+"Placeholder"]});
 document.querySelectorAll("option[data-fi][data-en]").forEach(el=>{el.textContent=el.dataset[language]});
 document.getElementById("demo-language").setAttribute("aria-label",language==="fi"?"Switch to English":"Vaihda suomeksi");
 renderCatalogue();renderLocalReviews();
}
function getSearchText(work){return [work.title,work.creator,work.country,...work.genres].join(" ").toLocaleLowerCase()}
function filteredWorks(){
 const query=searchInput.value.trim().toLocaleLowerCase();
 let list=works.filter(w=>(activeCategory==="all"||w.type===activeCategory)&&(!query||getSearchText(w).includes(query)));
 const sort=sortSelect.value;
 if(sort==="title")list.sort((a,b)=>a.title.localeCompare(b.title));
 if(sort==="year")list.sort((a,b)=>(b.year||0)-(a.year||0));
 if(sort==="rating")list.sort((a,b)=>b.community-a.community);
 return list;
}
// ---------------------------------------------------------------------------
// 4. Build catalogue cards. textContent displays data as text instead of
// parsing it as HTML, including any visitor-entered review comments.
// ---------------------------------------------------------------------------
function renderCatalogue(){
 const list=filteredWorks();
 grid.replaceChildren();
 document.getElementById("total-count").textContent=works.length;
 document.getElementById("result-count").textContent=ui[language].count(list.length);
 document.getElementById("empty-state").hidden=list.length!==0;
 list.forEach(work=>{
  const card=document.createElement("article");card.className="work-card";
  const top=document.createElement("div");top.className="work-card-top";
  const badge=document.createElement("span");badge.className="media-badge";badge.textContent=typeLabels[language][work.type];
  const year=document.createElement("span");year.className="work-year";year.textContent=work.year||"—";top.append(badge,year);card.append(top);
  const title=document.createElement("h3");title.textContent=work.title;card.append(title);
  const creator=document.createElement("p");creator.className="work-creator";creator.textContent=work.creator;card.append(creator);
  const genres=document.createElement("div");genres.className="genre-list";work.genres.forEach(g=>{const tag=document.createElement("span");tag.textContent=g;genres.append(tag)});card.append(genres);
  const rating=document.createElement("div");rating.className="rating-strip";
  const owner=document.createElement("span");owner.className="owner-score";owner.textContent="✦ "+work.owner.toFixed(1)+"/10";
  owner.setAttribute("aria-label",ui[language].owner+" "+work.owner.toFixed(1)+" / 10");
  const community=document.createElement("span");community.className="community-score";community.textContent=ui[language].community+" "+work.community.toFixed(1);
  rating.append(owner,community);card.append(rating);
  const toggle=document.createElement("button");toggle.className="review-toggle";toggle.type="button";toggle.textContent=ui[language].review;toggle.setAttribute("aria-expanded","false");
  const reviews=document.createElement("div");reviews.hidden=true;
  toggle.addEventListener("click",()=>{reviews.hidden=!reviews.hidden;toggle.setAttribute("aria-expanded",String(!reviews.hidden));toggle.textContent=reviews.hidden?ui[language].review:ui[language].hide});
  const ownerReview=document.createElement("div");ownerReview.className="local-review";
  const ownerHeading=document.createElement("strong");ownerHeading.textContent=ui[language].owner+" · "+work.owner.toFixed(1)+"/10";ownerReview.append(ownerHeading);
  const ownerText=document.createElement("p");ownerText.textContent=work.ownerReview;ownerReview.append(ownerText);
  const communityReview=document.createElement("div");communityReview.className="local-review";
  const communityHeading=document.createElement("strong");communityHeading.textContent=ui[language].communityNote+" · "+work.community.toFixed(1)+"/10";communityReview.append(communityHeading);
  const communityText=document.createElement("p");communityText.textContent=language==="fi"?"Havainnollistava esimerkkikeskiarvo — ei oikeita käyttäjäarvioita.":"Illustrative sample average — not real user ratings.";communityReview.append(communityText);
  reviews.append(ownerReview,communityReview);card.append(toggle,reviews);grid.append(card);
 });
}
// ---------------------------------------------------------------------------
// 5. Render this browser's own demo reviews and populate the work selector.
// ---------------------------------------------------------------------------
function renderLocalReviews(){
 const container=document.getElementById("local-review-list");container.replaceChildren();
 const reviews=getLocalReviews();
 reviews.forEach(review=>{
  const work=works.find(w=>w.id===review.id);if(!work)return;
  const item=document.createElement("article");item.className="local-review";
  const heading=document.createElement("strong");heading.textContent=work.title+" · "+ui[language].yourReview+" · "+review.rating+"/10";
  const comment=document.createElement("p");comment.textContent=review.comment|| (language==="fi"?"Ei kommenttia.":"No comment.");
  item.append(heading,comment);container.append(item);
 });
}
function populateReviewSelect(){
 reviewSelect.replaceChildren();
 works.forEach(work=>{const option=document.createElement("option");option.value=work.id;option.textContent=work.title;reviewSelect.append(option)});
}
// ---------------------------------------------------------------------------
// 6. Event handlers for filtering, search, sorting and review submission.
// ---------------------------------------------------------------------------
document.getElementById("category-filters").addEventListener("click",event=>{
 const button=event.target.closest("button[data-category]");if(!button)return;
 activeCategory=button.dataset.category;
 document.querySelectorAll(".filter-chip").forEach(chip=>{const active=chip===button;chip.classList.toggle("is-active",active);chip.setAttribute("aria-pressed",String(active))});
 renderCatalogue();
});
searchInput.addEventListener("input",renderCatalogue);
sortSelect.addEventListener("change",renderCatalogue);
document.getElementById("personal-review-form").addEventListener("submit",event=>{
 event.preventDefault();
 const rating=Number(document.getElementById("review-rating").value);
 const id=reviewSelect.value;const comment=document.getElementById("review-comment").value.trim();
 if(!Number.isFinite(rating)||rating<1||rating>10){return}
 const reviews=getLocalReviews();reviews.push({id,rating,comment,createdAt:new Date().toISOString()});
 try{localStorage.setItem(storageKey,JSON.stringify(reviews));document.getElementById("review-status").textContent=ui[language].saved;document.getElementById("review-comment").value="";renderLocalReviews()}
 catch{document.getElementById("review-status").textContent=language==="fi"?"Selaimen tallennustila ei ole käytettävissä.":"Browser storage is unavailable."}
});
document.getElementById("demo-language").addEventListener("click",()=>setLanguage(language==="fi"?"en":"fi"));
// The portfolio can request that this embedded demo use the same UI language.
// This synchronises presentation only; it does not exchange personal data.
window.addEventListener("message",event=>{
 if(event.data?.type==="portfolio-language")setLanguage(event.data.language);
});
populateReviewSelect();renderCatalogue();renderLocalReviews();
// Request the portfolio language after the embedded page has loaded.
if (window.parent !== window) window.parent.postMessage({type:"remote-job-fit-language-request"},"*");

// ---------------------------------------------------------------------------
// 7. PWA install prompt and service-worker registration.
// ---------------------------------------------------------------------------
let deferredInstallPrompt = null;
const installButton = document.getElementById("install-app");
window.addEventListener("beforeinstallprompt", event => {
 event.preventDefault();
 deferredInstallPrompt = event;
 if (installButton) installButton.hidden = false;
});
if (installButton) {
 installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
 });
}
window.addEventListener("appinstalled", () => {
 if (installButton) installButton.hidden = true;
 deferredInstallPrompt = null;
});
// Service workers require HTTPS or localhost and are scoped to this folder only.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
 window.addEventListener("load", () => {
  navigator.serviceWorker.register("./sw.js", {scope:"./"}).catch(error => {
   console.warn("The Cultured Vault offline support could not be enabled.", error);
  });
 });
}

// verification marker: reviewed 2026-11-06
