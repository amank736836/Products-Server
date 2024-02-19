
let login = document.querySelector("#login");
let signup = document.querySelector("#signup");

login.addEventListener("click", ()=>{
    redirectToLogin();
})
signup.addEventListener("click", ()=>{
    redirectToSignup();
})

function redirectToLogin() {
    window.location.href = '../login/login.html';
}
function redirectToSignup() {
    window.location.href = '../signup/signup.html';
}
