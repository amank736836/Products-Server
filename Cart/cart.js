//////////////////////////////////////////////////////////////////////////

//variables 

let body = document.querySelector("body");

let home = document.querySelector("#home");
let deliver = document.querySelector("#deliver");

let logout = document.querySelector("#logout");

let buttons = document.querySelector("#buttons");
let welcome = document.querySelector("#welcome");

let user = sessionStorage.getItem("login");
let accounts = JSON.parse(localStorage.getItem("accounts"));

let user_products = [];

let products = [];
let i=0;
let div = null;

let j = 0;

let total = 0;
//////////////////////////////////////////////////////////////////////////

//event listeners

home.addEventListener("click",(e)=>{
    redirectToHome();
});

logout.addEventListener("click",()=>{
    sessionStorage.setItem("message", "");
    sessionStorage.setItem("login", "");
    redirectToHome();
});

deliver.addEventListener("click",()=>{
    redirectToDeliver()
});

//////////////////////////////////////////////////////////////////////////

function fetch_cart(){
    if(user!=null && user!="" ){
        j = -1;
        accounts = JSON.parse(localStorage.getItem("accounts"));
        let flag = true;
        while(flag){
            j++;
            if(accounts[j].user == user){
                flag = false;
            }
        }
    }
}

fetch_cart();

//////////////////////////////////////////////////////////////////////////

function fetchFromLocalStorage(){
    if( accounts[j].cart !='[]' && accounts[j].cart.length != 0){
        user_products = accounts[j].cart;
        while(i<user_products.length){

            if(div != null){
                div.removeAttribute("style");
            }
    
            div = document.createElement("div");
            div.setAttribute("id", "products");
    
            fetch(user_products[i],div,i);
            i++
            if(i == user_products.length){
                div.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
            }
        }

        let span4 = document.createElement('span');
        span4.innerText = "Ruppes " + total;
        welcome.appendChild(span4); 

    }else{
        buttons.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
}

fetchFromLocalStorage();

//////////////////////////////////////////////////////////////////////////

function fetch(product,div,k){
    if(localStorage.getItem("products")!='[]' && localStorage.getItem("products")){
        products = JSON.parse(localStorage.getItem("products"));
        let obj = products.filter((item)=>{
            if(item.id==product.id){
                return item;

            }
        })

        if(obj.length!=0){
            AddtoUI(obj[0],product,div,k);
        }
    }else{
        buttons.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
}

//////////////////////////////////////////////////////////////////////////
function AddtoUI(obj,product,div,k){
    
    
    let main_div = document.createElement('div');
    main_div.setAttribute("class", obj.id);
    main_div.setAttribute("id", "div1");

    let div_img = document.createElement('div');
    let img = document.createElement('img');
    img.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    div_img.appendChild(img);
    main_div.appendChild(div_img);
    
    let div_details = document.createElement('div');
    div_details.setAttribute("id", "details");
    
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    
    span1.innerHTML = "Name" + " -> " + obj.name;
    let hundreds = new Number(obj.price);
    hundreds = hundreds.toLocaleString("en-IN");
    span2.innerHTML = "Price" + " -> " + hundreds;
    span3.innerHTML = "MaxQuantity" + " -> " + `<b>${obj.quantity}</b>`;
    
    div_details.appendChild(span1);
    div_details.appendChild(span2);
    div_details.appendChild(span3);
    
    main_div.appendChild(div_details);

    let div_final = document.createElement('div');
    div_final.setAttribute("id", "final");
    
    let div_buttons = document.createElement('div');
    
    total += product.quantity * obj.price;

    let incre = document.createElement('button');
    incre.innerHTML = "Incre";
    incre.addEventListener("click",(e)=>{
        increment(e,k,obj.quantity);
    })

    let span = document.createElement('span');
    span.innerHTML = " Qty -> " + `<b>${product.quantity}</b>`;
    
    let decre = document.createElement('button');
    decre.innerHTML = "Decre";
    decre.addEventListener("click",(e)=>{
        decrement(e,k);
    })
    
    div_buttons.appendChild(incre);
    div_buttons.appendChild(span);
    div_buttons.appendChild(decre);
    
    div_final.appendChild(div_buttons);
    
    let delete_btn = document.createElement('button');
    delete_btn.innerHTML = "delete";
    delete_btn.addEventListener("click",(e)=>{
        delete_button(e,k);
    });
    div_final.appendChild(delete_btn);

    main_div.appendChild(div_final);

    div.appendChild(main_div);
    body.appendChild(div);

  

    
}

//////////////////////////////////////////////////////////////////////////

function increment(e,k,quantity){

    if(quantity != accounts[j].cart[k].quantity){
        accounts[j].cart[k].quantity = ++accounts[j].cart[k].quantity;
        storeToLocalStorage();
    }
    quantity = e.target.parentNode.childNodes[1].childNodes[1];
    quantity.innerText = accounts[j].cart[k].quantity;
}

function decrement(e,k){
    accounts[j].cart[k].quantity = --accounts[j].cart[k].quantity;
    if(accounts[j].cart[k].quantity <=0){
        delete_button(e,k);
    }
    quantity = e.target.parentNode.childNodes[1].childNodes[1];
    quantity.innerText = accounts[j].cart[k].quantity;
    storeToLocalStorage();
}

//////////////////////////////////////////////////////////////////////////

function delete_button(e,k){
    console.log(e);
    let last_Index = accounts[j].cart.length-1;
    let local_cart = accounts[j].cart;
    if(k != last_Index){
        let temp = local_cart[k];
        local_cart[k] = local_cart[last_Index];
        local_cart[last_Index] = local_cart[k];
    }
    total = total - (local_cart[last_Index].quantity * 1 );
    
    local_cart.pop();
    let div = e.target.parentNode.parentNode;
    div.remove();

    if(local_cart.length == 0){
        buttons.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
    storeToLocalStorage();
}

//////////////////////////////////////////////////////////////////////////

function storeToLocalStorage(){
    localStorage.setItem("accounts",JSON.stringify(accounts));
}

//////////////////////////////////////////////////////////////////////////

//redirects

function redirectToDeliver(){
    window.location.href = '../Cart/deliver.html';
}
function redirectToHome() {
    window.location.href = '../home/index.html';
}

//////////////////////////////////////////////////////////////////////////