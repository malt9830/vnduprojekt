//Med et klik på menuknappen kaldes funktionen toggleMenu
document.querySelector("#menuknap").addEventListener("click", toggleMenu);


// Her i funktioen bliver css classerne hidden samt slide togglet, så menuens indholde bliver synlig.
function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#oversigt").classList.toggle("hidden");
    document.querySelector("#oversigt").classList.toggle("slide");
    myFunction(this);

    // this henvender sig til menuknappen. Så når man killer på menuknappen, kalder den både togglemenu og myFuncking. Har skrvet nyfincken (this) her for at den så også går med og kalder funktionen nedenunder
}


// Her i funktionen ændres brugernemuens tre streger til et kryds
function myFunction(x) {
    x.classList.toggle("change");
}
