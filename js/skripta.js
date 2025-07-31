document.getElementById("otvoriModal").addEventListener("click", function (e) 
{
  e.preventDefault();
  fetch("modali/modal1.html")
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("containerModal");
      container.innerHTML = html;

      // Dodaj CSS modal1
      const stil = document.createElement("link");
      stil.rel = "stylesheet";
      stil.href = "modali/modal1.css";
      document.head.appendChild(stil);

      // Učitaj JS modal1
      const skripta = document.createElement("script");
      skripta.src = "modali/modal1.js";
      document.body.appendChild(skripta);
    });
});
//***************************************************************************************************** 
//funkcija za otvaranje modala na onclik:
//kreiramo 2 objekta: overlay (pozadina oko modala) i sam modal.

function DrugiModal() 
{
  // Kreiraj overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = 999;
  document.body.appendChild(overlay);

  // Kreiraj modal
  const modal = document.createElement("div");
  modal.textContent = "Dobrodošli u 2. modal !!";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "#fff";
  modal.style.padding = "50px";
  modal.style.borderRadius = "8px";
  modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  modal.style.zIndex = 1000;
  document.body.appendChild(modal);

  // Funkcija za zatvaranje na klik kada kliknemo bilo gde van modala
  //u okviru funkcije DrugiModal() 
  
  overlay.addEventListener("click", () => {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  });
}

//-----------------------------------------------------------------------------------------------

//***********************************************************************************************

// Otvaranje stranice za upis slika - iFrame


document.getElementById("id_upis").addEventListener("click", function () 
{
  const frame = document.getElementById("content-frame");
  frame.src = "UpisSlika/index.html";
  frame.style.display = "block";
  frame.style.psition = "fixed";
  frame.style.pointerEvents = "auto"; // omogućava interakciju sa iFrame-om
  frame.style.zIndex = "100"; // postavlja iFrame iznad ostalog sadržaja
  document.getElementById("zatvori-btn").style.display = "inline-block";
});

// zatvaranje stranice    ** ** *** ***** *** **** *** **** *** *** ** **** ***
document.getElementById("zatvori-btn").addEventListener("click", function () 
{
  const frame = document.getElementById("content-frame");
  frame.src = "";
  frame.style.display = "none";
  this.style.display = "none"; // sakriva dugme - kao tekući objekat
  frame.style.pointerEvents = "none";
 
});


//***********************************************************************************************

// DVA MODALA - GALERIJA I DETALJI !!!! -----------------------------------------------

document.getElementById("pregledSlika").addEventListener("click", () => 
  {
    fetch("UpisSlika/slike.json")
      .then(response => response.json())
      .then(data => prikaziGaleriju(data));
  });

//  PRIKAZ GALERIJE
function prikaziGaleriju(slike)
{
  const modal = document.getElementById("galerijaModal");
  const galerijaDiv = document.getElementById("galerijaSlika");
  galerijaDiv.innerHTML = "";

  slike.forEach(slika =>
    {
      // Kreiramo kontejner za sliku i tekst zajedno
      const slikaKontejner = document.createElement("div");
      slikaKontejner.classList.add("slika-kontejner"); // Dodajemo klasu za stilizaciju
      slikaKontejner.style.textAlign = "center";

      // Slika
      const img = document.createElement("img");
      img.src = `slike/${slika.folder}/${slika.ime}`;
      img.alt = slika.opis || slika.ime;
      img.classList.add("galerija-img");

      img.addEventListener("click", () => prikaziDetalje(slika));

      // Ime fajla
      const nazivLabela = document.createElement("div");
      nazivLabela.textContent = slika.ime;
      nazivLabela.classList.add("slika-ime");

      // Autor
      const autorLabela = document.createElement("div");
      autorLabela.textContent = slika.autor;
      autorLabela.classList.add("slika-autor");

      // Dodavanje u kontejner
      slikaKontejner.appendChild(img);
      slikaKontejner.appendChild(nazivLabela);
      slikaKontejner.appendChild(autorLabela);

      // Dodavanje u galeriju
      galerijaDiv.appendChild(slikaKontejner);
  });

  modal.style.display = "block";
  validirajHover();



}

/*/ validacija za hover:

function validirajHover() 
{
  const slike = document.querySelectorAll(".galerija-img");

  slike.forEach((img, index) => 
  {
    const ime = img.src.split("/").pop();
    const imaKlasu = img.classList.contains("galerija-img") ? "✓" : "✗";
    const rect = img.getBoundingClientRect();
    console.log(`Slika #${index + 1}: ${ime} | Klasa: ${imaKlasu} | Dimenzije: ${rect.width}x${rect.height}`);
  });
}

*/

//    ZATVARANJE MODALA GALERIJA

document.getElementById("zatvoriGaleriju").addEventListener("click", () =>  
  {
    document.getElementById("galerijaModal").style.display = "none";
  });

//    ZATVARANJE MODALA DETALJI

document.getElementById("zatvoriDetalje").addEventListener("click", () => 
  {
    document.getElementById("detaljiModal").style.display = "none";
  });

//    PRIKAZ MODALA DETALJI

function prikaziDetalje(slika) 
{
  document.getElementById("uvecanaSlika").src = `slike/${slika.folder}/${slika.ime}`;

  const infoDiv = document.getElementById("informacijeSlike");
  infoDiv.innerHTML = `
    <h2>${slika.ime}</h2>
    <p><strong>Autor:</strong> ${slika.autor}</p>
    <p><strong>Tehnika:</strong> ${slika.tehnika}</p>
    <p><strong>Format:</strong> ${slika.format}</p>
    <p><strong>Opis:</strong> ${slika.opis}</p>
    <p><strong>Folder:</strong> ${slika.folder}</p>
  `;

  document.getElementById("detaljiModal").style.display = "block";
}

