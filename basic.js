const username = localStorage.getItem("username");
const usernameh3 = document.getElementById("usernameh3")

function start() {
    document.title = username + " | ToDo";
    usernameh3.innerText = username;
}
start()

function profile() {
    const profilemenu = document.querySelector(".profilemenu");
    profilemenu.classList.toggle("profilemenu_visible")
}

function logout() {
    window.open("index.html", "_self");
    localStorage.removeItem("username");
}


function signin() {
    window.open("signin.html", "_self");

}
function signup() {
    window.open("signup.html", "_self");
}

function dropdown() {
    const dropdown = document.querySelector(".dropdown");
    const stroke1 = document.getElementById("stroke1");
    const stroke2 = document.getElementById("stroke2");
    const stroke3 = document.getElementById("stroke3");

    stroke1.classList.toggle("stroke1_animation")
    stroke2.classList.toggle("stroke2_animation")
    stroke3.classList.toggle("stroke3_animation")
    dropdown.classList.toggle("dropdown_visible")
}