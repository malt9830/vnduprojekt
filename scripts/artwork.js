//Henter ID'et fra url til brug af fetch af det specifikke objekt
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//Definerer konstanter og variable til senere i brug gennem fetch af json
let artwork;

const url = "https://vnduprojekt-ec80.restdb.io/rest/vndu";
const media = "https://vnduprojekt-ec80.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "602e74535ad3610fb5bb6333"
    }
};

console.log("ID", id);
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    loadJSON();
    loadOtherJSON();
});



// Her hentes json ind fra restdb, og sendes vider til funktionen showArt
async function loadJSON() {
    //Henter json og gemmer det som artwork
    const JSONData = await fetch(`https://vnduprojekt-ec80.restdb.io/rest/vndu/${id}`, options);
    artwork = await JSONData.json();

    console.log("artwork", artwork);
    showArtwork(artwork);
}




// I funktionen showArt, sættes indhodet ind for det specefikke kunstværk ind i HTML
function showArtwork(artwork) {
    console.log("showingArtwork");

    //Udfylder singleviewet med data fra det specifikke objekt
    document.querySelector("#art_img").src = media + artwork.billede[0];
    document.querySelector("#art_img").alt = artwork.kort;
    document.querySelector("#art_name").textContent = artwork.navn;
    document.querySelector("#art_ist").textContent = `Af ${artwork.kunstner}`;
    document.querySelector("#art_media").textContent = artwork.materiale;
    document.querySelector("#art_year").textContent = artwork.årstal;
    document.querySelector("#art_desc").textContent = artwork.lang;
    document.title = `${artwork.navn}`;
}



async function loadOtherJSON() {
    const otherJSON = await fetch(url, options);
    otherArt = await otherJSON.json();

    console.log(otherArt);
    showOther();
}


//Her i funktioen genereres tre til fire tilfeldeig andre kunstværker og sættes ind i HTML
function showOther() {
    console.log("showingOther");

    //Genererer et nyt array af tilfældige objekter fra det komplette array
    const other1 = otherArt[Math.floor(Math.random() * otherArt.length)];
    const other2 = otherArt[Math.floor(Math.random() * otherArt.length)];
    const other3 = otherArt[Math.floor(Math.random() * otherArt.length)];
    const other4 = otherArt[Math.floor(Math.random() * otherArt.length)];
    const randomArt = [other1, other2, other3, other4];
    console.log(randomArt);

    randomArt.forEach(rngArt => {
        //Definerer konstanter til senere brug i kloningen af template
        const template = document.querySelector("template");
        const container = document.querySelector(".container");


        let clone = template.cloneNode(true).content; //Her klones template og udfyldes med data fra de tilfældige objekter

        clone.querySelector("img").src = media + rngArt.billede[0];
        clone.querySelector("img").alt = rngArt.kort;
        clone.querySelector("h2").textContent = rngArt.navn;
        clone.querySelector("h3").textContent = `Af ${rngArt.kunstner}`;
        clone.querySelector("p").textContent = rngArt.kort;
        clone.querySelector("article").addEventListener("click", () => showDetails(rngArt));
        container.appendChild(clone); //kolene tilføres til DOM
    })

}

// Når der klikkes på et enkelt kunstværk, føres du ind i et single-view
function showDetails(rngArt) {
    console.log("showingDetails");
    location.href = `artwork.html?id=${rngArt._id}`;
}
