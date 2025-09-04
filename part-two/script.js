
// step 1 and 2

let counter = 1;

const list = document.getElementById("listId");
const input = document.querySelector(".inputField");
const addBtn = document.getElementById("addBtnId");

const makeListItem = (text) => {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text + " ";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = `btn-${counter++}`;
    btn.className = "deleteBtn";
    btn.setAttribute("aria-label", "Delete Item");
    btn.title = "Delete";
    btn.innerHTML = "<i class='fa-solid fa-xmark'></i>";

    listItem.append(span, btn);
    return listItem;
}

list.innerHTML = "";
addBtn.addEventListener("click", () => {
    const inputVal = input.value.trim();
    if (!inputVal) return;
    list.appendChild(makeListItem(inputVal));
    input.value = "";
    input.focus();
});

// search on Enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

list.addEventListener("click", (e) => {
    const btn = e.target;
    if (!btn) return;

    btn.closest("li")?.remove();
});


// step 3 and 4
const startsWithWord = (element, searchWord) => {
    if(element.toLowerCase().startsWith(searchWord.toLowerCase())) {
        return true;
    } else {
        return false;
    }
};

const search = (list, searchWord) => {
    return list.filter((item) => startsWithWord(item, searchWord));
};

const searchInput = document.querySelector(".searchField");

searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    console.log(query);

    const items = Array.from(list.querySelectorAll("li"));
    const texts = items.map((li) => (li.querySelector("span")?.textContent || "").toLowerCase());


    const matches = search(texts, query);
    items.forEach((li, i) => {
        const text = texts[i];
        li.hidden = !matches.includes(text);
    });
});
