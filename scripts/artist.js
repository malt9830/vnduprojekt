const artistButtons = document.querySelectorAll(".button_artist");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    artistButtons.forEach(button => button.addEventListener("click", loadArtistPage))
});

function loadArtistPage() {
    console.log("loadArtistPage");
}
