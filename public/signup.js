
//////////////////////////////////////////////////////////////////////////

//variables

const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const user = document.querySelector("#user");
const pass = document.querySelector("#pass");

let message = sessionStorage.getItem("message");
let logged = sessionStorage.getItem("login");

let messageTag = document.createElement("label");

let data = {};
let accounts = [];
let accounts_id = 1;

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
    obj = {};
    obj.user = user.value.trim();
    obj.pass = pass.value.trim();
    obj.id = accounts_id;
    obj.cart = [];

    console.log(accounts);
    let check = accounts.filter((obj)=>{
        if(obj.user == user.value){
            sessionStorage.setItem("message","Account exist");
            return obj;
        }
    })
    if(check.length == 0){
        accounts.push(obj);
        sessionStorage.setItem("message","Account created successfully");
        accounts_id++;
    }
    console.log(accounts);
    post();
    redirectToLogin();
}
//////////////////////////////////////////////////////////////////////////

async function storeToLocalStorage(){
    await post();
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
        // console.log("response");
        console.log(data);
        accounts = data.accounts;
        if(data.accounts_id != null){
            accounts_id = data.accounts_id;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function post(){
    try{
        data.accounts = accounts;
        data.accounts_id = accounts_id;
        // console.log(data);
        let response = await fetch('/post',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    catch(error){
        console.log(error);
    }
}
//////////////////////////////////////////////////////////////////////////
function redirectToProducts() {
    window.location.href = './product.html';
}
function redirectToLogin() {
    window.location.href = './login.html';
}