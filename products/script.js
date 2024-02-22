let admin = false;
function admin_check(){
    if(user!="aman") redirectToHome();
}

const message = sessionStorage.getItem("message");
const user = sessionStorage.getItem("login");

function redirectToHome() {
    window.location.href = '../home/home.html';
}
function redirectToProducts() {
    window.location.href = '../products/product.html';
}
function redirectToLogin() {
    window.location.href = '../login/login.html';
}

let products = [];
let product_counter = 1;

const div = document.querySelector("#products");
const name = document.querySelector("#name");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");

const form2 = document.querySelector("#form2");
const logout = document.querySelector("#logout");
const DeleteAll = document.querySelector("#DeleteAll");


// submit.addEventListener("click",(e)=>input(e))
name.addEventListener("keydown",(e)=>  input(e))
quantity.addEventListener("keydown",(e)=>  input(e))
price.addEventListener("keydown",(e)=> input(e))
window.addEventListener("keydown",(e)=> input(e))

logout.addEventListener("click",()=>{
    sessionStorage.setItem("message", "");
    sessionStorage.setItem("login","");
    redirectToHome();
});

DeleteAll.addEventListener("click",()=>{
    localStorage.setItem("products","[]");
    localStorage.setItem("product_counter",1);
    redirectToProducts();
})


   
function input(e){
    if( (e.keyCode==13) && (name.value.trim()=="" || quantity.value.trim()=="" || price.value.trim()=="")){
        // alert("Please enter values correctly");
   }else if(e.keyCode==13){
       AddTask();
   }
}

function fetchFromLocalStorage(){
    admin_check();
    if(localStorage.getItem("products")!='[]' && localStorage.getItem("products")){
        products = JSON.parse(localStorage.getItem("products"));
        product_counter = localStorage.getItem("product_counter");
        products.forEach((item) => AddtoUI(item))
    }else{
        form2.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
}

fetchFromLocalStorage();

function AddTask() {
    let obj = {};
    obj.name = name.value.trim();
    obj.quantity = quantity.value.trim();
    obj.price = price.value.trim();
    obj.id = product_counter;
    products.push(obj);
    storeToLocalStorage();
    if(products.length != 0){
        form2.removeAttribute("style");
    }
    AddtoUI(obj);
    product_counter++;
    localStorage.setItem('product_counter',product_counter);
}

function storeToLocalStorage(){
    localStorage.setItem("products",JSON.stringify(products));
}

function AddtoUI(obj){

    let div1 = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let replace = document.createElement("button");
    let del = document.createElement("button");

    div1.setAttribute("class", obj.id);
    div1.setAttribute("id", "div1");

    span1.innerText = obj.name;
    span2.innerText = obj.quantity;
    let hundreds = new Number(obj.price);
    hundreds = hundreds.toLocaleString("en-IN");
    span3.innerText = hundreds;


    replace.innerHTML = "<b>Replace<b>";
    replace.addEventListener('click',(e)=>{
        update_item(e);
    });
    
    del.innerHTML = "<b>Delete<b>";
    del.addEventListener('click',(e)=>{
        delete_item(e);
    })

    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);
    div1.appendChild(replace);
    div1.appendChild(del);
    div.appendChild(div1);
    
    clear();
}

function clear(){
    name.value = "";
    quantity.value = "";
    price.value = "";
}


function update_item(e){
    let parentdiv = e.target.parentNode;
    let taskid = parentdiv.getAttribute("class");

    let span1 = parentdiv.childNodes[0];
    let span2 = parentdiv.childNodes[1];
    let span3 = parentdiv.childNodes[2];
    span1.setAttribute("contenteditable", "true");
    span2.setAttribute("contenteditable", "true");
    span3.setAttribute("contenteditable", "true");

    products = products.filter((item)=>{
        if(item.id == taskid){
            item.name = span1.innerText;
            item.quantity = span2.innerText;
            item.price = span3.innerText;
        }
        return item;
    })
    storeToLocalStorage();
    clear();
}

function delete_item(e){
    let parentdiv = e.target.parentNode;
    let taskid = parentdiv.getAttribute("class");
    parentdiv.remove();
    products = products.filter((item)=>{
        if(item.id != taskid) return item;
    })
    storeToLocalStorage();
    if(products.length == 0){
        localStorage.setItem('product_counter',1);
        product_counter = 1;
        form2.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
}

    