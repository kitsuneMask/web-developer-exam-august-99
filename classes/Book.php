<?php

    class Book extends DataBaseHandler {
        private $title;
        private $isbn;
        private $author;
        private $publisher;
        private $yearPublished;
        private $category;

        public function __construct(
            $title,
            $isbn,
            $author,
            $publisher,
            $yearPublished,
            $category
        ) {
            $this->title = $title;
            $this->isbn = $isbn;
            $this->author = $author;
            $this->publisher = $publisher;
            $this->yearPublished = $yearPublished;
            $this->category = $category;
        }

        public function addBook() {
            $query = "INSERT INTO books (title, isbn, author, publisher, year_published, category) VALUES (:title, :isbn, :author, :publisher, :year_published, :category)";
            $connect = $this->connect();
            $stmt = $connect->prepare($query);
            $stmt->bindParam(":title",$this->title);
            $stmt->bindParam(":isbn",$this->isbn);
            $stmt->bindParam(":author",$this->author);
            $stmt->bindParam(":publisher",$this->publisher);
            $stmt->bindParam(":year_published",$this->yearPublished);
            $stmt->bindParam(":category",$this->category);
            return [$stmt->execute(), $connect->lastInsertId()];
        }

    }

