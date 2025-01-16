<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (isset($_POST["id"]) && !empty($_POST["id"])) {

            require_once "./classes/DataBaseHandler.php";
            
            $dbh = new DataBaseHandler();
            $dbh->deleteBook($_POST["id"]);

        }
    }