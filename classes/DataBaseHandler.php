<?php

    class DataBaseHandler {

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

        public function getAllBooks() {
            $query = "SELECT * FROM books";
            $stmt = $this->connect()->prepare($query);

            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

        }

        public function deleteBook($id) {
            $query = "DELETE FROM books WHERE id = :id";
            $stmt = $this->connect()->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            
            if ($stmt->execute()) {
                echo json_encode([true]);
            }
            else {
                echo json_encode([false]);
            }
        }

    }