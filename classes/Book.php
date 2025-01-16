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
    }