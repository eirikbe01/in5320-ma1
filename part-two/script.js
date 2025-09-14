
// step 1 and 2

let counter = 1;
// SOT for currencies
let currencyItems = [];

const list = document.getElementById("listId");
const input = document.querySelector(".inputField");
const addBtn = document.getElementById("addBtnId");
const searchInput = document.querySelector(".searchField");

const makeListItem = (text, id) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = String(id);

    const span = document.createElement("span");
    span.textContent = text + " ";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = `btn-${id}`;
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

    const id = counter++;
    currencyItems.push({ id, text: inputVal })

    input.value = "";
    input.focus();
    
    const currentQuery = searchInput.value.trim();
    render(list, currencyItems, currentQuery);
});

// search on Enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

list.addEventListener("click", (e) => {
    const btn = e.target.closest("button.deleteBtn");
    if (!btn) return;

    const idStr = btn.id.replace("btn-", "");
    const id = Number(idStr);
    currencyItems = currencyItems.filter((it) => it.id !== id);

    const currentQuery = searchInput.value.trim();
    render(list, currencyItems, currentQuery);
});


// step 3 and 4

const render = (ul, items, query) => {
    const q = (query || "").trim();
    ul.innerHTML = "";
    items
        .filter((it) => startsWithWord(it.text, q))
        .forEach((it) => ul.appendChild(makeListItem(it.text, it.id)));
}

const startsWithWord = (element, searchWord) => {
    const query = (searchWord || "").toLowerCase().trim();
    if (!query) return true;
    return element.toLowerCase().startsWith(searchWord.toLowerCase());
};

const search = (list, searchWord) => {
    return list.filter((item) => startsWithWord(item, searchWord));
};



searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    render(list, currencyItems, query);
});

render(list, currencyItems, "");



// step 5
// fetch countries
let countries = [];
$.ajax({
    url: 'https://d6wn6bmjj722w.population.io/1.0/countries/',
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    },
    success: function(response) {
        countries = response.countries;
    },
    error: function(err) {
        console.error('Something went wrong: ', err);
    }
});


const countrySearchInput = document.getElementById("countryInput");
const countryBtn = document.getElementById("countryBtnId");
const countryList = document.getElementById("countryListId");
const searchInputV2 = document.getElementById("searchInputV2Id");

let countryItems = [];

countryBtn.addEventListener("click", () => {
    const inputVal = countrySearchInput.value.trim();
    if (!inputVal) return;

    if (!countries.includes(inputVal)) {
        alert(`${inputVal} is not a supported country`);
        return;
    }
    // fetch population
    $.ajax({
        url: `https://d6wn6bmjj722w.population.io/1.0/population/${inputVal}/today-and-tomorrow/`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        success: function (response) {
            const population = Number(response.total_population[0].population);
            const formatted = population.toLocaleString('no-NO');
            const text = `${inputVal} - ${formatted}`

            const id = counter++;
            countryItems.push({ id, text });

            countrySearchInput.value = "";
            countrySearchInput.focus();

            const currentQuery = searchInputV2.value.trim();
            render(countryList, countryItems, currentQuery);
        },
        error: function(err) {
            console.error('Failed with error: ', err);
        }
    });
});

countrySearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        countryBtn.click();
    }
});

countryList.addEventListener("click", (e) => {
    const btn = e.target.closest("button.deleteBtn");
    if (!btn) return;

    const idStr = btn.id.replace("btn-", "");
    const id = Number(idStr);
    countryItems = countryItems.filter((it) => it.id !== id);

    const currentQuery = searchInputV2.value.trim();
    render(countryList, countryItems, currentQuery);
})

searchInputV2.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    render(countryList, countryItems, query);
});

render(countryList, countryItems, "");

