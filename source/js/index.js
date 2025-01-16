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

        const actionButtonContainer = document.createElement("td");
        actionButtonContainer.classList.add("action-button-container");

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

function eventForDeleteButtons() {
    const deleteButtons = [ ...document.getElementsByClassName("delete-button") ];
    deleteButtons.forEach( button => {
        const bookId = button.dataset.bookId;
        button.addEventListener("click", (ev) => deleteModal(ev, bookId));
    })
}

function deleteModal(ev, bookId) {
    bookIdForDeletion = bookId;
    document.getElementById("bookTitleForDeletion").innerHTML = ev.currentTarget.parentElement.parentElement.firstElementChild.innerHTML;
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