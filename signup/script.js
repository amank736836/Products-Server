
const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const user = document.querySelector("#user");
const pass = document.querySelector("#pass");

let Accounts = [];
let Accounts_Counter = 1;

login.addEventListener("click", (e)=> redirectToLogin())
window.addEventListener("keydown",(e)=>input(e))
signup.addEventListener("click", (e)=>input(e))

document.addEventListener("DOMContentLoaded", function() {
    let message = sessionStorage.getItem("message");
    if(message != null && message != ""){
        alert(message);
    }
  });

function input(e){
 
    if( (e.keyCode==13 || e.target.id=="signup") && (user.value=="")){
        alert("Please enter username");
    }
    else if( (e.keyCode==13 || e.target.id=="signup") && (pass.value=="")){
        alert("Please enter password");
    }
    else if(e.keyCode==13 || e.target.id=="signup"){
       signup_account();
    }
}

function storeToLocalStorage(){
    localStorage.setItem("accounts",JSON.stringify(Accounts));
}

function signup_account(){
   
    obj = {};
    obj.user = user.value;
    obj.pass = pass.value;
    obj.id = Accounts_Counter;

    fetchFromLocalStorage();

    if( Accounts.length == 0){
        Accounts.push(obj);
        Accounts_Counter++;
        localStorage.setItem("accounts_counter",Accounts_Counter);
        sessionStorage.setItem("message","Account created successfully");
        storeToLocalStorage();
    }else{
        Accounts = Accounts.filter((obj)=>{
            if(obj.user == user.value){
                sessionStorage.setItem("message","Account exist");
                return obj;
            }
        })

        if(Accounts.length == 0){
            Accounts = localStorage.getItem("accounts");
            // console.log(Accounts);
            Accounts.push(obj);
            storeToLocalStorage();
            sessionStorage.setItem("message","Account created successfully");
            //redirectToLogin();
        }
        // redirectToSignup();
    }
}

function fetchFromLocalStorage(){
    if(localStorage.getItem("accounts")!='[]' && localStorage.getItem("accounts")){
        Accounts = JSON.parse(localStorage.getItem("accounts"));
        Accounts_Counter = localStorage.getItem("accounts_counter");
    }
}

function redirectToLogin() {
    window.location.href = '../login/login.html';
}
function redirectToSignup() {
    window.location.href = '../signup/signup.html';
}
function redirectToProducts() {
    window.location.href = '../products/products.html';
}



