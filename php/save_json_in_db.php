 <?php
 
ini_set('display_errors', 1);

ini_set('display_startup_errors', 1);

error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'db_connect.php';

mysqli_set_charset($db, "utf8");



$Input_data = mysqli_real_escape_string($db,  $_POST["Input_data"] );

$query    = "INSERT INTO `JSON_Container` (`ID`, `JSON_File`) VALUES (NULL, '$Input_data');";

mysqli_query($db,$query);

$Objekt_ID_Return = mysqli_insert_id($db);
mysqli_close($db);




$Return_Object = array(

 "Status" => "ok!",
 
 "ID_des_neuen_Datensatzes" => $Objekt_ID_Return,
 
  "xxx" => array()

);


echo json_encode($Return_Object);

?>