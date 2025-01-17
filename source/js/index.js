window.onload = () => {

    document.getElementById("addBookForm").addEventListener("submit", addBook);
    document.getElementById("editBookForm").addEventListener("submit", editBook);
    document.getElementById("deleteBookForm").addEventListener("submit", deleteBook);

    // add event for all edit book button
    eventForEditButtons();

    // add event for all delete book button
    eventForDeleteButtons();

};

let bookIdForModification, bookIdForDeletion;


function addBook(ev) {

    ev.preventDefault();

    // inputs
    const title = document.getElementById("addTitle");
    const isbn = document.getElementById("addIsbn");
    const author = document.getElementById("addAuthor");
    const publisher = document.getElementById("addPublisher");
    const yearPublished = document.getElementById("addYearPublished");
    const category = document.getElementById("addCategory");

    const data = `title=${title.value}&isbn=${isbn.value}&author=${author.value}&publisher=${publisher.value}&yearPublished=${yearPublished.value}&category=${category.value}`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./includes/addBook.php", true);
    xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        displayBook(JSON.parse(xhr.responseText));
    };

    xhr.send(data);

    function displayBook(bookData) {

        const table = document.querySelector(".main-table");
        const book = document.createElement("tr");

        const actionButtonContainer = document.createElement("td");
        actionButtonContainer.classList.add("action-button-container");

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button", "btn");
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#editModal");
        editButton.setAttribute("data-book-id", bookData["id"]);
        editButton.innerHTML = "EDIT";
        editButton.addEventListener("click", () => {
            bookIdForModification = bookData["id"];
            document.getElementById("bookTitleForModification").innerHTML = bookData["title"];
            setPlaceholderForBookModification();
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button", "btn");
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", "#deleteModal");
        deleteButton.setAttribute("data-book-id", bookData["id"]);
        deleteButton.innerHTML = "DEL";
        deleteButton.addEventListener("click", () => {
            bookIdForDeletion = bookData["id"];
            document.getElementById("bookTitleForDeletion").innerHTML = bookData["title"];
            showNoBookDialog();
        });

        book.innerHTML = `
            <td>${bookData["title"]}</td>
            <td>${bookData["isbn"]}</td>
            <td>${bookData["author"]}</td>
            <td>${bookData["publisher"]}</td>
            <td>${bookData["yearPublished"]}</td>
            <td>${bookData["category"]}</td>
        `;

        table.querySelector("tbody").appendChild(book);
        actionButtonContainer.appendChild(editButton);
        actionButtonContainer.appendChild(deleteButton);
        book.appendChild(actionButtonContainer);

        // remove no-books-dialog if there is book existing
        if (document.getElementById("no-books-dialog")) document.getElementById("no-books-dialog").parentElement.removeChild(document.getElementById("no-books-dialog"));

        clearFormInputs();

    }

    function clearFormInputs() {
        title.value = "";
        isbn.value = "";
        author.value = "";
        publisher.value = "";
        yearPublished.value = "";
        category.value = "";
    }

}

function eventForEditButtons() {
    const editButtons = [ ...document.getElementsByClassName("edit-button") ];
    editButtons.forEach(button => {
        button.addEventListener("click", (ev) => {
            bookIdForModification = button.dataset.bookId;
            document.getElementById("bookTitleForModification").innerHTML = ev.currentTarget.parentElement.parentElement.firstElementChild.innerHTML;
            setPlaceholderForBookModification();
        });
    })
}

function setPlaceholderForBookModification() {

    // inputs
    const title = document.getElementById("editTitle");
    const isbn = document.getElementById("editIsbn");
    const author = document.getElementById("editAuthor");
    const publisher = document.getElementById("editPublisher");
    const yearPublished = document.getElementById("editYearPublished");
    const category = document.getElementById("editCategory");

    // book details
    const bookDetails = document.querySelector(".main-table").querySelector(`button[data-book-id="${bookIdForModification}"]`).parentElement.parentElement.children;

    title.setAttribute("placeholder",bookDetails[0].innerHTML);
    isbn.setAttribute("placeholder",bookDetails[1].innerHTML);
    author.setAttribute("placeholder",bookDetails[2].innerHTML);
    publisher.setAttribute("placeholder",bookDetails[3].innerHTML);
    yearPublished.setAttribute("placeholder",bookDetails[4].innerHTML);
    category.setAttribute("placeholder",bookDetails[5].innerHTML);

}

function editBook(ev) {

    ev.preventDefault();

    // inputs
    const title = document.getElementById("editTitle");
    const isbn = document.getElementById("editIsbn");
    const author = document.getElementById("editAuthor");
    const publisher = document.getElementById("editPublisher");
    const yearPublished = document.getElementById("editYearPublished");
    const category = document.getElementById("editCategory");

    // book details
    const bookDetails = document.querySelector(".main-table").querySelector(`button[data-book-id="${bookIdForModification}"]`).parentElement.parentElement.children;

    const data = `id=${bookIdForModification}`
        + `&title=${title.value || bookDetails[0].innerHTML}`
        + `&isbn=${isbn.value || bookDetails[1].innerHTML}`
        + `&author=${author.value || bookDetails[2].innerHTML}`
        + `&publisher=${publisher.value || bookDetails[3].innerHTML}`
        + `&yearPublished=${yearPublished.value || bookDetails[4].innerHTML}`
        + `&category=${category.value || bookDetails[5].innerHTML}`
    ;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./includes/editBook.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onload = () => {
        updateModifiedBooks(bookDetails, JSON.parse(xhr.responseText));
        clearFormInputs();
    };

    xhr.send(data);

    function clearFormInputs() {
        title.value = "";
        isbn.value = "";
        author.value = "";
        publisher.value = "";
        yearPublished.value = "";
        category.value = "";
    }

}

function updateModifiedBooks(bookDetails, updatedDetails) {
    bookDetails[0].innerHTML = updatedDetails["title"];
    bookDetails[1].innerHTML = updatedDetails["isbn"];
    bookDetails[2].innerHTML = updatedDetails["author"];
    bookDetails[3].innerHTML = updatedDetails["publisher"];
    bookDetails[4].innerHTML = updatedDetails["yearPublished"];
    bookDetails[5].innerHTML = updatedDetails["category"];
}


function eventForDeleteButtons() {
    const deleteButtons = [ ...document.getElementsByClassName("delete-button") ];
    deleteButtons.forEach(button => {
        button.addEventListener("click", (ev) => {
            bookIdForDeletion = button.dataset.bookId;
            document.getElementById("bookTitleForDeletion").innerHTML = ev.currentTarget.parentElement.parentElement.firstElementChild.innerHTML;
        });
    })
}

function deleteBook(ev) {
    
    ev.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./includes/deleteBook.php", true);
    xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if (JSON.parse(xhr.responseText)[0]) {
            removeBookFromDisplay();
        }
    };

    xhr.send(`id=${bookIdForDeletion}`);

    function removeBookFromDisplay() {
        const deleteButton = document.querySelector(".main-table").querySelector(`button[data-book-id="${bookIdForDeletion}"]`);
        document.querySelector(".main-table").querySelector("tbody").removeChild(deleteButton.parentElement.parentElement);
        showNoBookDialog();
    }

}

function showNoBookDialog() {
    const tableBody = document.querySelector(".main-table").querySelector("tbody");
    if (tableBody.children.length > 0) return;
    tableBody.innerHTML = "<tr id='no-books-dialog'><td colspan='7' class='p-4 fs-4 text-center'>No Books To Show</td></tr>";
}
