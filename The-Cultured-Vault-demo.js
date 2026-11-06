const works = [
{id:"film-the-godfather-1972",title:"The Godfather",creator:"Francis Ford Coppola",type:"film",year:1972,genres:["Crime","Drama"],country:"United States",owner:9.5,community:9.2,ownerReview:"A defining crime drama with extraordinary performances, atmosphere and a story that rewards revisiting."},
{id:"film-spirited-away-2001",title:"Spirited Away",creator:"Hayao Miyazaki",type:"animation",year:2001,genres:["Adventure","Fantasy"],country:"Japan",owner:10,community:9.1,ownerReview:"A beautifully imagined world, full of detail, emotion and unforgettable visual storytelling."},
{id:"film-parasite-2019",title:"Parasite",creator:"Bong Joon-ho",type:"film",year:2019,genres:["Thriller","Drama"],country:"South Korea",owner:9.2,community:9.0,ownerReview:"A sharp, layered film whose tension and social commentary stay with you."},
{id:"film-blade-runner-1982",title:"Blade Runner",creator:"Ridley Scott",type:"film",year:1982,genres:["Science fiction","Neo-noir"],country:"United States",owner:9.4,community:8.9,ownerReview:"A landmark in atmosphere, production design and questions about what makes us human."},
{id:"series-twin-peaks-1990",title:"Twin Peaks",creator:"David Lynch & Mark Frost",type:"series",year:1990,genres:["Mystery","Drama"],country:"United States",owner:9.8,community:8.8,ownerReview:"Strange, unsettling and strangely comforting. A world with a voice entirely its own."},
{id:"series-the-wire-2002",title:"The Wire",creator:"David Simon",type:"series",year:2002,genres:["Crime","Drama"],country:"United States",owner:9.6,community:9.3,ownerReview:"An exceptional ensemble portrait of a city and the systems shaping it."},
{id:"series-over-the-garden-wall-2014",title:"Over the Garden Wall",creator:"Patrick McHale",type:"animation",year:2014,genres:["Adventure","Fantasy"],country:"United States",owner:9.7,community:9.0,ownerReview:"Autumnal folklore, music and gentle unease in a compact animated story."},
{id:"documentary-the-act-of-killing-2012",title:"The Act of Killing",creator:"Joshua Oppenheimer",type:"documentary",year:2012,genres:["History","Politics"],country:"Denmark · Norway · United Kingdom",owner:9.1,community:8.7,ownerReview:"A challenging documentary that raises difficult questions about memory and responsibility."},
{id:"album-dark-side-of-the-moon-1973",title:"The Dark Side of the Moon",creator:"Pink Floyd",type:"music",year:1973,genres:["Progressive rock"],country:"United Kingdom",owner:9.8,community:9.4,ownerReview:"A cohesive, immersive album whose production and sequencing reward listening from beginning to end."},
{id:"album-songs-for-the-deaf-2002",title:"Songs for the Deaf",creator:"Queens of the Stone Age",type:"music",year:2002,genres:["Alternative rock","Stoner rock"],country:"United States",owner:9.7,community:9.1,ownerReview:"A fierce, focused record with a distinctive sound and relentless momentum."},
{id:"album-disintegration-1989",title:"Disintegration",creator:"The Cure",type:"music",year:1989,genres:["Gothic rock","Alternative rock"],country:"United Kingdom",owner:9.8,community:9.2,ownerReview:"Atmospheric, emotionally rich and beautifully arranged from its opening notes to its final moments."},
{id:"podcast-99-percent-invisible",title:"99% Invisible",creator:"Roman Mars",type:"podcast",year:null,genres:["Design","Architecture","Culture"],country:"United States",owner:8.8,community:8.9,ownerReview:"A thoughtful reminder that design and stories are hiding in the details of everyday life."},
{id:"game-journey-2012",title:"Journey",creator:"thatgamecompany",type:"game",year:2012,genres:["Adventure","Art game"],country:"United States",owner:9.3,community:8.9,ownerReview:"A concise, expressive interactive experience that communicates through movement, sound and space."},
{id:"book-the-left-hand-of-darkness-1969",title:"The Left Hand of Darkness",creator:"Ursula K. Le Guin",type:"book",year:1969,genres:["Science fiction"],country:"United States",owner:9.6,community:9.0,ownerReview:"A thoughtful, humane work of speculative fiction that invites reflection long after reading."}
];

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
window.addEventListener("message",event=>{
 if(event.data?.type==="portfolio-language")setLanguage(event.data.language);
});
populateReviewSelect();renderCatalogue();renderLocalReviews();
