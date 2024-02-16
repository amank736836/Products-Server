let items = [];
let counter = 1;

const div = document.querySelector("#items");
const name = document.querySelector("#name");
const desc = document.querySelector("#desc");
const price = document.querySelector("#price");

const submit = document.querySelector("#submit");

submit.addEventListener("click",()=>{
    AddTask();    
})

function AddTask() {
    let obj = {};
    obj.name = name.value;
    obj.desc = desc.value;
    obj.price = price.value;
    obj.id = counter;
    counter++;
    items.push(obj);
    localStorage.setItem('counter',counter);
    storeToLocalStorage();
    AddtoUI(obj);

}

function fetchFromLocalStorage(){
    if(localStorage.getItem("items")!='[]' && localStorage.getItem("items")!=null){
        items = JSON.parse(localStorage.getItem("items"));
        counter = localStorage.getItem("counter");
        items.forEach((item) => AddtoUI(item))
    }else{
        items = [];
        counter = 1;
        localStorage.setItem('counter',1);
    }
}

fetchFromLocalStorage();

function storeToLocalStorage(){
    localStorage.setItem("items",JSON.stringify(items));
}

function AddtoUI(obj){

    let div1 = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');

    div1.setAttribute("class", obj.id);
    div1.setAttribute("id", "div1");

    span1.innerText = obj.name;
    span2.innerText = obj.desc;
    span3.innerText = obj.price;

    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);


    let replace = document.createElement("button");
    replace.innerHTML = "Replace";
    replace.addEventListener('click',(e)=>{

        // let name1 = prompt('Enter Product name:');
        // span1.innerText = name1; 
        // let desc1 = prompt('Enter Product description:');
        // span2.innerText = desc1;
        // let price1 = prompt('Enter Product price:');
        // span3.innerText = price1;  

        // // console.log(e);

        span1.innerText = name.value;
        span2.innerText = desc.value;
        span3.innerText = price.value;

        

        let parentdiv = e.target.parentNode;
        let taskid = parentdiv.getAttribute("class");
        console.log(taskid);

        items = items.filter((item)=>{
            if(item.id == taskid){
                item.name = name.value;
                item.desc = desc.value;
                item.price = price.value;
                
            }
            return item;
        })
        storeToLocalStorage();
        // fetchFromLocalStorage();
    })
    div1.appendChild(replace);
        

    let del = document.createElement("button");
    del.innerHTML = "Del"
    del.addEventListener('click',(e)=>{
        let parentdiv = e.target.parentNode;
        let taskid = parentdiv.getAttribute("class");
        parentdiv.remove();
        // console.log(parentdiv);
        // div1.remove();
        items = items.filter((item)=>{
            if(item.id != taskid){
                return item;
            }
        })
        storeToLocalStorage();
    })

    div1.appendChild(del);
    div.appendChild(div1);

    name.value = "";
    desc.value = "";
    price.value = "";

}


// function update(e){

//     console.log(e);
//     let parentdiv = e.target.parentNode;
//     let taskid = parentdiv.getAttribute("class");
//     let childNodes = parentdiv.childNodes;
//     let span1 = parentdiv.childNodes[0];
//     let span2 = parentdiv.childNodes[1];
//     let span3 = parentdiv.childNodes[2];

//     span1.innerText = name.value;
//     span2.innerText = desc.value;
//     span3.innerText = price.value;

//     console.log(childNodes);

//     items = items.filter((item)=>{
//         if(item.id == taskid){
//             item.name = name.value;
//             item.desc = desc.value;
//             item.price = price.value;
            
//         }
//         return item;
//     })
//     storeToLocalStorage();
// }
