let products = [];
let product_counter = 1;

const div = document.querySelector("#products");
const name = document.querySelector("#name");
const desc = document.querySelector("#desc");
const price = document.querySelector("#price");
const submit = document.querySelector("#submit");

submit.addEventListener("click",(e)=>input(e))
name.addEventListener("keydown",(e)=>  input(e))
desc.addEventListener("keydown",(e)=>  input(e))
price.addEventListener("keydown",(e)=> input(e))

function input(e){
    if( (e.keyCode==13 || e.target.id=="submit") && (name.value=="" || desc.value=="" || price.value=="")){
        alert("Please enter values");
   }else if(e.keyCode==13 || e.target.id=="submit"){
       AddTask();
   }
}

function fetchFromLocalStorage(){
    if(localStorage.getItem("products")!='[]' && localStorage.getItem("products")!=null){
        products = JSON.parse(localStorage.getItem("products"));
        product_counter = localStorage.getItem("product_counter");
        products.forEach((item) => AddtoUI(item))
    }else{
        products = [];
        product_counter = 1;
        localStorage.setItem('product_counter',1);
    }
}

fetchFromLocalStorage();

function AddTask() {
    let obj = {};
    obj.name = name.value;
    obj.desc = desc.value;
    obj.price = price.value;
    obj.id = product_counter;
    products.push(obj);
    storeToLocalStorage();
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
    span2.innerText = obj.desc;
    span3.innerText = obj.price;

    replace.innerHTML = "Replace";
    replace.addEventListener('click',(e)=>{
        update_item(e);
    });
    
    del.innerHTML = "Delete";
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
    desc.value = "";
    price.value = "";
}


function update_item(e){
    let parentdiv = e.target.parentNode;
    let taskid = parentdiv.getAttribute("class");

    let span1 = parentdiv.childNodes[0];
    let span2 = parentdiv.childNodes[1];
    let span3 = parentdiv.childNodes[2];

    span1.innerText = name.value;
    span2.innerText = desc.value;
    span3.innerText = price.value;

    products = products.filter((item)=>{
        if(item.id == taskid){
            item.name = name.value;
            item.desc = desc.value;
            item.price = price.value;
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
}

    