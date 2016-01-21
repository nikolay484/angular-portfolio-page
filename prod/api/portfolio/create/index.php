<?php 
include("../../class.db.php");

function insert() {
    $dbh->query("INSERT INTO foo(test1, test2, test3) VALUES('112','112','112')");
}