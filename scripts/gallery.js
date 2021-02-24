document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    loadJSON();
})


//Definerer konstanter til brug i dropdown
const dropdownButton = document.querySelector("#dropdown_flex");
const dropdownItems = document.querySelector("#dropdown_items");

dropdownButton.addEventListener("click", dropdownMenu);

function dropdownMenu() {
    console.log("dropdownMenu");

    if (dropdownItems.style.display == "block") {
        dropdownItems.style.display = "none"
    } else {
        dropdownItems.style.display = "block";
    }
}

//Her definerers filtervariabel og -funktion
let filter = "Alle";
const filterButtons = document.querySelectorAll("#dropdown_items button");
//Her lægges en eventlisner på alle filteringsknapper, og sender ved klik en ned i funktionen filterArt.
filterButtons.forEach(button => button.addEventListener("click", filterArt));


// Funktionen der filtrer indholdet på siden, alt efter hvad det klikkes på
function filterArt() {
    filter = this.dataset.materiale; // Her sættes filteret lig med materialet på knappens dataset-attribut
    console.log(filter);

    document.querySelector(".selected").classList.remove("selected"); //fjerner css class med den lyserøde baggrundsfarve

    this.classList.add("selected"); // tilføjer class med den lyserøde baggrundsfarve

    //Fjerner dropdown på mobilversion
    dropdownItems.style.display = "none";

    //Sætter dropdown til sig selv

    dropdownButton.firstElementChild.textContent = filter;

    showArt();
}

let art;

//Her defineres konstanter til senere brug for fetch af json
const url = "https://vnduprojekt-ec80.restdb.io/rest/vndu";
const media = "https://vnduprojekt-ec80.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "602e74535ad3610fb5bb6333"
    }
};

// Her hentes json ind fra restdb, og sendes vider til funktionen showArt
async function loadJSON() {
    //Henter json og gemmer det som art
    const JSONData = await fetch(url, options);
    art = await JSONData.json();
    showArt();
}


// I funktionen showArt, sættes hvert enkelt kunstværk ind i HTML
function showArt() {
    console.log("showingArt");
    console.log(art);

    //Her definerers konstanter til senere brug i kloningen af template
    const template = document.querySelector("template");
    const container = document.querySelector(".container")

    container.textContent = ""; // HTML containeren tømmes for eksisterende indhold, og kan nu få tilført nyt indhold.

    art.forEach(artwork => {
        if (filter == "Alle" || filter == artwork.materiale) {
            console.log("looping");

            let clone = template.cloneNode(true).content; //Her klones template og udfyldes  med data fra json

            clone.querySelector("img").src = media + artwork.billede[0];
            clone.querySelector("img").alt = artwork.kort;
            clone.querySelector("h2").textContent = artwork.navn;
            clone.querySelector("h3").textContent = `Af ${artwork.kunstner}`;
            clone.querySelector("p").textContent = artwork.kort;
            clone.querySelector("article").addEventListener("click", () => showDetails(artwork));
            container.appendChild(clone); //kolene tilføres til DOM
        }
    })
}

// Når der klikkes på et enkelt kunstværk, føres du ind i et single-view
function showDetails(artwork) {
    console.log("showDetails");
    location.href = `artwork.html?id=${artwork._id}`;
}
