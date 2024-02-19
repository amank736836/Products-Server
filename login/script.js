const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const user = document.querySelector("#user");
const pass = document.querySelector("#pass");
const buttons = document.querySelector("#buttons");

let message = sessionStorage.getItem("message");
let logged = sessionStorage.getItem("login");

function create_message(){
    let div = document.createElement("div");
    let label = document.createElement("label");
    label.innerText = message;
    div.appendChild(label);
    buttons.insertBefore(div,signup);
    sessionStorage.setItem("message",'');
}

function check_message(){
    if(logged != "" && logged != null){
        redirectToProducts();
    }
    if(message == "Approved"){
        redirectToProducts();
    }
    if(message != null && message != ""){
        create_message();
    }    
}

check_message();


function redirectToProducts() {
    window.location.href = '../products/product.html';
}



let Accounts = [];
let Accounts_Counter = 1;

login.addEventListener("click", (e)=>input(e))
signup.addEventListener("click", ()=>redirectToSignup())
window.addEventListener("keydown",(e)=>input(e))

function input(e){
 
    if( (e.keyCode==13 || e.target.id=="login") && (user.value=="")){
        alert("Please enter username");
    }
    else if( (e.keyCode==13 || e.target.id=="login") && (pass.value=="")){
        alert("Please enter password");
    }
    else if(e.keyCode==13 || e.target.id=="login"){
       login_account();
    }
}


function login_account(){
   
    fetchFromLocalStorage();
    if( Accounts.length == 0){
        alert("Please Sign Up");
    }else{
        Accounts = Accounts.filter((obj)=>{
            if(obj.user == user.value && obj.pass == pass.value){
                sessionStorage.setItem("login",user.value);
                sessionStorage.setItem("message",'Approved');
                return obj;
            }else if(obj.user == user.value && obj.password != pass.value){
                sessionStorage.setItem("message","wrong password");
                return obj;
            }
        })
        if(Accounts.length == 0){
            sessionStorage.setItem("message","No Account exist");
            redirectToSignup();
        }else if(Accounts[0].user == user.value && Accounts[0].pass == pass.value){
            redirectToProducts();
        }else
        redirectToLogin();
    }
}


function redirectToLogin() {
    window.location.href = '../login/login.html';
}
function redirectToSignup() {
    window.location.href = '../signup/signup.html';
}
function redirectToProducts() {
    window.location.href = '../products/product.html';
}


function fetchFromLocalStorage(){
    if(localStorage.getItem("accounts")!='[]' && localStorage.getItem("accounts")){
        Accounts = JSON.parse(localStorage.getItem("accounts"));
        Accounts_Counter = localStorage.getItem("accounts_counter");
    }
}

