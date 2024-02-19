const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const user = document.querySelector("#user");
const pass = document.querySelector("#pass");

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

function redirectToLogin() {
    window.location.href = '../login/login.html';
}


let Accounts = [];
let Accounts_Counter = 1;

login.addEventListener("click", (e)=> redirectToLogin())
window.addEventListener("keydown",(e)=>input(e))
signup.addEventListener("click", (e)=>input(e))

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
    
    let check = Accounts.filter((obj)=>{
        if(obj.user == user.value){
            sessionStorage.setItem("message","Account exist");
            return obj;
        }
    })

    if(check.length == 0){
        Accounts.push(obj);
        storeToLocalStorage();
        Accounts_Counter++;
        localStorage.setItem("accounts_counter",Accounts_Counter);
        sessionStorage.setItem("message","Account created successfully");
        redirectToLogin();
    }
    redirectToLogin();
}


function fetchFromLocalStorage(){
    if(localStorage.getItem("accounts")!='[]' && localStorage.getItem("accounts")){
        Accounts = JSON.parse(localStorage.getItem("accounts"));
        Accounts_Counter = localStorage.getItem("accounts_counter");
    }
}
