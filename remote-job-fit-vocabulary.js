/* Project-maintained bilingual keyword vocabulary. See README.md for source notes. */
(function(root) {
  "use strict";
  const skills = [
    ["HTML","HTML","HTML"],["CSS","CSS","CSS"],["JavaScript","JavaScript","JavaScript","JS"],
    ["TypeScript","TypeScript","TypeScript","TS"],["React","React","React.js","Reactin"],["Next.js","Next.js","Next.js"],
    ["Node.js","Node.js","Node.js"],["Python","Python","Python"],["PHP","PHP","PHP"],["Java","Java","Java"],
    ["C#","C#","C#","C Sharp"],["C++","C++","C++","Cpp"],[".NET",".NET",".NET","Dotnet","ASP.NET"],
    ["Kotlin","Kotlin","Kotlin"],["Swift","Swift","Swift"],["Go","Go","Go","Golang"],["Rust","Rust","Rust"],["C","C","C"],["Scala","Scala","Scala"],["Dart","Dart","Dart"],["R","R","R"],["MATLAB","MATLAB","MATLAB"],["Bash","Bash","Bash"],["PowerShell","PowerShell","PowerShell"],["Lua","Lua","Lua"],["Perl","Perl","Perl"],["Haskell","Haskell","Haskell"],["Objective-C","Objective-C","Objective-C"],["Assembly language","Assembly language","Assembly-kieli","ASM"],["Solidity","Solidity","Solidity"],["Elixir","Elixir","Elixir"],["Erlang","Erlang","Erlang"],["Visual Basic","Visual Basic","Visual Basic","VB.NET"],
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
    ["Unreal Engine","Unreal Engine","Unreal Engine"],["Unity","Unity","Unity"],["Godot","Godot","Godot"],["Cinema 4D","Cinema 4D","Cinema 4D","C4D"],["ZBrush","ZBrush","ZBrush"],["Substance 3D Painter","Substance 3D Painter","Substance 3D Painter","Substance Painter"],["Adobe Lightroom","Lightroom","Adobe Lightroom"],["Adobe Audition","Audition","Adobe Audition"],["OBS Studio","OBS Studio","OBS Studio"],["Audacity","Audacity","Audacity"],["Final Cut Pro","Final Cut Pro","Final Cut Pro"],["IntelliJ IDEA","IntelliJ IDEA","IntelliJ IDEA"],["PyCharm","PyCharm","PyCharm"],["Eclipse","Eclipse","Eclipse"],["WebStorm","WebStorm","WebStorm"],["GitHub Copilot","GitHub Copilot","GitHub Copilot"],["Google Analytics","Google Analytics","Google Analytics"],["Google Ads","Google Ads","Google Ads"],["Meta Ads","Meta Ads","Meta-mainonta"],["HubSpot","HubSpot","HubSpot"],["Canva","Canva","Canva"],["Jira","Jira","Jira"],["Postman","Postman","Postman"],
    ["Visual Studio Code","Visual Studio Code","Visual Studio Code","VS Code"],["Android Studio","Android Studio","Android Studio"],
    ["UI/UX design","UI/UX design","UI/UX-suunnittelu","käyttöliittymäsuunnittelu","käyttäjäkokemuksen suunnittelu"],
    ["Frontend development","Frontend development","Frontend-kehitys","front-end development","käyttöliittymäkehitys"],
    ["Backend development","Backend development","Backend-kehitys","back-end development","palvelinpuolen kehitys"],
    ["Full-stack development","Full-stack development","Full-stack-kehitys","full stack development"],
    ["Web development","Web development","Web-kehitys","verkkosivujen kehittäminen","verkkosivukehitys"],
    ["Application development","Application development","Sovelluskehitys","Sovelluskehityksen","ohjelmistokehitys","software development","sovellusten kehittäminen"],
    ["Object-oriented programming","Object-oriented programming","Olio-ohjelmointi","OOP"],
    ["Responsive design","Responsive design","Responsiivinen suunnittelu","responsiivinen verkkosuunnittelu"],
    ["Accessibility","Accessibility","Saavutettavuus","digitaalinen saavutettavuus","saavutettavuusosaaminen","WCAG"],
    ["Usability","Usability","Käytettävyys","käytettävyystestaus"],["Software testing","Software testing","Ohjelmistotestaus","testaus","QA"],
    ["Automated testing","Automated testing","Automaattinen testaus","testiautomaatio"],
    ["Cybersecurity","Cybersecurity","Kyberturvallisuus","tietoturva","tietoturvan","tietoturvallisuus"],
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
    ["Campaign management","Campaign management","Kampanjanhallinta","kampanjasuunnittelu"],["Analytics","Analytics","Analytiikka","verkkoanalytiikka"],["Artificial intelligence","Artificial intelligence","Tekoäly","AI"],["Machine learning","Machine learning","Koneoppiminen","ML"],["Natural language processing","Natural language processing","Luonnollisen kielen käsittely","NLP"],["DevOps","DevOps","DevOps"],["CI/CD","CI/CD","Jatkuva integraatio ja toimitus","continuous integration","continuous delivery"],["Software architecture","Software architecture","Ohjelmistoarkkitehtuuri"],["Product management","Product management","Tuotehallinta","tuotejohtaminen"],["Brand design","Brand design","Brändisuunnittelu","visuaalinen identiteetti"],["Storytelling","Storytelling","Tarinankerronta"],["Editorial planning","Editorial planning","Toimituksellinen suunnittelu","toimitustyö"],["Radio production","Radio production","Radiotuotanto","radio-ohjelmien tuotanto"],["Broadcast production","Broadcast production","Lähetystuotanto","broadcast"],["Guidance counselling","Guidance counselling","Ohjaus ja neuvonta","ohjaustyö"],["Teaching","Teaching","Opetus","opettaminen"],["Youth work","Youth work","Nuorisotyö"],["Event coordination","Event coordination","Tapahtumakoordinointi"]
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
    ["Producer","Tuottaja","producer","tuotantokoordinaattori"],
    ["AI Engineer","Tekoälyinsinööri","ai engineer","artificial intelligence engineer","tekoälyasiantuntija"],
    ["Machine Learning Engineer","Koneoppimisinsinööri","machine learning engineer","ml engineer","koneoppimisasiantuntija"],
    ["Data Engineer","Data-insinööri","data engineer","data engineering specialist"],
    ["Data Scientist","Datatieteilijä","data scientist","datatieteilijä"],
    ["Security Researcher","Tietoturvatutkija","security researcher","tietoturvatutkija"],
    ["Penetration Tester","Tunkeutumistestaaja","penetration tester","pentester","tunkeutumistestaaja"],
    ["Software Architect","Ohjelmistoarkkitehti","software architect","ohjelmistoarkkitehti"],
    ["Systems Analyst","Järjestelmäanalyytikko","systems analyst","järjestelmäanalyytikko"],
    ["Site Reliability Engineer","Site Reliability Engineer","site reliability engineer","sre"],
    ["Platform Engineer","Alusta-asiantuntija","platform engineer","alustakehittäjä"],
    ["Embedded Software Developer","Sulautettujen järjestelmien ohjelmistokehittäjä","embedded software developer","embedded developer","sulautettujen järjestelmien kehittäjä"],
    ["Firmware Engineer","Laiteohjelmistokehittäjä","firmware engineer","laiteohjelmistokehittäjä"],
    ["Database Developer","Tietokantakehittäjä","database developer","tietokantakehittäjä"],
    ["Game Designer","Pelisuunnittelija","game designer","pelisuunnittelija"],
    ["Game Programmer","Peliohjelmoija","game programmer","peliohjelmoija"],
    ["Game Producer","Pelituottaja","game producer","pelituottaja"],
    ["Game Sound Designer","Peliäänisuunnittelija","game sound designer","peliäänisuunnittelija"],
    ["Telecommunications Engineer","Tietoliikenneinsinööri","telecommunications engineer","tietoliikenneinsinööri"],
    ["ICT Technician","ICT-asentaja","ict technician","ict-asentaja","tieto- ja tietoliikennetekniikan asentaja"],
    ["Webmaster","Verkkosivuston ylläpitäjä","webmaster","verkkosivuvastaava"],
    ["Web Content Manager","Verkkosisällön ylläpitäjä","web content manager","verkkosisällönhallitsija"],
    ["Web Designer","Web-suunnittelija","web designer","verkkosivusuunnittelija"],
    ["Network Engineer","Verkkosuunnittelija","network engineer","verkkoasiantuntija"],
    ["Technical Support Specialist","Teknisen tuen asiantuntija","technical support specialist","teknisen tuen asiantuntija"],
    ["Product Manager","Tuotepäällikkö","product manager","tuotepäällikkö"],
    ["Content Strategist","Sisältöstrategi","content strategist","sisältöstrategi"],
    ["Radio Producer","Radiotuottaja","radio producer","radiotuottaja"],
    ["School Counsellor","Koulunkäynnin ohjaaja","school counsellor","school counselor","opinto-ohjaaja"],
    ["After-school Instructor","Iltapäivätoiminnan ohjaaja","after-school instructor","iltapäiväkerhon ohjaaja"]
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
    const finnishEndings = ["ssa","ssä","sta","stä","lla","llä","lle","ksi","tta","ttä","ia","iä","ja","in","issa","issä","een","en","ta","tä","n","a","ä"];
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
  function compareSkills(candidateValues, requirementText, language="en") {
    const ambiguousSkills = new Set(["c", "r", "go"]);
    const candidate = new Set(normalizeSkillTerms(candidateValues));
    const source = String(requirementText || "");
    const requirements = extractSkills(source, language)
      .filter(item => !ambiguousSkills.has(normalize(item.canonical)));
    const unique = [...new Map(requirements.map(item => [item.canonical, item])).values()];
    const optionalMarkers = language === "fi"
      ? ["nice to have","preferred","bonus","an advantage","advantage","would be a plus","plussaa","eduksi","katsotaan eduksi","toivomme","arvostamme","etu","hyödyksi"]
      : ["nice to have","preferred","bonus","an advantage","advantage","would be a plus","plus","desirable","ideally","we value","beneficial"];
    const requiredMarkers = language === "fi"
      ? ["required","must have","essential","mandatory","välttämätön","pakollinen","vaaditaan","edellytetään","edellytämme","vaatimuksena","tulee osata","pitää osata"]
      : ["required","must have","essential","mandatory","must be able","you need","we require","requirement"];
    function contextFor(item) {
      const sentences = source.split(/[.!?;\\n]+/);
      const record = skillRecords.find(row => row.canonical === item.canonical);
      const aliases = record ? record.aliases : [item.canonical, item.label];
      return sentences.filter(sentence => aliases.some(alias => hasPhrase(sentence, alias)))
        .join(" ");
    }
    const required = [], optional = [];
    for (const item of unique) {
      const context = normalize(contextFor(item));
      const isOptional = optionalMarkers.some(marker => hasPhrase(context, marker)) &&
        !requiredMarkers.some(marker => hasPhrase(context, marker));
      const entry = {...item, found: candidate.has(normalize(item.canonical))};
      (isOptional ? optional : required).push(entry);
    }
    return {
      matched: required.filter(item => item.found),
      missing: required.filter(item => !item.found),
      optional
    };
  }
  function detectRoles(text, language="en") {
    return roleRecords.filter(row=>row.aliases.some(alias=>hasPhrase(text,alias)))
      .map(row=>language==="fi"?row.fi:row.en);
  }
  function normalizeRoleTitle(value) {
    const found=roleRecords.find(row=>row.aliases.some(alias=>hasPhrase(value,alias)));
    return found ? normalize(found.en) : normalize(value);
  }
  const api={extractSkills,normalizeSkillTerms,compareSkills,detectRoles,normalizeRoleTitle,containsPhrase:hasPhrase,normalize};
  root.RemoteJobFitVocabulary=api;
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
