const form = document.querySelector('#form');
const inputField = document.querySelector('.form-control');
const clearItems = document.querySelector('.clear-btn');
const itemList = document.querySelector('.item-list');

function handleTasks() {
    const items = itemList.querySelectorAll('.items');

    items.forEach((item) => {
        const itemTitle = item.querySelector('.item-name');
        const completeIcon = item.querySelector('.complete-icon');
        const editIcon = item.querySelector('.edit-icon');
        const deleteIcon = item.querySelector('.delete-icon');

        completeIcon.addEventListener('click', function () {
            if (completeIcon.classList.contains('completed')) {
                completeIcon.classList.remove('completed');
                itemTitle.classList.remove('strike-through');
                localStorage.setItem('toDoList', itemList.innerHTML);
            } else {
                completeIcon.classList.add('completed');
                itemTitle.classList.add('strike-through');
                localStorage.setItem('toDoList', itemList.innerHTML);
            }
        });

        editIcon.addEventListener('click', function () {
            inputField.value = itemTitle.textContent;
            itemList.removeChild(item);
            localStorage.setItem('toDoList', itemList.innerHTML);
        });

        deleteIcon.addEventListener('click', function () {
            itemList.removeChild(item);
            localStorage.setItem('toDoList', itemList.innerHTML);
        });
    });
}

function clearItemsFromList() {
    itemList.innerHTML = '';
    form.reset();
    localStorage.clear();
}

function getLocalStorage() {
    const storage = localStorage.getItem('toDoList');

    if (storage === null || storage === undefined) {
        itemList.innerHTML = itemList.innerHTML;
    } else {
        itemList.innerHTML = storage;
    }

    handleTasks();
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (inputField.value !== '') {
        const item = inputField.value;

        itemList.insertAdjacentHTML('beforeend',
            `<div class="items ${item} pb-3">
                <h5 class="item-name text-capitalize">${item}</h5>
 
                <div class="item-icons">
                    <i class="item-icon complete-icon far fa-check-circle ml-2"></i>
                    <i class="item-icon edit-icon far fa-edit ml-2"></i>
                    <i class="item-icon delete-icon far fa-times-circle ml-2"></i>
                </div>
             </div>`
        );
    }

    inputField.value = '';
    localStorage.setItem('toDoList', itemList.innerHTML);
    getLocalStorage();
});

clearItems.addEventListener('click', clearItemsFromList);

window.onload = getLocalStorage();

