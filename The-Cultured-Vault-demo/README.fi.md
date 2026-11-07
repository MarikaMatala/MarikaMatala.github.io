# The Cultured Vault — asennettava demo

<!-- Päivitetty: 6.11.2026. -->

> Kulttuuria löydettäväksi. Tarinoita muistettavaksi.

The Cultured Vault on avoimen lähdekoodin kulttuurikatalogiprojekti. Tämä kansio sisältää sen staattisen, asennettavan Progressive Web App (PWA) -demon. Demo havainnollistaa, miten elokuvat, sarjat, animaatiot, dokumentit, podcastit, musiikki, pelit ja kirjat voisivat löytyä samasta katalogista.

- **Toimiva demo:** https://marikamatala.github.io/The-Cultured-Vault-demo/
- **Pääprojektin repositorio:** https://github.com/MarikaMatala/The-Cultured-Vault
- **English guide:** [README.md](README.md)
- **Lyhyt asennusohje:** [INSTALLATION.md](INSTALLATION.md)

## 1. Mitä demo tekee?

Demo on tarkoituksella kevyt eikä tarvitse ulkoisia kirjastoja tai build-vaihetta. Se sisältää:

- 1 000 teoksen esimerkkikatalogin useista kulttuurisisällön kategorioista; alkuperäisten 14 esimerkin lisäksi mukana on 986 lisättyä teosta. Laajennettu valikoima sisältää Studio Ghiblin ja Disneyn animaatioita, 1990- ja 2000-lukujen nostalgiaelokuvia, yliluonnollisia ja kulttisarjoja sekä tunnettuja Netflix-sarjoja, kuten Stranger Things, Wednesday, Squid Game, Dark ja Bridgerton;
- haun nimen, tekijän, maan ja tyylilajien perusteella;
- kategoriasuodattimet ja lajittelun, oletuksena aakkosjärjestys;
- A–Ö- ja Å–Ä–Ö-aakkoshakemiston sekä 0–9-numerohakemiston; molemmista voi hypätä suoraan vastaavaan teosryhmään, puuttuvat vaihtoehdot eivät ole valittavissa ja hakemistot mukautuvat hakuun ja kategoriasuodatukseen; hakemistot pysyvät näkyvissä sivua vieritettäessä;
- ylläpitäjän oma arvio erillään ulkoisista viitearvioista: IMDb-arvosana (asteikko 0–10) sekä Rotten Tomatoesin kriitikkoarvio (Tomatometer) ja yleisöarvio (Popcornmeter);
- lomakkeen oman paikallisen demoarvion ja vapaaehtoisen kommentin lisäämiseen;
- suomen- ja englanninkielisen käyttöliittymän;
- puhelimille, tableteille ja tietokoneille mukautuvan asettelun;
- PWA-asetukset, sovelluskuvakkeet ja rajatun service workerin;
- perustason offline-latauksen sen jälkeen, kun sovelluksen tiedostot on tallennettu välimuistiin.

Tämä on käyttöliittymäprototyyppi. Sen tarkoitus on tehdä konseptista kokeiltava ennen varsinaisen backendin suunnittelua.

### IMDb- ja Rotten Tomatoes -arviot

Teoskortit ja teosten lisätiedot voivat näyttää IMDb-arvosanan sekä Rotten Tomatoesin kaksi erillistä prosenttiarviota: **Tomatometer** kuvaa kriitikoiden arvioita ja **Popcornmeter** yleisön arvioita. Arvot ovat ulkoisista lähteistä koottuja viitetietoja, eivät tämän projektin omia arvioita. Tiedot näytetään vain silloin, kun ne on voitu yhdistää oikeaan teokseen ja lähdetieto on saatavilla. Puuttuva arvo merkitään puuttuvaksi — sitä ei tulkita nollaksi eikä arvailla.

Vastaanottotunniste (esimerkiksi myönteinen tai mielipiteitä jakava vastaanotto) muodostetaan saatavilla olevien arvosanojen perusteella. Se on suuntaa antava luokitus, ei mittaus teoksen suosiosta, katselumääristä tai arvioiden lukumäärästä. Rotten Tomatoes -arvioita ei ole kaikille katalogin mediatyypeille.


## 2. Mitä demo ei vielä tee?

Tässä versiossa ei ole rekisteröitymistä, kirjautumista, käyttäjäprofiileja, palvelinta, API:a, yhteistä tietokantaa, muille näkyviä käyttäjäarvioita, laitteiden välistä synkronointia, reaaliaikaista kolmannen osapuolen metadataa, natiivia APK- tai IPA-pakettia eikä Google Play- tai App Store -julkaisua.

Katalogin teokset ja arvosanat ovat esimerkkejä. Demoon kirjoitettu arvio tallentuu vain kyseisen selaimen localStorage-tallennustilaan. Sitä ei lähetetä palvelimelle eikä GitHubiin. Selaintietojen tyhjentäminen voi poistaa arvion. Älä syötä salasanoja, yksityisiä tietoja tai arkaluonteista sisältöä.

## 3. Vaatimukset

Demon selaamiseen:
- moderni selain (Chrome, Edge, Firefox, Safari tai Samsung Internet);
- JavaScript käytössä.

Käyttäjätiliä, API-avainta, tietokantaa, paketinhallintaa tai build-työkalua ei tarvita.

PWA-asennuksen ja offline-tilan paikalliseen testaamiseen:
- paikallinen web-palvelin, esimerkiksi VS Code Live Server tai Pythonin sisäänrakennettu HTTP-palvelin;
- HTTPS tai localhost. Service worker ei toimi file://-osoitteesta avattuna.

Oman kopion julkaisemiseen:
- GitHub-tili ja fork tästä julkisesta repositoriosta tai muu staattinen HTTPS-hostaus;
- Git on suositeltava, mutta tiedostoja voi muokata myös GitHubin verkkokäyttöliittymässä.

## 4. Käynnistä paikallisesti alusta lähtien

### Vaihtoehto A — Visual Studio Code

1. Asenna Git ja Visual Studio Code.
2. Kloonaa tai lataa portfoliosivuston repositorio.
3. Avaa repositorion kansio Visual Studio Codessa.
4. Avaa The-Cultured-Vault-demo-kansio.
5. Asenna Live Server -laajennus, jos sitä ei vielä ole.
6. Napsauta index.html-tiedostoa hiiren oikealla ja valitse **Open with Live Server**.
7. Selain avaa demon localhost-osoitteessa.

### Vaihtoehto B — Python

1. Asenna Python 3.
2. Avaa pääte The-Cultured-Vault-demo-kansiossa.
3. Suorita:

~~~bash
python -m http.server 8000
~~~

4. Avaa selaimessa http://localhost:8000.
5. Pysäytä palvelin näppäinyhdistelmällä Ctrl+C.

Joissakin järjestelmissä komento on python3 -m http.server 8000.

### Vaihtoehto C — kokeile julkaistua demoa

Avaa https://marikamatala.github.io/The-Cultured-Vault-demo/ . Tämä on helpoin tapa kokeilla käyttöliittymää puhelimella tai tietokoneella.

## 5. Asenna puhelimeen

### Samsung ja muut Android-laitteet

1. Avaa julkaistu HTTPS-demo Chromessa.
2. Avaa Chromen kolmen pisteen valikko.
3. Valitse **Asenna sovellus** tai **Lisää aloitusnäyttöön**. Teksti vaihtelee selainversion mukaan.
4. Vahvista asennus.

Jos asennuskehotetta ei näy, tarkista löytyykö valikosta Lisää aloitusnäyttöön. Sivun tulee käyttää HTTPS-yhteyttä, manifestin ja kuvakkeiden täytyy latautua ja service workerin rekisteröityä.

### iPhone ja iPad

1. Avaa HTTPS-demo Safarissa.
2. Napauta Jaa-kuvaketta.
3. Valitse **Lisää Koti-valikkoon**.
4. Vahvista valitsemalla **Lisää**.

iOS-laitteissa Safari on luotettavin tapa lisätä verkkosovellus Koti-valikkoon. Chromium-selainten JavaScript-asennuskehotetta ei kuulu näkyä Safarissa.

## 6. Tiedostorakenne

~~~text
The-Cultured-Vault-demo/
├── index.html               # Sivun rakenne, tekstit ja saavutettavuuden maamerkit
├── styles.css               # Teema, komponentit, responsiivisuus ja saavutettavuus
├── app.js                   # Esimerkkidata, haku, suodattimet ja paikalliset arviot
├── manifest.webmanifest     # PWA:n nimi, kuvakkeet, käyttöalue ja näyttötila
├── sw.js                    # Sovelluksen välimuisti ja offline-tuki
├── INSTALLATION.md          # Lyhyt Android- ja iOS-asennusohje
├── README.md                # Laaja englanninkielinen ohje
├── README.fi.md             # Tämä suomenkielinen ohje
└── icons/
    ├── vault-icon.svg       # Yleinen sovelluskuvake
    ├── vault-maskable.svg   # Android-käynnistimien maskable-kuvake
    ├── apple-touch-icon.svg # Kuvakkeen vektorimuotoinen lähde
    └── apple-touch-icon.png # Applen Koti-valikon 180 × 180 PNG-kuvake
~~~

Sovellus käyttää suhteellisia tiedostopolkuja, joten demo toimii myös GitHub Pagesin alikansiossa eikä vain verkkotunnuksen juuressa.

## 7. Miten koodi toimii?

### index.html

Sisältää sivun rakenteen, kaksikieliset tekstit, lomakekentät, saavutettavuuden maamerkit, PWA-metatiedot ja paikallisten tiedostojen linkit. Se lataa styles.css- ja app.js-tiedostot. Varsinaiset tyylit ja sovelluslogiikka pidetään erillään.

### styles.css

Sisältää visuaalisen ilmeen. Värit on määritelty tiedoston alussa :root-muuttujissa. Niitä muuttamalla voit vaihtaa tummaa pronssi-, hopea- ja kultapalettia. Responsiiviset katkaisukohdat mukauttavat näkymän pienille näytöille. Reduced-motion-sääntö huomioi käyttöjärjestelmän liikkeen vähentämisen asetuksen.

### app.js

Sisältää alkuperäisen works-katalogin ja 986 lisäystä (yhteensä 1 000 teosta), mukaan lukien 328 katalogimerkinnän metatietojen täydennyksen, sekä selaimessa toimivan logiikan:

1. lukee esimerkkikatalogin;
2. suodattaa ja lajittelee teoksia käyttöliittymän valintojen perusteella; näyttää aakkosjärjestyksessä kirjainryhmät sekä niihin johtavat A–Ö- ja 0–9-hakemistot;
3. muodostaa katalogikortit DOM-menetelmillä;
4. näyttää ylläpitäjän oman arvion erillään IMDb- ja Rotten Tomatoes -viitearvioista (Tomatometer ja Popcornmeter), kun tiedot ovat saatavilla;
5. tallentaa kävijän oman demoarvion selaimen paikalliseen tallennustilaan;
6. vaihtaa suomen- ja englanninkielisen käyttöliittymän;
7. rekisteröi service workerin HTTPS- tai localhost-ympäristössä.

Käyttäjän syöttämä teksti lisätään näkymään textContent-ominaisuudella eikä sitä tulkita HTML-koodiksi.

### manifest.webmanifest

Kertoo selaimelle sovelluksen nimen, aloitusosoitteen, käyttöalueen, näyttötilan, teemavärit ja kuvakkeet. Tiedosto on JSON-muodossa, joten siihen ei saa lisätä JavaScript-tyylisiä kommentteja.

### sw.js

Tallentaa staattiset sovellustiedostot välimuistiin ensimmäisen onnistuneen verkkolatauksen yhteydessä. Se rekisteröidään vain tämän demo-kansion käyttöalueelle, joten se ei hallitse muuta portfoliosivustoa. Välimuistin nimessä on versionumero. Kasvata sitä, kun muutat välimuistiin tallennettavia tiedostoja tai haluat selainten ottavan uuden välimuistin käyttöön.

## 8. Muokkaa esimerkkikatalogia

Avaa app.js ja etsi tiedoston alusta works-taulukko. Yksittäinen teos noudattaa tätä rakennetta:

~~~js
{
  id: "film-example-2026",
  title: "Example title",
  creator: "Creator or studio",
  type: "film",
  year: 2026,
  genres: ["Drama", "Mystery"],
  country: "Country",
  owner: null,
  imdbRating: null,
  rottenTomatoesCritics: null,
  rottenTomatoesAudience: null,
  rottenTomatoesUrl: null,
  ownerReview: ""
}
~~~

Jokaisella teoksella pitää olla yksilöllinen id. type-arvon täytyy vastata typeLabels-olion avainta ja index.html-tiedoston kategoriasuodatinta. Nykyiset tyypit ovat:

- film
- series
- animation
- documentary
- podcast
- music
- game
- book

Käytä arvoa year: null, jos vuosi ei sovellu tai sitä ei haluta ilmoittaa. Demo käyttää arvioasteikkoa 1–10.

Uuden kategorian lisääminen vaatii muutoksen kolmeen kohtaan: teoksen tyyppi app.js-tiedostossa, kaksikieliset nimet typeLabels-oliossa ja kategorian suodatinpainike index.html-tiedostossa.

## 9. Muokkaa ulkoasua ja kieliä

- Muuta värejä styles.css-tiedoston alussa olevista muuttujista.
- Muokkaa suomen- ja englanninkielisiä tekstejä index.html-tiedoston data-fi- ja data-en-attribuuteissa.
- Muokkaa dynaamisia käyttöliittymätekstejä app.js-tiedoston ui- ja typeLabels-olioissa.
- Säilytä näkyvät kohdistustyylit ja riittävä kontrasti.
- Testaa näkymä puhelimella, tabletilla ja tietokoneella.

## 10. Paikallinen tallennus ja tietosuoja

Demo käyttää selaimen localStorage-tallennustilaa ja avainta cultured-vault-demo-reviews-v1 omien demoarvioiden tallentamiseen. Tallennus on selainprofiili- ja verkkotunnuskohtainen:

- toisella laitteella tallennettu arvio ei näy toisella laitteella;
- yksityinen selaustila voi tyhjentää tiedot istunnon päättyessä;
- sivuston tietojen tyhjentäminen voi poistaa arviot;
- localStorage ei ole suojattu tietokanta eikä sitä pidä käyttää tunnusten tai arkaluonteisen sisällön säilyttämiseen.

Tuotantoversio tarvitsee erikseen suunnitellun tietomallin, kirjautumisen, käyttöoikeudet, tietokantasäännöt, varmuuskopiot, tietosuojadokumentaation ja suojatun backendin. Älä lisää julkiseen repositorioon käyttäjien yksityisiä tietoja, API-avaimia tai salasanoja.

## 11. PWA-välimuisti ja ongelmatilanteet

**Uusimmat muutokset eivät näy:** sulje asennettu sovellus ja avaa se uudelleen. Service worker saattaa näyttää vanhaa välimuistiversiota. Kehityksen aikana voit tyhjentää sivuston tallennustilan ja välimuistin selaimen kehittäjätyökaluista. Kun muutat sovelluksen välimuistiin tallennettavia tiedostoja, kasvata sw.js-tiedoston CACHE_NAME-versionumeroa.

**Asennusvaihtoehtoa ei näy:** varmista HTTPS-yhteys, manifestin latautuminen, kuvakkeiden oikeat polut ja service workerin onnistunut rekisteröinti. iOS:llä käytä Safarin Jaa → Lisää Koti-valikkoon -toimintoa.

**Sivu näkyy ilman tyylejä:** tarkista, että index.html viittaa styles.css-tiedostoon ja että CSS on samassa kansiossa.

**Offline-tila ei toimi ensimmäisellä kerralla:** selaimen täytyy ensin ladata demo verkossa, jotta service worker voi tallentaa sovelluksen tiedostot välimuistiin. Testaa sitten uudelleen verkkoyhteys katkaistuna.

**localStorage-virhe:** selain voi estää tallennuksen yksityisessä selaustilassa tai tietosuoja-asetusten vuoksi. Katalogin selaamisen pitäisi silti toimia.

## 12. Saavutettavuus ja laadunvarmistus

Testaa ennen muutosten julkaisemista:

- käyttö pelkällä näppäimistöllä ja näkyvät kohdistukset;
- ohituslinkki ja otsikkotasojen looginen järjestys;
- lomakkeiden nimilaput ja tilaviestien ilmoittaminen;
- puhelinnäkymä 320–390 CSS-pikselin leveydellä;
- selaimen suurennus 200 prosenttiin;
- reduced-motion-asetus;
- suomen- ja englanninkieliset tekstit;
- haku, lajittelu ja kaikki kategoriat;
- arvostelulomakkeen validointi ja paikallinen tallennus;
- PWA-asennus ja offline-avaus HTTPS-ympäristössä.

Automaattiset saavutettavuustyökalut auttavat, mutta ne eivät korvaa näppäimistö- ja ruudunlukijatestausta.

## 13. Osallistuminen ja lisenssi

Demo kuuluu julkiseen The Cultured Vault -projektiin. Voit haarauttaa repositorion, kokeilla muutoksia, ilmoittaa virheistä ja ehdottaa parannuksia. Tutustu pääprojektin [CONTRIBUTING.md-ohjeeseen](https://github.com/MarikaMatala/The-Cultured-Vault/blob/main/CONTRIBUTING.md) ja [MIT-lisenssiin](https://github.com/MarikaMatala/The-Cultured-Vault/blob/main/LICENSE).

Jos julkaiset oman haarautetun version, käytä omaa hostausta, verkkotunnusta, tietokantaa ja API-tunnuksia. Alkuperäinen ylläpitäjä ei tarjoa haaroille automaattisesti hostausta, käyttäjätilejä tai yhteistä infrastruktuuria.

---

**Avaa holvi. Löydä jotain poikkeuksellista.**


## Omat arviot, IMDb ja Rotten Tomatoes

Kaikkien katalogin teosten ylläpitäjän oma arvio näkyy aluksi tekstinä **Ei vielä arviota**. Oma numeroarvio ja arvosteluteksti lisätään vasta, kun ylläpitäjä itse arvioi teoksen. IMDb:n käyttäjäarvosanat sekä Rotten Tomatoesin kriitikoiden Tomatometer- ja yleisön Popcornmeter-prosentit näytetään erillisinä ulkoisina viitetietoina, ei ylläpitäjän arvioina. Rotten Tomatoes -arvot lisätään vain, kun oikea teos ja lähdesivu on vahvistettu. Ajatusviiva tarkoittaa, ettei vahvistettua arvoa ole lisätty tähän demoon – se ei tarkoita nollaa. Vastaanottoluokitus muodostetaan saatavilla olevista arvosanoista; se ei väitä teoksen katsojamäärää tai todellista suosiota. Arvot ovat staattinen lähdehetken tilanne ja voivat muuttua. Jokaisesta teoksesta on IMDb- ja Rotten Tomatoes -hakulinkit ajantasaisen arvon tarkistamiseen. IMDb:n virallisen ei-kaupallisen aineiston kuvaus ja ehdot: https://developer.imdb.com/non-commercial-datasets/.

Alkuperäisten 14 esimerkin lisäksi katalogiin on lisätty 986 teosta eri kategorioista. Uusimmista 450 lisäyksestä 322 teokselle on nyt täydennetty tekijä tai kirjailija, julkaisu- tai ilmestymisvuosi, lajityypit ja alkuperämaa. Kuudelle aiemmalle teokselle on lisäksi täydennetty puuttuvia tietoja. Uusimmista lisäyksistä 128 odottaa vielä metatietojen selvittämistä. Tiedot lisätään vain, kun nimike voidaan tunnistaa riittävän varmasti; epävarmat kentät jätetään tyhjiksi. IMDb- tai yhteisöarvosanoja ei keksitä.


## Teosehdotukset ja omat arviot

Katalogissa on nyt 1 000 teosta. Kävijä voi ehdottaa puuttuvaa elokuvaa, sarjaa, animaatiota, dokumenttia, podcastia, albumia, peliä tai kirjaa. Ehdotukseen voi lisätä julkaisuvuoden, tekijän ja lisätiedon. Ehdotukset tallentuvat selaimen localStorageen avaimella `cultured-vault-suggestions-v1`; ne näkyvät vain samassa selaimessa ja laitteessa, eikä niitä lähetetä ylläpitäjälle ilman backendia.

Kaikkien teosten oma arvio näytetään tekstinä **Ei vielä arviota**. Oma numeroarvio ja arvosteluteksti lisätään vasta, kun ylläpitäjä itse arvioi teoksen. IMDb-arvosanat näytetään erillisinä ulkoisina viitetietoina.


## Kirjojen arviot ja laajennettu katalogi

Ensimmäisellä verkkokäynnillä demo tuo BookRankin julkisista kategoriatiedostoista enintään 1 000 lisäkirjaa. Jokaisesta tuodusta teoksesta saadaan nimi, kirjailija, vuosi, BookRankin yhdistelmäarvio, arvioiden määrä, kategoria, lähdeaineiston tilannepäivä ja suora linkki kirjan lähdesivulle. Ladattu katalogi tallennetaan localStorageen myöhempiä käyntejä varten. Paikallinen aloituskatalogi toimii myös silloin, jos lähdepalvelu ei ole käytettävissä.

BookRank julkaisee pisteet, sijoitukset ja luottamusarvot **CC BY 4.0** -lisenssillä. Teosten lisätiedoissa näkyy lähdemaininta **BookRank (openbookrank.com)** sekä suora linkki lähdesivulle. Piste on BookRankin oma painotettu yhdistelmäarvio, eikä sitä esitetä Goodreads-, Google Books- tai Hardcover-arviona. Lähde ja pisteytysmenetelmä: https://openbookrank.com/en/open-data ja https://openbookrank.com/en/methodology. Lähdekategorioista muodostuvat tyylilajisuodattimet lisätään, kun aineisto latautuu.
