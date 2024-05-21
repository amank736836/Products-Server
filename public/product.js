//////////////////////////////////////////////////////////////////////////

//variables

const message = sessionStorage.getItem("message");
const user = sessionStorage.getItem("login");


const div = document.querySelector("#products");
const name = document.querySelector("#name");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");

const form2 = document.querySelector("#form2");
const logout = document.querySelector("#logout");
const DeleteAll = document.querySelector("#DeleteAll");

let products = [];
let products_counter = 1;

//////////////////////////////////////////////////////////////////////////

//event listeners

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
    products = [];
    products_counter = 1;
    post();
    redirectToProducts();
})

//////////////////////////////////////////////////////////////////////////
async function admin_check(){
    if(user!="aman") redirectToHome();
    await get();
    fetchFromLocalStorage();
}
admin_check();
//////////////////////////////////////////////////////////////////////////
function fetchFromLocalStorage(){
    if(products.length != 0){
        products.forEach((item) => AddtoUI(item))
    }else{
        form2.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
    }
}
//////////////////////////////////////////////////////////////////////////
function input(e){
    if( (e.keyCode==13) && (name.value.trim()=="" || quantity.value.trim()=="" || price.value.trim()=="")){
        // alert("Please enter values correctly");
    }else if(e.keyCode==13){
        AddTask();
    }
}
//////////////////////////////////////////////////////////////////////////
function AddTask() {
    let obj = {};
    obj.name = name.value.trim();
    obj.quantity = quantity.value.trim();
    obj.price = price.value.trim();
    obj.id = products_counter;
    products.push(obj);
    if(products.length != 0){
        form2.removeAttribute("style");
    }
    AddtoUI(obj);
    products_counter++;
    post();
}
//////////////////////////////////////////////////////////////////////////
function AddtoUI(obj){
    let div1 = document.createElement('div');
    let img = document.createElement('img');
    img.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let div2 = document.createElement('div');
    let replace = document.createElement("button");
    let del = document.createElement("button");
    div1.setAttribute("class", obj.id);
    div1.setAttribute("id", "div1");
    span1.innerHTML = obj.name;
    let hundreds = new Number(obj.price);
    hundreds = hundreds.toLocaleString("en-IN");
    span2.innerHTML = hundreds;
    span3.innerHTML =`<b>${obj.quantity}</b>`;
    replace.innerHTML = "<b>Replace<b>";
    replace.addEventListener('click',(e)=>{
        update_item(e);
    });

    del.innerHTML = "<b>Delete<b>";
    del.addEventListener('click',(e)=>{
        delete_item(e);
    })
    div1.appendChild(img);
    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);
    div2.appendChild(replace);
    div2.appendChild(del);
    div1.appendChild(div2);
    let firstChild = div.firstChild;
    div.insertBefore(div1,firstChild);
    clear();
}
//////////////////////////////////////////////////////////////////////////
function clear(){
    name.value = "";
    quantity.value = "";
    price.value = "";
}
//////////////////////////////////////////////////////////////////////////

function update_item(e){
    let parentdiv = e.target.parentNode.parentNode.parentNode;
    let taskid = parentdiv.getAttribute("class");
    
    let span1 = parentdiv.childNodes[1];
    let span2 = parentdiv.childNodes[2];
    let span3 = parentdiv.childNodes[3];
    span1.setAttribute("contenteditable", "true");
    span2.setAttribute("contenteditable", "true");
    span3.setAttribute("contenteditable", "true");
    
    products = products.filter((item)=>{
        if(item.id == taskid){
            item.name = span1.innerText;
            item.price = span2.innerText;
            item.quantity = span3.innerText;
        }
        return item;
    })
    post();
    clear();
}

//////////////////////////////////////////////////////////////////////////

function delete_item(e){
    let parentdiv = e.target.parentNode.parentNode.parentNode;
    let taskid = parentdiv.getAttribute("class");
    parentdiv.remove();
    products = products.filter((item)=>{
        if(item.id != taskid) return item;
    })
    if(products.length == 0){
        products_counter = 1;
        form2.setAttribute("style", "border-radius: 0cm 0cm 1cm 1cm;");
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
        data = await response.json();
        console.log(data);
        products = data.products;
        if(products_counter != null){
            products_counter = data.products_counter;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


async function post(){
    try{
        data.products = products;
        data.products_counter = products_counter;
        console.log(data);
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

//redirects

function redirectToHome() {
    window.location.href = './index.html';
}
function redirectToProducts() {
    window.location.href = './product.html';
}
function redirectToLogin() {
    window.location.href = './login.html';
}

//////////////////////////////////////////////////////////////////////////