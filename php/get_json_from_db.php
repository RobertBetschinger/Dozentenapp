<?php
 
ini_set('display_errors', 1);

ini_set('display_startup_errors', 1);

error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'db_connect.php';

mysqli_set_charset($db, "utf8");

$query_JSON_aus_DB    = "SELECT * FROM `JSON_Container` ORDER BY `JSON_Container`.`ID` DESC LIMIT 1;";


$JSON_aus_DB = array();

if ($result = $db->query( $query_JSON_aus_DB )) {



    while($row = $result->fetch_array(MYSQLI_ASSOC)) {

            $JSON_aus_DB[] = $row;

    }

    // echo json_encode($Nachrichten_Array);

}



$result->close();


$Return_Object = array(

 "JSON_from_Server" => $JSON_aus_DB,
 
  "xxx" => array()

);




echo json_encode($Return_Object);

?>