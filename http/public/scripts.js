const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');

// Loads the information currently stored in the "database" 
// through the API and adds it to the front-page
async function load() {
    const res = await fetch("http://localhost:3000").then((data) => data.json());

    res.urls.map(({ name, url }) => addElement({ name, url }));
}

load();

// Adds the item to the "database" through the API
async function addToList({ name, url }) {
    const req = await fetch(`http://localhost:3000?name=${name}&url=${url}`).then((data) => data.json());
}

// Removes the selected item from the "database" through the API
async function removeFromList(name, url, index) {
    const req = await fetch(`http://localhost:3000?name=${name}&url=${url}&del=${index}`).then((data) => data.json());
}

// Adds data, from the "database", into the front-page
function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const trash = document.createElement("span");

    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    // Creates the "delete button", used to delete information
    trash.innerHTML = "x";
    trash.onclick = () => removeElement(trash);

    li.append(a);
    li.append(trash);
    ul.append(li);
}

// Extracts the 'name' and 'url' from the to-be-deleted item 
// and sends this information to the removeFromList() function
async function removeElement(el) {
    if (confirm('Are you sure you want to delete it?')) {
        const { text, origin } = el.parentNode.firstChild;
        const index = 1;

        removeFromList(text, origin, index);
        el.parentNode.remove();
    }
}

// Monitors the input, to check for user's errors
// If the input is correct, the information is added 
// to the "database" and also the front-page
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) 
        return alert('Fill the text area');

    const [name, url] = value.split(", ");

    if (!url) 
        return alert('Missing information or incorrect format');

    if (!/^http/.test(url)) 
        return alert("Please, type the url correctly");
    
    addToList({ name, url });
    addElement({ name, url });

    input.value = "";
})