/* Project-maintained bilingual keyword vocabulary. See README.md for source notes. */
(function(root) {
  "use strict";
  const skills = [
    ["HTML","HTML","HTML"],["CSS","CSS","CSS"],["JavaScript","JavaScript","JavaScript","JS"],
    ["TypeScript","TypeScript","TypeScript","TS"],["React","React","React.js"],["Next.js","Next.js","Next.js"],
    ["Node.js","Node.js","Node.js"],["Python","Python","Python"],["PHP","PHP","PHP"],["Java","Java","Java"],
    ["C#","C#","C#","C Sharp"],["C++","C++","C++","Cpp"],[".NET",".NET",".NET","Dotnet","ASP.NET"],
    ["Kotlin","Kotlin","Kotlin"],["Swift","Swift","Swift"],["Go","Go","Go","Golang"],["Rust","Rust","Rust"],
    ["SQL","SQL","SQL"],["MySQL","MySQL","MySQL"],["PostgreSQL","PostgreSQL","PostgreSQL","Postgres"],
    ["SQLite","SQLite","SQLite"],["MongoDB","MongoDB","MongoDB"],["REST API","REST API","REST-rajapinnat","REST-rajapinta"],
    ["GraphQL","GraphQL","GraphQL"],["JSON","JSON","JSON"],["XML","XML","XML"],["Git","Git","Git"],
    ["GitHub","GitHub","GitHub"],["GitLab","GitLab","GitLab"],["Docker","Docker","Docker"],["Kubernetes","Kubernetes","Kubernetes","K8s"],
    ["Microsoft Azure","Microsoft Azure","Microsoft Azure","Azure"],["Amazon Web Services","Amazon Web Services","Amazon Web Services","AWS"],
    ["Google Cloud","Google Cloud","Google Cloud","GCP"],["Linux","Linux","Linux"],["Windows","Windows","Windows"],
    ["Microsoft 365","Microsoft 365","Microsoft 365","Office 365","M365"],["SharePoint","SharePoint","SharePoint"],
    ["Power BI","Power BI","Power BI"],["Excel","Excel","Excel"],["Figma","Figma","Figma"],["WordPress","WordPress","WordPress"],
    ["Elementor","Elementor","Elementor"],["Photoshop","Photoshop","Photoshop"],["Illustrator","Illustrator","Illustrator"],
    ["InDesign","InDesign","InDesign"],["Premiere Pro","Premiere Pro","Premiere Pro"],["After Effects","After Effects","After Effects"],
    ["DaVinci Resolve","DaVinci Resolve","DaVinci Resolve"],["Blender","Blender","Blender"],["Maya","Maya","Maya"],
    ["Unreal Engine","Unreal Engine","Unreal Engine"],["Canva","Canva","Canva"],["Jira","Jira","Jira"],["Postman","Postman","Postman"],
    ["Visual Studio Code","Visual Studio Code","Visual Studio Code","VS Code"],["Android Studio","Android Studio","Android Studio"],
    ["UI/UX design","UI/UX design","UI/UX-suunnittelu","käyttöliittymäsuunnittelu","käyttäjäkokemuksen suunnittelu"],
    ["Frontend development","Frontend development","Frontend-kehitys","front-end development","käyttöliittymäkehitys"],
    ["Backend development","Backend development","Backend-kehitys","back-end development","palvelinpuolen kehitys"],
    ["Full-stack development","Full-stack development","Full-stack-kehitys","full stack development"],
    ["Web development","Web development","Web-kehitys","verkkosivujen kehittäminen","verkkosivukehitys"],
    ["Application development","Application development","Sovelluskehitys","ohjelmistokehitys","software development","sovellusten kehittäminen"],
    ["Object-oriented programming","Object-oriented programming","Olio-ohjelmointi","OOP"],
    ["Responsive design","Responsive design","Responsiivinen suunnittelu","responsiivinen verkkosuunnittelu"],
    ["Accessibility","Accessibility","Saavutettavuus","digitaalinen saavutettavuus","WCAG"],
    ["Usability","Usability","Käytettävyys","käytettävyystestaus"],["Software testing","Software testing","Ohjelmistotestaus","testaus","QA"],
    ["Automated testing","Automated testing","Automaattinen testaus","testiautomaatio"],
    ["Cybersecurity","Cybersecurity","Kyberturvallisuus","tietoturva","tietoturvallisuus"],
    ["Web application security","Web application security","Verkkosovellusten tietoturva","verkkosivustojen tietoturva"],
    ["OWASP","OWASP","OWASP"],["Database design","Database design","Tietokantojen suunnittelu","tietokantasuunnittelu"],
    ["Data analysis","Data analysis","Data-analyysi","tietojen analysointi"],["Data visualisation","Data visualisation","Datan visualisointi","data visualization"],
    ["Project management","Project management","Projektinhallinta","projektijohtaminen"],["Project coordination","Project coordination","Projektikoordinointi"],
    ["Technical documentation","Technical documentation","Tekninen dokumentointi","tekninen kirjoittaminen"],
    ["Graphic design","Graphic design","Graafinen suunnittelu","visuaalinen suunnittelu"],
    ["Photography","Photography","Valokuvaus"],["Video production","Video production","Videotuotanto","videokuvaus"],
    ["Video editing","Video editing","Videoeditointi","videoiden editointi","videoleikkaus"],
    ["Audio editing","Audio editing","Äänieditointi","äänituotanto"],["Animation","Animation","Animaatio","animointi"],
    ["2D animation","2D animation","2D-animaatio"],["3D modelling","3D modelling","3D-mallinnus","3d-mallintaminen"],
    ["3D animation","3D animation","3D-animaatio"],["Motion graphics","Motion graphics","Liikegrafiikka","motion design"],
    ["Rigging","Rigging","Rigaus"],["Compositing","Compositing","Kompositointi"],["Lighting","Lighting","Valaistus","valaisu"],
    ["Streaming","Streaming","Suoratoisto","striimaus"],["Webcasting","Webcasting","Verkkolähetys","webcast"],
    ["Digital marketing","Digital marketing","Digitaalinen markkinointi","digimarkkinointi"],
    ["SEO","SEO","Hakukoneoptimointi","search engine optimisation","search engine optimization"],
    ["Social media","Social media","Sosiaalinen media","some"],["Content production","Content production","Sisällöntuotanto"],
    ["Content strategy","Content strategy","Sisältöstrategia"],["Copywriting","Copywriting","Tekstisuunnittelu"],
    ["Journalism","Journalism","Journalismi"],["Communications","Communications","Viestintä"],
    ["Internal communications","Internal communications","Sisäinen viestintä","henkilöstöviestintä"],
    ["Media relations","Media relations","Mediaviestintä","mediasuhteet"],["Customer service","Customer service","Asiakaspalvelu"],
    ["IT support","IT support","IT-tuki","helpdesk","service desk","tekninen tuki","käyttäjätuki"],
    ["Networking","Networking","Tietoverkot","verkkotekniikka"],["Cloud computing","Cloud computing","Pilvipalvelut"],
    ["Problem solving","Problem solving","Ongelmanratkaisu"],["Teamwork","Teamwork","Tiimityö","tiimityöskentely"],
    ["User research","User research","Käyttäjätutkimus"],["Wireframing","Wireframing","Rautalankamallit"],
    ["Prototyping","Prototyping","Prototypointi"],["Email marketing","Email marketing","Sähköpostimarkkinointi"],
    ["Campaign management","Campaign management","Kampanjanhallinta","kampanjasuunnittelu"],["Analytics","Analytics","Analytiikka","verkkoanalytiikka"]
  ];
  const roles = [
    ["Frontend Developer","Frontend-kehittäjä","frontend developer","front-end developer","frontend-kehittäjä","käyttöliittymäkehittäjä"],
    ["Backend Developer","Backend-kehittäjä","backend developer","back-end developer","backend-kehittäjä","palvelinpuolen kehittäjä"],
    ["Full-Stack Developer","Full-stack-kehittäjä","full stack developer","fullstack developer","full-stack-kehittäjä"],
    ["Software Developer","Ohjelmistokehittäjä","software developer","software engineer","ohjelmistosuunnittelija","ohjelmoija","sovelluskehittäjä"],
    ["Web Developer","Web-kehittäjä","web developer","verkkosivukehittäjä","verkkosivujen kehittäjä"],
    ["Mobile App Developer","Mobiilisovelluskehittäjä","mobile developer","mobile app developer","mobiilikehittäjä"],
    ["ICT Specialist","ICT-asiantuntija","ict specialist","it specialist","it-asiantuntija"],
    ["IT Support Specialist","IT-tukiasiantuntija","it support specialist","helpdesk specialist","service desk specialist","it-tukihenkilö","käyttäjätukiasiantuntija"],
    ["Systems Administrator","Järjestelmäasiantuntija","systems administrator","system administrator","järjestelmän ylläpitäjä"],
    ["Cybersecurity Analyst","Tietoturva-analyytikko","cybersecurity analyst","information security analyst","tietoturva-asiantuntija"],
    ["QA Tester","Ohjelmistotestaaja","qa tester","software tester","test engineer","testaaja","testausasiantuntija"],
    ["Data Analyst","Data-analyytikko","data analyst","analyytikko"],
    ["Database Administrator","Tietokanta-asiantuntija","database administrator","dba","tietokannan ylläpitäjä"],
    ["UI Designer","UI-suunnittelija","ui designer","käyttöliittymäsuunnittelija"],
    ["UX Designer","UX-suunnittelija","ux designer","user experience designer","käyttökokemussuunnittelija"],
    ["UI/UX Designer","UI/UX-suunnittelija","ui ux designer","ui/ux designer"],
    ["Graphic Designer","Graafinen suunnittelija","graphic designer","graafikko","visuaalinen suunnittelija"],
    ["Digital Designer","Digitaalinen suunnittelija","digital designer"],
    ["3D Artist","3D-artisti","3d artist","3d generalist","3d-mallintaja"],
    ["3D Animator","3D-animaattori","3d animator"],
    ["Motion Graphics Designer","Liikegrafiikan suunnittelija","motion graphics designer","motion designer"],
    ["Video Editor","Videoeditoija","video editor","leikkaaja"],
    ["Video Producer","Videotuottaja","video producer"],
    ["Multimedia Producer","Multimediatuottaja","multimedia producer","multimedia specialist","mediatuottaja"],
    ["AV Technician","AV-teknikko","av technician","audiovisual technician"],
    ["Photographer","Valokuvaaja","photographer"],
    ["Communications Specialist","Viestinnän asiantuntija","communications specialist","viestintäasiantuntija"],
    ["Communications Officer","Viestintäkoordinaattori","communications officer","communications coordinator","viestintäkoordinaattori"],
    ["Content Producer","Sisällöntuottaja","content producer","content creator","digitaalinen sisällöntuottaja"],
    ["Journalist","Toimittaja","journalist","reporter","verkkotoimittaja"],
    ["Copywriter","Tekstisuunnittelija","copywriter","content writer"],
    ["Digital Marketing Specialist","Digitaalisen markkinoinnin asiantuntija","digital marketing specialist","digimarkkinoinnin asiantuntija"],
    ["Social Media Specialist","Sosiaalisen median asiantuntija","social media specialist","social media manager","someasiantuntija"],
    ["SEO Specialist","Hakukoneoptimoinnin asiantuntija","seo specialist"],
    ["Marketing Coordinator","Markkinointikoordinaattori","marketing coordinator","markkinointiassistentti"],
    ["Project Coordinator","Projektikoordinaattori","project coordinator","projektisihteeri"],
    ["Project Manager","Projektipäällikkö","project manager","projektinvetäjä"],
    ["Technical Writer","Tekninen kirjoittaja","technical writer","technical documentation specialist"],
    ["Product Designer","Tuotesuunnittelija","product designer"],
    ["Product Owner","Tuoteomistaja","product owner"],
    ["Business Analyst","Liiketoiminta-analyytikko","business analyst"],
    ["Teacher","Opettaja","teacher","educator","kouluttaja"],
    ["School Assistant","Koulunkäynninohjaaja","school assistant","teaching assistant","koulunkäyntiavustaja"],
    ["Youth Worker","Nuoriso-ohjaaja","youth worker","youth instructor","nuorisotyöntekijä"],
    ["Customer Service Specialist","Asiakaspalvelija","customer service specialist","customer support specialist","asiakasneuvoja"],
    ["IT Project Manager","IT-projektipäällikkö","it project manager","ict-projektipäällikkö"],
    ["DevOps Engineer","DevOps-asiantuntija","devops engineer"],
    ["Cloud Engineer","Pilvipalveluasiantuntija","cloud engineer","cloud specialist"],
    ["Game Developer","Pelinkehittäjä","game developer","peliohjelmoija"],
    ["Animator","Animaattori","animator"],
    ["Art Director","Taiteellinen johtaja","art director"],
    ["Producer","Tuottaja","producer","tuotantokoordinaattori"]
  ];
  function normalize(value) {
    return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
      .toLowerCase().replace(/[’']/g,"").replace(/[–—]/g,"-")
      .replace(/[^a-z0-9+#.]+/g," ").trim().replace(/\s+/g," ");
  }
  function hasPhrase(text, phrase) {
    const source = " " + normalize(text).replace(/([a-z0-9+#])\.(?=\s|$)/g, "$1 ") + " ";
    const target = normalize(phrase);
    if (!target) return false;
    if (source.includes(" " + target + " ")) return true;
    const parts = target.split(" ");
    const last = parts.pop();
    const prefix = parts.length ? parts.join(" ") + " " : "";
    const finnishEndings = ["ssa","ssä","sta","stä","lla","llä","lle","ksi","tta","ttä","ia","iä","ja","in","issa","issä","een","ta","tä","n","a","ä"];
    return finnishEndings.some(ending => source.includes(" " + prefix + last + ending + " "));
  }
  const skillRecords = skills.map(([canonical,en,fi,...aliases]) => ({canonical,en,fi,aliases:(canonical==="Go"?["Golang"]:[canonical,en,fi,...aliases])}));
  const roleRecords = roles.map(([en,fi,...aliases]) => ({en,fi,aliases:[en,fi,...aliases]}));
  function extractSkills(text, language="en") {
    return skillRecords.filter(row=>row.aliases.some(alias=>hasPhrase(text,alias)))
      .map(row=>({canonical:row.canonical,label:language==="fi"?row.fi:row.en}));
  }
  function normalizeSkillTerms(values) {
    return values.map(value=>{
      const found=skillRecords.find(row=>row.aliases.some(alias=>hasPhrase(value,alias)));
      return found?normalize(found.canonical):normalize(value);
    });
  }
  function detectRoles(text, language="en") {
    return roleRecords.filter(row=>row.aliases.some(alias=>hasPhrase(text,alias)))
      .map(row=>language==="fi"?row.fi:row.en);
  }
  function normalizeRoleTitle(value) {
    const found=roleRecords.find(row=>row.aliases.some(alias=>hasPhrase(value,alias)));
    return found ? normalize(found.en) : normalize(value);
  }
  const api={extractSkills,normalizeSkillTerms,detectRoles,normalizeRoleTitle,containsPhrase:hasPhrase,normalize};
  root.RemoteJobFitVocabulary=api;
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
