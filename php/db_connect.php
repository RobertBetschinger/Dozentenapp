<?php
$db = mysqli_connect("localhost", "c0db1", "ipXwD!H6fbA", "c0gregor_db1");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_set_charset($db, "utf8");
// mysqli_set_charset($this->conn,"utf8");

?>