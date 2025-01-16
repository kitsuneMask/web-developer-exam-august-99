<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (isset($_POST["id"]) && !empty($_POST["id"])) {

            require_once "../classes/DataBaseHandler.php";
            
            $dbh = new DataBaseHandler();
            $dbh->deleteBook($_POST["id"]);

        }
    }