const artistButtons = document.querySelectorAll(".button_artist");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    artistButtons.forEach(button => button.addEventListener("click", loadArtistPage))
});

function loadArtistPage() {
    console.log("loadArtistPage");

    const artistName = this.parentElement.firstElementChild.firstElementChild.textContent.split(" ").join("_");
    console.log(artistName);

    location.href = `artist.html?id=${artistName}`;
}
