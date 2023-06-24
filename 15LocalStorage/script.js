const addItems = document.querySelector('.add-items');
const itemList = document.querySelector('.plates');

// MODEL of MVC design pattern
// check the local storage, if it is empty => use the empty array as a default
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name="item"]').value;
    const item = {
        text: text,
        done: false,
    };
    this.reset();
    items.push(item);

    populateList(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
}

// VIEW of MVC design pattern
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates
        .map((plate, i) => {
            return `
            <li >
                <input type="checkbox" data-index=${i} id="item${i}" ${
                plate.done ? 'checked' : ''
            }>
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
        })
        .join('');
}

function tuggleCheckbox(e) {
    // checks if the target element of the event e matches the specified CSS selector 'input'
    if (!e.target.matches('input')) return;
    const element = e.target;
    const index = element.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemList);
}

addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', tuggleCheckbox);

populateList(items, itemList);

//Addtional functionality - clearAll, checkAll and uncheckAll

function handleClearAll() {
    items.length = 0;
    populateList(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
}

function handleCheckAll() {
    items.map((item) => {
        item.done = true;
    });
    populateList(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
}

function handleUncheckAll() {
    items.map((item) => {
        item.done = false;
    });
    populateList(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
}

const clearAllBtn = document.querySelector('.clear-all');
const checkAllBtn = document.querySelector('.check-all');
const uncheckAllBtn = document.querySelector('.uncheck-all');

clearAllBtn.addEventListener('click', handleClearAll);
checkAllBtn.addEventListener('click', handleCheckAll);
uncheckAllBtn.addEventListener('click', handleUncheckAll);
