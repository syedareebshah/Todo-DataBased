var list = document.getElementById('list');


function addTodo() {
    var todoItem = document.getElementById('todo-item');
    if (todoItem.value === "") {
        alert('Enter Todo Please')
    }
    else {
        var li = document.createElement('li');
        var liText = document.createTextNode(todoItem.value);
        li.setAttribute("class", "todo-list");
        li.appendChild(liText);
        list.appendChild(li);
    }

    // delete Button

    var delBtn = document.createElement("button");
    var delText = document.createTextNode("DELETE");
    delBtn.appendChild(delText);
    delBtn.setAttribute("onclick", "delItem(this)");
    delBtn.setAttribute("class", "btn");
    li.appendChild(delBtn);

    // edit Button

    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editBtn.appendChild(editText);
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.setAttribute("class", "btn");
    li.appendChild(editBtn);

    // Connect firebase database

    var key = firebase.database().ref('todoName').push().key;
    var todoItems = {
        name: todoItem.value,
        itemKey : key,
    }
    
    firebase.database().ref('todoName').push(todoItems)
    console.log(todoItems)


    todoItem.value = '';
}

function delItem(e) {
    e.parentNode.remove();
}

function editItem(e) {
    var edit = e.parentNode.firstChild.nodeValue;
    var editValue = prompt("Enter Correct Value", edit)
    e.parentNode.firstChild.nodeValue = editValue;
}

function firebaseDataRemove(){
    firebase.database().ref('todoName').remove();
}


function delTodo() {
    list.innerHTML = '';
    firebaseDataRemove();
}