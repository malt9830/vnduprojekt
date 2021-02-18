document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    loadJSON();
})

let art;

const url = "https://vnduprojekt-ec80.restdb.io/rest/vndu";
const media = "https://vnduprojekt-ec80.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "602e74535ad3610fb5bb6333"
    }
};

async function loadJSON() {
    const JSONData = await fetch(url, options);
    art = await JSONData.json();
    showArt();
}

function showArt() {
    console.log("showingArt");
    console.log(art);
    const template = document.querySelector("template");
    const container = document.querySelector(".container")

    art.forEach(artwork => {
        let clone = template.cloneNode(true).content;
        clone.querySelector("img").src = media + artwork.billede[0];
        clone.querySelector("img").alt = artwork.kort;
        clone.querySelector("article").addEventListener("click", () => showDetails(artwork));
        container.appendChild(clone);
    })
}

function showDetails(artwork) {
    console.log("showDetails");
    location.href = `artwork.html?id=${artwork._id}`;
}
