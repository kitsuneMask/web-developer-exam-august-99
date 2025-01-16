window.onload = () => {

    document.getElementById("addBookForm").addEventListener("submit", addBook);
    document.getElementById("deleteBookForm").addEventListener("submit", deleteBook);

    // add event for all delete book button
    eventForDeleteButtons();

};

let bookIdForDeletion;


function addBook(ev) {

    ev.preventDefault();

    // data
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

        book.innerHTML = `
            <td>${bookData["title"]}</td>
            <td>${bookData["isbn"]}</td>
            <td>${bookData["author"]}</td>
            <td>${bookData["publisher"]}</td>
            <td>${bookData["yearPublished"]}</td>
            <td>${bookData["category"]}</td>
            <td class="action-button-container">
                <button class="edit-button btn" data-bs-toggle="modal" data-bs-target="#editModal" data-book-id="${bookData["id"]}">EDIT</button>
                <button class="delete-button btn" data-bs-toggle="modal" data-bs-target="#deleteModal" data-book-id="${bookData["id"]}">DEL</button>
            </td>
        `;

        table.querySelector("tbody").appendChild(book);

        // remove no-books-dialog if there is book existing
        if (document.getElementById("no-books-dialog")) document.getElementById("no-books-dialog").parentNode.removeChild(document.getElementById("no-books-dialog"));

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

function eventForDeleteButtons() {
    const deleteButtons = [ ...document.getElementsByClassName("delete-button") ];
    deleteButtons.forEach( button => {
        const bookId = button.dataset.bookId;
        button.addEventListener("click", (ev) => deleteModal(ev, bookId));
    })
}

function deleteModal(ev, bookId) {
    bookIdForDeletion = bookId;
    const bookTitleForDeletion = document.getElementById("bookTitleForDeletion");
    bookTitleForDeletion.innerHTML = ev.currentTarget.parentNode.parentNode.firstElementChild.innerHTML;
}

function deleteBook(ev) {
    
    ev.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./includes/deleteBook.php", true);
    xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        console.log(JSON.parse(xhr.responseText));
    };

    xhr.send(`id=${bookIdForDeletion}`);

}