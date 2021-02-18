document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    loadJSON();
})

let art;

const url = "";
const media = "";
const options = {
    headers: {
        'x-apikey': ""
    }
};

async function loadJSON() {
    const JSONData = await fetch(url, options);
    art = await JSONData.json();
    showArt();
}

function showArt() {
    console.log(art);
}
