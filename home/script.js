
let login = document.querySelector("#login");
let signup = document.querySelector("#signup");

let buttons = document.querySelector("#buttons");

const div = document.querySelector("#products");


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

    div1.setAttribute("id", "div1");

    span1.innerText = obj.name;
    span2.innerText = obj.desc;
    span3.innerText = obj.price;

    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);
    div.appendChild(div1);
    
}