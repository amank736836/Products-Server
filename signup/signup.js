
//////////////////////////////////////////////////////////////////////////

//variables

const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const user = document.querySelector("#user");
const pass = document.querySelector("#pass");

let message = sessionStorage.getItem("message");
let logged = sessionStorage.getItem("login");

let messageTag = document.createElement("label");

let Accounts = [];
let Accounts_Counter = 1;

//////////////////////////////////////////////////////////////////////////

//event listeners

login.addEventListener("click", (e)=> redirectToLogin())
window.addEventListener("keydown",(e)=>input(e))
signup.addEventListener("click", (e)=>input(e))

//////////////////////////////////////////////////////////////////////////

function check_message(){
    if(logged != "" && logged != null){
        redirectToProducts();
    }
    else if(message == "Approved"){
        redirectToProducts();
    }
    else if(message != null){
        create_message();
    }    
}

check_message();

//////////////////////////////////////////////////////////////////////////

function create_message(){
    let div = document.createElement("div");
    messageTag.innerText = message;
    div.appendChild(messageTag);
    buttons.insertBefore(div,signup);
    sessionStorage.setItem("message",'');
}

//////////////////////////////////////////////////////////////////////////

function input(e){
    
    if( (e.keyCode==13 || e.target.id=="signup") && (user.value.trim()=="")){
        messageTag.innerText = "Please enter username";
    }
    else if( (e.keyCode==13 || e.target.id=="signup") && (pass.value.trim()=="")){
        messageTag.innerText = "Please enter password";
    }
    else if(e.keyCode==13 || e.target.id=="signup"){
        signup_account();
    }
}

//////////////////////////////////////////////////////////////////////////

function signup_account(){
    
    
    fetchFromLocalStorage();
    
    obj = {};
    obj.user = user.value.trim();
    obj.pass = pass.value.trim();
    obj.id = Accounts_Counter;
    obj.cart = [];
    
    
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

//////////////////////////////////////////////////////////////////////////

function fetchFromLocalStorage(){
    if(localStorage.getItem("accounts")!='[]' && localStorage.getItem("accounts")){
        Accounts = JSON.parse(localStorage.getItem("accounts"));
        Accounts_Counter = localStorage.getItem("accounts_counter");
    }else{
        localStorage.setItem('accounts_counter',1);
        Accounts_Counter = 1;
    }
}

//////////////////////////////////////////////////////////////////////////

function storeToLocalStorage(){
    localStorage.setItem("accounts",JSON.stringify(Accounts));
}

//////////////////////////////////////////////////////////////////////////

function redirectToProducts() {
    window.location.href = '../products/product.html';
}

function redirectToLogin() {
    window.location.href = '../login/login.html';
}
