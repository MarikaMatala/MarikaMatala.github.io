# The Cultured Vault — asennettava demo

<!-- Päivitetty: 6.11.2026 klo 20.27 (Europe/Helsinki). -->

> Kulttuuria löydettäväksi. Tarinoita muistettavaksi.

The Cultured Vault on avoimen lähdekoodin kulttuurikatalogiprojekti. Tämä kansio sisältää sen staattisen, asennettavan Progressive Web App (PWA) -demon. Demo havainnollistaa, miten elokuvat, sarjat, animaatiot, dokumentit, podcastit, musiikki, pelit ja kirjat voisivat löytyä samasta katalogista.

- **Toimiva demo:** https://marikamatala.github.io/The-Cultured-Vault-demo/
- **Pääprojektin repositorio:** https://github.com/MarikaMatala/The-Cultured-Vault
- **English guide:** [README.md](README.md)
- **Lyhyt asennusohje:** [INSTALLATION.md](INSTALLATION.md)

## 1. Mitä demo tekee?

Demo on tarkoituksella kevyt eikä tarvitse ulkoisia kirjastoja tai build-vaihetta. Se sisältää:

- 500 teoksen esimerkkikatalogin useista kulttuurisisällön kategorioista; alkuperäisten 14 esimerkin lisäksi katalogiin on lisätty 486 teosta eri kategorioista, mukaan lukien 1980-, 1990- ja 2000-lukujen kulttisarjoja, kulttileffoja, animaatioita ja piirrettyjä;
- haun nimen, tekijän, maan ja tyylilajien perusteella;
- kategoriasuodattimet ja lajittelun;
- ylläpitäjän arvio tilassa ”Ei vielä arviota” ja IMDb-arviot erillään;
- lomakkeen oman paikallisen demoarvion ja vapaaehtoisen kommentin lisäämiseen;
- suomen- ja englanninkielisen käyttöliittymän;
- puhelimille, tableteille ja tietokoneille mukautuvan asettelun;
- PWA-asetukset, sovelluskuvakkeet ja rajatun service workerin;
- perustason offline-latauksen sen jälkeen, kun sovelluksen tiedostot on tallennettu välimuistiin.

Tämä on käyttöliittymäprototyyppi. Sen tarkoitus on tehdä konseptista kokeiltava ennen varsinaisen backendin suunnittelua.

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

Sisältää alkuperäisen works-katalogin ja 486 lisäystä (yhteensä 500 teosta) sekä selaimessa toimivan logiikan:

1. lukee esimerkkikatalogin;
2. suodattaa ja lajittelee teoksia käyttöliittymän valintojen perusteella;
3. muodostaa katalogikortit DOM-menetelmillä;
4. näyttää ylläpitäjän oman arvion tilassa ”Ei vielä arviota” ja IMDb-arvosanat erillisinä;
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


## Omat arviot ja IMDb-arvosanat

Kaikkien katalogin teosten ylläpitäjän oma arvio näkyy aluksi tekstinä **Ei vielä arviota**. Oma numeroarvio ja arvosteluteksti lisätään vasta, kun ylläpitäjä itse arvioi teoksen. IMDb:n käyttäjäarvosanat näytetään erillisinä ulkoisina viitetietoina, ei ylläpitäjän arvioina tai yhteisön keskiarvoina. IMDb-arvot ovat staattinen lähdehetken tilanne ja voivat muuttua. Ajatusviiva tarkoittaa, ettei vahvistettua IMDb-arvoa ole lisätty tähän demoon – se ei tarkoita nollaa. Jokaisesta teoksesta on IMDb-hakulinkki ajantasaisen arvon tarkistamiseen. IMDb:n virallisen ei-kaupallisen aineiston kuvaus ja ehdot: https://developer.imdb.com/non-commercial-datasets/.

Alkuperäisten 14 esimerkin lisäksi katalogiin on lisätty 486 teosta eri kategorioista. Kaikkien nimikkeiden tekijä-, lajityyppi- ja maatietoja ei ole vielä täydennetty. Osasta uusista teoksista puuttuu vielä tekijä-, lajityyppi- tai maatietoja.


## Teosehdotukset ja omat arviot

Katalogissa on nyt 500 teosta. Kävijä voi ehdottaa puuttuvaa elokuvaa, sarjaa, animaatiota, dokumenttia, podcastia, albumia, peliä tai kirjaa. Ehdotukseen voi lisätä julkaisuvuoden, tekijän ja lisätiedon. Ehdotukset tallentuvat selaimen localStorageen avaimella `cultured-vault-suggestions-v1`; ne näkyvät vain samassa selaimessa ja laitteessa, eikä niitä lähetetä ylläpitäjälle ilman backendia.

Kaikkien teosten oma arvio näytetään tekstinä **Ei vielä arviota**. Oma numeroarvio ja arvosteluteksti lisätään vasta, kun ylläpitäjä itse arvioi teoksen. IMDb-arvosanat näytetään erillisinä ulkoisina viitetietoina.
