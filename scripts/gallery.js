document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    loadJSON();
})

//Definerer filtervariabel og -funktion
let filter = "Alle";
const filterButtons = document.querySelectorAll("#section_gallery nav button");
filterButtons.forEach(button => button.addEventListener("click", filterArt));

function filterArt() {
    filter = this.dataset.materiale;
    console.log(filter);

    document.querySelector(".selected").classList.remove("selected");
    this.classList.add("selected");

    showArt();
}

let art;

//Definerer konstanter til senere brug for fetch af json
const url = "https://vnduprojekt-ec80.restdb.io/rest/vndu";
const media = "https://vnduprojekt-ec80.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "602e74535ad3610fb5bb6333"
    }
};

async function loadJSON() {
    //Henter json og gemmer det som art
    const JSONData = await fetch(url, options);
    art = await JSONData.json();
    showArt();
}

function showArt() {
    console.log("showingArt");
    console.log(art);
    //Definerer konstanter til senere brug i kloningen af template
    const template = document.querySelector("template");
    const container = document.querySelector(".container")
    container.textContent = "";

    art.forEach(artwork => {
        if (filter == "Alle" || filter == artwork.materiale) {
            console.log("looping");
            //Kloner template og udfylder det med data fra de tilfældige objekter
            let clone = template.cloneNode(true).content;
            clone.querySelector("img").src = media + artwork.billede[0];
            clone.querySelector("img").alt = artwork.kort;
            clone.querySelector("h2").textContent = artwork.navn;
            clone.querySelector("h3").textContent = `Af ${artwork.kunstner}`;
            clone.querySelector("p").textContent = artwork.kort;
            clone.querySelector("article").addEventListener("click", () => showDetails(artwork));
            container.appendChild(clone);
        }
    })
}

function showDetails(artwork) {
    console.log("showDetails");
    location.href = `artwork.html?id=${artwork._id}`;
}
