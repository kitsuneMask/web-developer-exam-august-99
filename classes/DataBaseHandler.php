<?php

    class DatabaseHandler {

        private $host = "localhost";
        private $name = "book_management_system";
        private $username = "root";
        private $password = "unlimitedcreation14";

        protected function connect() {
            try {
                $pdo = new PDO("mysql:host=".$this->host.";dbname=".$this->name, $this->username, $this->password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $pdo;
            }
            catch (PDOException $e) {
                die("Connection failed: ".$e->getMessage());
            }
        }

    }