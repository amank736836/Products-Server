
const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const user = document.querySelector("#user");
const pass = document.querySelector("#pass");

let Accounts = [];
let Accounts_Counter = 1;

login.addEventListener("click", (e)=>input(e))
window.addEventListener("keydown",(e)=>input(e))

document.addEventListener("DOMContentLoaded", function() {
    let messages = sessionStorage.getItem("messages");
    if(messages != null && messages != ""){
        alert(messages);
    }
  });

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

signup.addEventListener("click", ()=>{
    redirectToSignup();
})

function login_account(){
   
    fetchFromLocalStorage();
    if( Accounts.length == 0){
        alert("Please Sign Up");
    }else{
        Accounts.filter((obj)=>{
            if(obj.user == user.value && obj.pass == password){
                sessionStorage.setItem("login" , JSON.stringify(obj));
                redirectToProducts();
                return obj;
            }else if(obj.user == user.value && obj.password != password){
                sessionStorage.setItem("message","wrong password");
                return obj;
            }
        })
        if(Accounts.length == 0){
            sessionStorage.setItem("message","No Account exist");
        }
        redirectToLogin();
    }
}


function redirectToLogin() {
    window.location.href = '../login/login.html';
    sessionStorage.setItem("message", "");
}
function redirectToSignup() {
    window.location.href = '../signup/signup.html';
    sessionStorage.setItem("message", "");
}
function redirectToProducts() {
    window.location.href = '../products/products.html';
    sessionStorage.setItem("message", "");
}


function fetchFromLocalStorage(){
    if(localStorage.getItem("accounts")!='[]' && localStorage.getItem("accounts")){
        Accounts = JSON.parse(localStorage.getItem("accounts"));
        Accounts_Counter = localStorage.getItem("accounts_counter");
    }
}

