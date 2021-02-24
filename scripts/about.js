const artistButtons = document.querySelectorAll(".button_artist");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    //Tilføjer knap-funktionen til de 4 kunstnerknapper
    artistButtons.forEach(button => button.addEventListener("click", loadArtistPage)) //Her lægges en eventlisner på alle knapperne, og sender ved klik en ned i funktionen loadArtistPage.
});


//I funktionen loadArtistPage, sættes hver kunstners side op med alle ens samlede værker
function loadArtistPage() {
    console.log("loadArtistPage");

    //Henter navnet fra søskendeelementets h1 til både url og filter på den næste loadede side
    const artistName = this.parentElement.firstElementChild.firstElementChild.textContent.split(" ").join("_");
    console.log(artistName);


    // Når der klikkes på et enkelt kunstværk, føres du ind i et single-view
    //Anvender ovenstående konstant som id til kunstnersidens url
    location.href = `artist.html?id=${artistName}`;
}
