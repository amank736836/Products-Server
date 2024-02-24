
//variables 

let body = document.querySelector("body");

let login = document.querySelector("#login");
let signup = document.querySelector("#signup");

let gotocart  = document.querySelector("#cart");
let logout = document.querySelector("#logout");

let buttons = document.querySelector("#buttons");

let load_div = document.querySelector("#load_div");
let load_more = document.querySelector("#load");

let user = sessionStorage.getItem("login");
let cart = [];
//////////////////////////////////////////////////////////////////////////

function login_check(){
    if(user == null || user == ""){
        gotocart.remove();
        logout.remove();
    }else{
        login.remove();
        signup.remove();
    }
}

login_check();

//////////////////////////////////////////////////////////////////////////

let products = [];
let i=0;
let div = null;
function fetchFromLocalStorage(){
    if(localStorage.getItem("products")!='[]' && localStorage.getItem("products")){
        products = JSON.parse(localStorage.getItem("products"));
        if(i<products.length){

            if(div != null){
                div.removeAttribute("style");
            }
    
            div = document.createElement("div");
            div.setAttribute("id", "products");
    
            let div_count = 0;
            let product_count = 0;
    
            while(i<products.length && product_count<6){
                if(div_count>2){
                    div_count = 0;
                    div = document.createElement("div");;
                    div.setAttribute("id", "products");
                }
                AddtoUI(products[i],div);
                product_count++;
                div_count++;   
                if(product_count == 5 || i == products.length){
                    div.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
                }
                i++
            }
            
        }
        
        if(i==products.length){
            load_more.setAttribute("hidden", "");
        }

    }else{
        buttons.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
        load_more.setAttribute("hidden","");
    }
}

fetchFromLocalStorage();

//////////////////////////////////////////////////////////////////////////

function fetch_cart(){
    let local_cart = JSON.parse(localStorage.getItem(user));
    if(local_cart != null && local_cart.length!=0){
        cart = local_cart;
    }
}

fetch_cart();

//////////////////////////////////////////////////////////////////////////
function AddtoUI(obj,div){
    
    
    let div1 = document.createElement('div');
    let img = document.createElement('img');
    img.src = "https://picsum.photos/250"
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    
    
    
    div1.setAttribute("class", obj.id);
    div1.setAttribute("id", "div1");
    
    span1.innerHTML = "Name" + " -> " + obj.name;
    span2.innerHTML = "Price" + " -> " + obj.price;
    span3.innerHTML = "MaxQuantity" + " -> " + `<b>${obj.quantity}</b>`;
    div1.appendChild(img);
    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);

    Addtocart_button(div1,obj.id);
    
    div.appendChild(div1);
    body.insertBefore(div,load_div);
    
}

//////////////////////////////////////////////////////////////////////////

function Addtocart_button(div1,id){
    if(user != "" && user != undefined && user != null ){
        let atc = document.createElement('button');
        let flag = true;
        cart.filter((item)=>{
            if(id == item.id){
                flag = false;
            }
            return item;
        })
        
        if(flag){
            atc.innerHTML = "<b>Add to Cart<b>";
        }else{
            atc.innerHTML = `<b>Add More</b>` + `${cart.quantity}`
        }
        
        atc.addEventListener("click",(e)=>{
            Addtocart(e);
        })  
        div1.appendChild(atc);
    }
}

//////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////

//redirects

function redirectToCart(){
    window.location.href = '../Cart/cart.html';
}
function redirectToHome() {
    window.location.href = '../home/home.html';
}
function redirectToLogin() {
    window.location.href = '../login/login.html';
}
function redirectToSignup() {
    window.location.href = '../signup/signup.html';
}


//////////////////////////////////////////////////////////////////////////

//event listeners

gotocart.addEventListener("click",(e)=>{
    redirectToCart();
});

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

load_more.addEventListener("click",()=>{
    fetchFromLocalStorage()
});

//////////////////////////////////////////////////////////////////////////