const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');

async function load() {
    const res = await fetch("http://localhost:3000").then((data) => data.json());

    res.urls.map(({ name, url }) => addElement({ name, url }));
}

load();

async function addToList({ name, url }) {
    const res = await fetch(`http://localhost:3000?name=${name}&url=${url}`).then((data) => data.json());
}

function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const trash = document.createElement("span");

    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(trash);

    li.append(a);
    li.append(trash);
    ul.append(li);
}

async function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')) {
        //const name = el.parentNode.innerHTML;
        //console.log(`innerHTML: ${name}`);
        
        el.parentNode.remove();
        
        //const res = await fetch(`http://localhost:3000?name=${name}&url=${url}&del=1`).then((data) => data.json());
    } 
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) 
        return alert('Preencha o campo');

    const [name, url] = value.split(", ");

    if (!url) 
        return alert('formate o texto da maneira correta');

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta");
    
    addToList({ name, url });
    addElement({ name, url });

    input.value = "";
})