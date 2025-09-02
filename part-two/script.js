
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

list.InnerHTML = "";
addBtn.addEventListener("click", () => {
    const inputVal = input.value.trim();
    if (!inputVal) return;
    list.appendChild(makeListItem(inputVal));
    input.value = "";
    input.focus();
});

input.addEventListener("click", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

list.addEventListener("click", (e) => {
    if (e.target.matches("button.deleteBtn")) {
        const btn = e.target;
        console.log("clicked: ", btn.id);
        btn.closest("li")?.remove();
    }
});


const startsWithWord = (element, searchWord) => {
    if(element.startsWith(searchWord)) {
        return true;
    } else {
        return false;
    }
};

const search = (list, searchWord) => {
    return list.filter((item) => startsWithWord(item, searchWord));
};