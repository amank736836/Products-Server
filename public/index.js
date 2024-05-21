//////////////////////////////////////////////////////////////////////////

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

let div = null;

let i=0;
let j = 0;

let products = [];
let accounts = [];

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

async function login_check(){
    await get();
    if(user == null || user == ""){
        gotocart.remove();
        logout.remove();
    }else{
        login.remove();
        signup.remove();
        // console.log("dfskj");
        fetch_cart();
    }
    fetchFromLocalStorage();

}

login_check();

//////////////////////////////////////////////////////////////////////////

function fetch_cart(){
    if(user!=null && user!="" ){
        j = -1;
        let flag = true;
        while(flag){
            j++;
            if(accounts[j].user == user){
                flag = false;
            }
        }
    }
}


//////////////////////////////////////////////////////////////////////////

function fetchFromLocalStorage(){
    // console.log(products);
    if(products.length != 0){
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
            i++
            if(product_count == 5 || i == products.length){
                div.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
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

//////////////////////////////////////////////////////////////////////////
function AddtoUI(obj,div){
    
    
    let div1 = document.createElement('div');
    let img = document.createElement('img');
    img.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    
    
    
    div1.setAttribute("class", obj.id);
    div1.setAttribute("id", "div1");
    
    span1.innerHTML = "Name" + " -> " + obj.name;
    let hundreds = new Number(obj.price);
    hundreds = hundreds.toLocaleString("en-IN");
    span2.innerHTML = "Price" + " -> " + hundreds;
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
        accounts[j].cart.filter((item)=>{
            if(item != null && id == item.id && item.quantity != 0){
                flag = false;
                atc.innerHTML = " <b>Cart Quantity</b> "+`${item.quantity}`
            }
            return item;
        })
        if(flag){
            atc.innerHTML = "<b>Add to Cart<b>";
        }
        atc.addEventListener("click",(e)=>{
            Addtocart(e,atc);
        })
        div1.appendChild(atc);
    }
}

//////////////////////////////////////////////////////////////////////////

function Addtocart(e,atc) {
    let div = e.target.parentNode.parentNode;
    let quantity = e.target.parentNode.parentNode.childNodes[3].childNodes[1].innerText;
    let obj = {};
    let product_id = div.getAttribute("class");
    
    obj.id = product_id;
    obj.quantity = 1;
    
    var flag = true;
    accounts[j].cart = accounts[j].cart.filter((item)=>{
        if(item != null && item.id == product_id){
            flag = false;
            if(quantity != item.quantity){
                item.quantity = ++item.quantity;
                atc.innerHTML = " <b>Cart Quantity</b> "+`${item.quantity}`
            }
        }
        return item;
    })
    
    if(flag){
        accounts[j].cart.push(obj);
        atc.innerHTML = " <b>Cart Quantity</b> "+`1`
    }
    
    post();
}

//////////////////////////////////////////////////////////////////////////

// fetch data

async function get() {
    try {
        let response = await fetch('/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        data = await response.json();

        accounts = data.accounts;
        products = data.products;
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


async function post(){
    try{
        data.accounts = accounts;
        await fetch('/post',{
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

//redirects

function redirectToCart(){
    window.location.href = './cart.html';
}
function redirectToHome() {
    window.location.href = './index.html';
}
function redirectToLogin() {
    window.location.href = './login.html';
}
function redirectToSignup() {
    window.location.href = './signup.html';
}

//////////////////////////////////////////////////////////////////////////

