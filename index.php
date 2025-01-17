<!DOCTYPE html>
<html lang="es">
<head>

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />

    <title>Book Management System</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="./source/css/index.css" />

</head>
<body>
    <main class="d-flex flex-column align-items-center justify-content-center">
        <div class="d-flex flex-column h-auto">
            <button class="add-button align-self-end btn px-5 py-2 text-white" data-bs-toggle="modal" data-bs-target="#addModal">Add</button>
            <table class="main-table table table-bordered border-secondary-subtle mt-4">
                <thead>
                    <tr>
                        <th scope="col" class="fw-bold px-5 py-2">TITLE</th>
                        <th scope="col" class="fw-bold px-5 py-2">ISBN</th>
                        <th scope="col" class="fw-bold px-5 py-2">AUTHOR</th>
                        <th scope="col" class="fw-bold px-5 py-2">PUBLISHER</th>
                        <th scope="col" class="fw-bold px-5 py-2">YEAR PUBLISHED</th>
                        <th scope="col" class="fw-bold px-5 py-2">CATEGORY</th>
                        <th scope="col" class="fw-bold px-5 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php

                        require_once "./classes/DataBaseHandler.php";

                        $dbh = new DataBaseHandler();
                        $books = $dbh->getAllBooks();

                        if ($books) {
                            foreach ($books as $book) {
                                echo "<tr>";
                                    echo "<td>".$book["title"]."</td>";
                                    echo "<td>".$book["isbn"]."</td>";
                                    echo "<td>".$book["author"]."</td>";
                                    echo "<td>".$book["publisher"]."</td>";
                                    echo "<td>".$book["year_published"]."</td>";
                                    echo "<td>".$book["category"]."</td>";
                                    echo "<td class='action-button-container'>";
                                        echo "<button class='edit-button btn' data-bs-toggle='modal' data-bs-target='#editModal' data-book-id='".$book['id']."'>EDIT</button>";
                                        echo "<button class='delete-button btn' data-bs-toggle='modal' data-bs-target='#deleteModal' data-book-id='".$book['id']."'>DEL</button>";
                                    echo "</td>";
                                echo "</tr>";
                            }
                        }

                        // NO BOOKS
                        else {
                            echo "<tr id='no-books-dialog'><td colspan='7' class='p-4 fs-4 text-center'>No Books To Show</td><tr>";
                        }

                    ?>
                </tbody>
            </table>
        </div>
    </main>


    <!-- ADD MODAL -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" style="border:none">
                    <button type="button" class="btn-close bg-secondary-subtle" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addBookForm">
                        <h1 class="modal-title fw-bold text-center" id="addModalLabel" style="font-size: 1.563rem; color: #5c5c5c;">ADD A BOOK</h1>
                        <table class="add-table table table-borderless mt-4">
                            <tbody>
                                <tr class="align-middle">
                                    <th scope="row">Title</th>
                                    <td>
                                        <input type="text" required id="addTitle" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">ISBN</th>
                                    <td>
                                        <input type="text" required id="addIsbn" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Author</th>
                                    <td>
                                        <input type="text" required id="addAuthor" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Publisher</th>
                                    <td>
                                        <input type="text" required id="addPublisher" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Year Published</th>
                                    <td>
                                        <input type="text" required id="addYearPublished" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Category</th>
                                    <td>
                                        <input type="text" required id="addCategory" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>
                                        <button type="submit" class="btn text-white px-4" style="background: #39b54a; font-size: 13px;" data-bs-dismiss="modal">Save</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- EDIT MODAL -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" style="border:none">
                    <button type="button" class="btn-close bg-secondary-subtle" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editBookForm">
                        <h1 class="modal-title fw-bold text-center" id="editModalLabel" style="font-size: 1.563rem; color: #5c5c5c;">EDIT <span id="bookTitleForModification"></span></h1>
                        <table class="add-table table table-borderless mt-4">
                            <tbody>
                                <tr class="align-middle">
                                    <th scope="row">Title</th>
                                    <td>
                                        <input type="text" id="editTitle" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">ISBN</th>
                                    <td>
                                        <input type="text" id="editIsbn" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Author</th>
                                    <td>
                                        <input type="text" id="editAuthor" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Publisher</th>
                                    <td>
                                        <input type="text" id="editPublisher" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Year Published</th>
                                    <td>
                                        <input type="text" id="editYearPublished" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                                <tr class="align-middle">
                                    <th scope="row">Category</th>
                                    <td>
                                        <input type="text" id="editCategory" spellcheck="false" class="border border-secondary-subtle" />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>
                                        <button type="submit" data-bs-dismiss="modal" class="btn text-white px-4" style="background: #39b54a; font-size: 13px;">Save</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- DELETE MODAL -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" style="border:none">
                    <button type="button" class="btn-close bg-secondary-subtle" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-column align-items-center">
                    <p class="modal-title fw-bold text-center" id="deleteModalLabel" style="font-size: 1.125rem; color: #5c5c5c;">Are you sure you want to delete '<span id="bookTitleForDeletion"></span>'?</p>
                    <form id="deleteBookForm" class="d-flex mt-4">
                        <button type="submit" data-bs-dismiss="modal" class="btn text-white me-3 px-4" style="background: #39b54a; font-size: 13px;">Yes</button>
                        <button type="button" data-bs-dismiss="modal" class="btn text-white px-4" style="background: #c2c2c2; font-size: 13px;">No</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="./source/js/index.js"></script>

</body>
</html>