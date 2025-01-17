<?php

    if ($_SERVER["REQUEST_METHOD"] === "POST" ) {
        if (dataIsComplete()) {
            
            require_once "../classes/DataBaseHandler.php";
            require_once "../classes/Book.php";

            $book = new Book(
                $_POST["title"],
                $_POST["isbn"],
                $_POST["author"],
                $_POST["publisher"],
                $_POST["yearPublished"],
                $_POST["category"]
            );

            if ($book->editBook($_POST["id"])) {
                returnBookDataOnSuccess();
            }

        }
    }

    function dataIsComplete() {
        if (
            isset($_POST["id"]) && !empty($_POST["id"]) &&
            isset($_POST["title"]) && !empty($_POST["title"]) &&
            isset($_POST["isbn"]) && !empty($_POST["isbn"]) &&
            isset($_POST["author"]) && !empty($_POST["author"]) &&
            isset($_POST["publisher"]) && !empty($_POST["publisher"]) &&
            isset($_POST["yearPublished"]) && !empty($_POST["yearPublished"]) &&
            isset($_POST["category"]) && !empty($_POST["category"])
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    function returnBookDataOnSuccess() {

        $data = [
            "title" => $_POST["title"],
            "isbn" => $_POST["isbn"],
            "author" => $_POST["author"],
            "publisher" => $_POST["publisher"],
            "yearPublished" => $_POST["yearPublished"],
            "category" => $_POST["category"]
        ];

        echo json_encode($data);
    }

