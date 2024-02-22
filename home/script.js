let body = document.querySelector("body");

let login = document.querySelector("#login");
let signup = document.querySelector("#signup");

let gotocart  = document.querySelector("#cart");
let logout = document.querySelector("#logout");

let buttons = document.querySelector("#buttons");

let user = sessionStorage.getItem("login");

function login_check(){
    if(user == null || user == ""){
        gotocart.setAttribute("style", "visibility:hidden");
        logout.setAttribute("style", "visibility:hidden");
        login.setAttribute("style", "visibility:visible");
        signup.setAttribute("style", "visibility:visible");
    }else{
        login.setAttribute("style", "visibility:hidden");
        signup.setAttribute("style", "visibility:hidden");
        gotocart.setAttribute("style", "visibility:visible");
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
        let div = document.createElement("div");
        div.setAttribute("id", "products");

        let count = 0;
        for(var i=0; i<products.length; i++){
            if(count>2){
                count = 0;
                div = document.createElement("div");;
                div.setAttribute("id", "products");
            }
            AddtoUI(products[i],div);
            count++;   
            if(i==products.length-1){
                div.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
            }
        }

    }else{
        buttons.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
}
fetchFromLocalStorage();


function AddtoUI(obj,div){
    
   
    let div1 = document.createElement('div');
    let img = document.createElement('img');
    img.src = "https://faradayshielding.com.au/wp-content/uploads/2021/05/Image_039.jpg"
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');

     

    div1.setAttribute("class", obj.id);
    div1.setAttribute("id", "div1");

    span1.innerHTML = "Name" + " -> " + obj.name;
    span3.innerHTML = "Price" + " -> " + obj.price;
    span2.innerHTML = "MaxQuantity" + " -> " + `<b>${obj.quantity}</b>`;
    div1.appendChild(img);
    div1.appendChild(span1);
    div1.appendChild(span3);
    div1.appendChild(span2);

    if(user != '' && user != undefined && user != null ){
        let atc = document.createElement('button');
        atc.innerHTML = "<b>Add to Cart<b>";
        atc.addEventListener("click",(e)=>{
            Addtocart(e);
        })  
        div1.appendChild(atc);
    }
    
    div.appendChild(div1);
    body.appendChild(div);   
}

let cart = [];
function Addtocart(e) {

    let div = e.target.parentNode.parentNode;

    let quantity = e.target.parentNode.parentNode.childNodes[3].childNodes[1].innerText;

    let obj = {};
    let product_id = div.getAttribute("class");

    obj.id = product_id;
    obj.quantity = 1;

    var flag = true;
    cart = cart.filter((item)=>{
        if(item.id == product_id){
            flag = false;
            if(quantity != item.quantity){
                item.quantity = ++item.quantity;
            }
        }
        return item;
    })

    if(flag){
        cart.push(obj);
    }
    
    localStorage.setItem(user,JSON.stringify(cart));

    
}