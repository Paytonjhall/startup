let username = "admin";
let password = "admin";


function setUser(user) {
    username = user;
}


function login() {
    const user = document.querySelector("#username");
    const pass = document.querySelector("#password");
    localStorage.setItem("username", name.value);
    localStorage.setItem("password", pass.value);
    window.location.href = "index.html";
}