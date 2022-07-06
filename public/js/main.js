const bookTableBody = document.getElementById('bookTableBody');
const saveChanges = document.getElementById('saveChanges');
const inputAutor = document.getElementById('inputAutor');
const inputName = document.getElementById('inputName');
const deleteButton = document.getElementById('deleteButton');

let action = null;
let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});


function renderTable() {
    axios({
        method: 'get',
        url: '/books',
    })
        .then(function (response) {
            const books = response.data;
            bookTableBody.innerHTML = '';

            books.forEach(book => {
                let newBook = document.createElement('tr');
                newBook.innerHTML =
                    `
                <td><input type="radio" name="bookID" value="${book.id}"></td>
                <td scope="row">${book.id}</td>
                <td>${book.name}</td>
                <td>${book.autor}</td>
                `;
                bookTableBody.appendChild(newBook);
            });
        });
};

window.onload = (e) => {
    renderTable();
};

function showAlert(text) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper);
    }
    alert(`${text}`, 'success');

    inputName.value = '';
    inputAutor.value = '';
};

function addNewBook() {

    let name = document.getElementById('inputName').value;
    let autor = document.getElementById('inputAutor').value;

    axios({
        method: 'post',
        url: '/books',
        data: {
            name: name,
            autor: autor
        }
    });

};

function getBookID() {
    const radioButtons = document.getElementsByName('bookID');
    let id = null;

    for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            id = radioButtons[i].value;
            id = parseInt(id);
            break;
        }
    };

    if (id != null) {
        axios({
            method: 'get',
            url: '/books',
        }).then(function (response) {
            const books = response.data;
            inputName.value = books[id].name;
            inputAutor.value = books[id].autor;
            myModal.show();
        });


    } else {
        alert('Elementni tanlang!')
    }

    return id;
};

function updateBook(id) {
    let name = inputName.value;
    let autor = inputAutor.value;


    axios({
        method: 'put',
        url: '/books',
        data: {
            id: id,
            name: name,
            autor: autor
        }
    })

};

function deleteBook() {
    const radioButtons = document.getElementsByName('bookID');
    let id = null;

    for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            id = radioButtons[i].value;
            id = parseInt(id);
            break;
        }
    };

    if (id != null) {
        const answer = confirm(`${id}- element o'chirilsinmi?`);
        if (answer) {
            axios({
                method: 'delete',
                url: '/books',
                data: {
                    id: id
                }
            });
            showAlert(`Kitob o'chirildi!`);
            renderTable();

        }
    } else {
        alert('Elementni tanlang!');
    }
};

addBook.onclick = (e) => {
    action = 'add';
    inputName.value = '';
    inputAutor.value = '';
    myModal.show();

};
updateButton.onclick = (e) => {
    action = 'update';
    getBookID();

};

deleteButton.onclick = (e) => {
    deleteBook();
};
saveChanges.onclick = (e) => {
    if (action == 'add') {
        addNewBook();
        showAlert(`Yangi kitob muvofoqiyatli qo'shildi!`);
        action = null;
        renderTable();

    } else if (action == 'update') {
        let id = getBookID();
        updateBook(id);
        showAlert(`Kitob o'zgartirildi!`);
        action = null;
        renderTable();
    }
};


