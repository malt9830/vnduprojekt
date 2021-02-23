const artistButtons = document.querySelectorAll(".button_artist");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    //Tilføjer knap-funktionen til de 4 kunsterknapper
    artistButtons.forEach(button => button.addEventListener("click", loadArtistPage))
});

function loadArtistPage() {
    console.log("loadArtistPage");

    //Henter navnet fra søskendeelementets h1 til både url og filter på den næste loadede side
    const artistName = this.parentElement.firstElementChild.firstElementChild.textContent.split(" ").join("_");
    console.log(artistName);

    //Anvender ovenstående konstant som id til kunstnersidens url
    location.href = `artist.html?id=${artistName}`;
}
