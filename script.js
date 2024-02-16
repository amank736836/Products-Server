let items = [];
        
var submit = document.getElementById("submit");
submit.onclick = function() {
    const tagname = document.getElementById("name");
    const name = tagname.value;
    const tagdesc = document.getElementById("desc");
    const desc = tagdesc.value;
    const tagprice = document.getElementById("price");
    const price = tagprice.value;
    items.push({ name: name, desc: desc, price: price});
    localStorage.setItem("items",JSON.stringify(items));

    const li = document.createElement('li');
    const span1 = document.createElement('span');
    span1.innerText = name;
    const span2 = document.createElement('span');
    span2.innerText = desc;
    const span3 = document.createElement('span');
    span3.innerText = price;

    const ul = document.getElementById('items');
    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    ul.appendChild(li);
    
}
