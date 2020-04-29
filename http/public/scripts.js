const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');

async function load() {
    const res = await fetch("http://localhost:3000").then((data) => data.json());

    res.urls.map(({ name, url }) => addElement({ name, url }));
}

load();

async function addToList({ name, url }) {
    const req = await fetch(`http://localhost:3000?name=${name}&url=${url}`).then((data) => data.json());
}

async function removeFromList(name, url, index) {
    const req = await fetch(`http://localhost:3000?name=${name}&url=${url}&del=${index}`).then((data) => data.json());
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
    if (confirm('Are you sure you want to delete it?')) {
        const { text, origin } = el.parentNode.firstChild;
        const index = 1;

        removeFromList(text, origin, index);
        el.parentNode.remove();
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) 
        return alert('Fill the text area');

    const [name, url] = value.split(", ");

    if (!url) 
        return alert('Incorrect format');

    if (!/^http/.test(url)) 
        return alert("Please, type the url correctly");
    
    addToList({ name, url });
    addElement({ name, url });

    input.value = "";
})