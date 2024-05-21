//////////////////////////////////////////////////////////////////////////

//variables

const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const user = document.querySelector("#user");
const pass = document.querySelector("#pass");
const buttons = document.querySelector("#buttons");

let label = document.createElement("label");

let message = sessionStorage.getItem("message");
let logged = sessionStorage.getItem("login");

let data = {};
let accounts = [];
let account_id = 1;

//////////////////////////////////////////////////////////////////////////

//event listeners

login.addEventListener("click", (e)=>input(e))
signup.addEventListener("click", ()=>redirectToSignup())
window.addEventListener("keydown",(e)=>input(e))

//////////////////////////////////////////////////////////////////////////
function create_message(){
    let div = document.createElement("div");
    label.innerText = message;
    div.appendChild(label);
    buttons.insertBefore(div,signup);
    sessionStorage.setItem("message",'');
}

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

function input(e){
    
    if( (e.keyCode==13 || e.target.id=="login") && (user.value=="")){
        label.innerText = "Please enter username";
    }
    else if( (e.keyCode==13 || e.target.id=="login") && (pass.value=="")){
        label.innerText = "Please enter password";
    }
    else if(e.keyCode==13 || e.target.id=="login"){
        login_account();
    }
}


function login_account(){

    if( accounts.length == 0){
        sessionStorage.setItem("message","Please Sign Up");
        redirectToSignup();
    }else{
        accounts = accounts.filter((obj)=>{
            if(obj.user == user.value && obj.pass == pass.value){
                sessionStorage.setItem("login",user.value);
                sessionStorage.setItem("message",'Approved');
                return obj;
            }else if(obj.user == user.value && obj.password != pass.value){
                sessionStorage.setItem("message","wrong password");
                return obj;
            }
        })
        if(accounts.length == 0){
            sessionStorage.setItem("message","No Account exist");
            redirectToSignup();
        }else if(accounts[0].user == user.value && accounts[0].pass == pass.value){
            redirectToProducts();
        }else
        redirectToLogin();
    }
}

//////////////////////////////////////////////////////////////////////////

// fetch data

get();
async function get() {
    try {
        let response = await fetch('/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        data = await response.json();
        accounts = data.accounts;
        accounts_id = data.accounts_id;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//////////////////////////////////////////////////////////////////////////

function redirectToProducts() {
    window.location.href = './product.html';
}
function redirectToLogin() {
    window.location.href = './login.html';
}
function redirectToSignup() {
window.location.href = './signup.html';
}
function redirectToProducts() {
    window.location.href = './product.html';
}