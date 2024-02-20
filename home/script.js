
let login = document.querySelector("#login");
let signup = document.querySelector("#signup");
let cart  = document.querySelector("#cart");
let logout = document.querySelector("#logout");
let buttons = document.querySelector("#buttons");

const div = document.querySelector("#products");

function login_check(){
    let user = sessionStorage.getItem("login");
    console.log(user);
    if(user == null || user == ""){
        cart.setAttribute("style", "visibility:hidden");
        logout.setAttribute("style", "visibility:hidden");
        login.setAttribute("style", "visibility:visible");
        signup.setAttribute("style", "visibility:visible");
    }else{
        login.setAttribute("style", "visibility:hidden");
        signup.setAttribute("style", "visibility:hidden");
        cart.setAttribute("style", "visibility:visible");
        logout.setAttribute("style", "visibility:visible");
    }
}
login_check();

function redirectToHome() {
    window.location.href = '../home/home.html';
}

logout.addEventListener("click",()=>{
    sessionStorage.setItem("message", "");
    sessionStorage.setItem("login", "");
    redirectToHome();
});

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

let products = [];

function fetchFromLocalStorage(){
    if(localStorage.getItem("products")!='[]' && localStorage.getItem("products")){
        products = JSON.parse(localStorage.getItem("products"));
        products.forEach((item) => AddtoUI(item))
    }else{
        buttons.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
}
fetchFromLocalStorage();


function AddtoUI(obj){

    let div1 = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');

    div1.setAttribute("class", obj.id);
    div1.setAttribute("id", "div1");

    span1.innerText = obj.name;
    span2.innerText = obj.desc;
    span3.innerText = obj.price;

    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);
    div.appendChild(div1);
    
}