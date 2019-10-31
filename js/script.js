"use strict";
let items = [];
let index = 2;
let editedItem = false;
let theId = 0;
let search = '';
let isStatus = 'all'; 
let itemPriority = 'all';

window.addItem = function() {
    search = '';
    document.getElementById('search').value = '';
    document.getElementById('addItem').classList.remove("display-none");
    document.getElementById('addItemBackground').classList.remove("display-none");
}

function addHTML(i) {
    return `<article class='item'>
        <h2 class='item__title item__text'>${items[i].title}</h2>
        <p class='item__text'>${items[i].description}</p>
        <div class='space-between'>
            <span class='item__priority item__text'>${items[i].priority}</span>
            <select name="action" id='itemAction_${items[i].id}' onchange="itemAction(${items[i].id})" class="item__select">
                <option value="" selected>...</option>
                <option value="done">done</option>
                <option value="edit">edit</option>
                <option value="delete">delete</option>
            </select>
        </div>
    </article>`;
}

window.onCancelItem = function(query) {
    console.log(JSON.stringify(items));
    document.getElementById("search").value = search;
    document.getElementById('addItem').classList.add("display-none");
    document.getElementById('addItemBackground').classList.add("display-none");
    let html = '';
    for (let i = 0; i < items.length; i++) {
        if (items[i].title.includes(search) && isStatus === 'all' && itemPriority === 'all') {
            html += addHTML(i);
        } else if (items[i].title.includes(search) && isStatus !== 'all' && itemPriority === 'all') {
            if(items[i].status === isStatus) {
                html += addHTML(i);
            }
        } else if(items[i].title.includes(search) && isStatus === 'all' && itemPriority !== 'all') {
            if(items[i].priority === itemPriority) {
                html += addHTML(i);
            }
        } else if (items[i].title.includes(search) && isStatus !== 'all' && itemPriority !== 'all') {
            if(items[i].status === isStatus && items[i].priority === itemPriority) {
                html += addHTML(i);
            }
        }
    }
    document.getElementById("items").innerHTML = html;
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('priority').value = 'High';
}

document.getElementById("addItem").addEventListener("submit", function (event) {
    event.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let priority = document.getElementById('priority').value;
    let id = editedItem ? theId : index
    let newItem = { id, title, description, priority, status: false }
    search = '';

    if (editedItem) {
        items.forEach(item => {
            if (item.id === theId) {
                item.title = title;
                item.description = description;
                item.priority = priority;
            }
        })
        editedItem = false;
        search = '';
        isStatus = 'all'; 
        itemPriority = 'all';
    } else {
        items.push(newItem);
        index++;
        search = '';
        isStatus = 'all'; 
        itemPriority = 'all';
    }

    console.log(JSON.stringify(items));

    onCancelItem('');
});

window.itemAction = function(id) {
    theId = id;
    let action = document.getElementById('itemAction_' + theId).value;
    console.log(action)
    console.log(theId)

    switch (action) {
        case 'done':
            items.forEach(item => {
                if (item.id === theId) {
                    item.status = true;
                    onCancelItem();
                }
            })
            break;
        case 'delete':
            items = items.filter(item => item.id !== theId)
            console.log(JSON.stringify(items));

            onCancelItem();
            break;
        case 'edit':
            editedItem = true;
            items.forEach(item => {
                if (item.id === theId) {
                    document.getElementById('description').value = item.description;
                    document.getElementById('priority').value = item.priority;
                    document.getElementById('title').value = item.title;
                    addItem()
                    editedItem = true;
                }
            })
            break;
    }
}

// toolbar
document.getElementById("search").addEventListener("change", function (event) {
    console.log(event.target.value)
    search = event.target.value;
    document.getElementById("search").value = event.target.value;
    onCancelItem(search);
})

document.getElementById("itemsState").addEventListener("change", function (event) {
    isStatus = event.target.value === "open" ? false : event.target.value === "done" ?  true : "all";
    document.getElementById("itemsState").value = event.target.value;
    onCancelItem();
})

document.getElementById("itemsPriority").addEventListener("change", function (event) {
    itemPriority = event.target.value;
    document.getElementById("itemsPriority").value = event.target.value;
    onCancelItem();
})

