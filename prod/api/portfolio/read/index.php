<?php 
include("../../class.db.php");

if(isset($_POST['data']['getall']) == 1) { 
    getall($dbh);
}

function getall($dbh) {
$stmt = $dbh->query("SELECT * FROM projects");
    while($row = $stmt->fetch()) {
        $json[] = $row;
    } 
    echo json_encode($json);
}



