<?php
foreach ($_POST as $key => $value) {
    $key = htmlspecialchars($key);
}
foreach ($_GET as $key => $value) {
    $key = htmlspecialchars($key);
}
?>

<!doctype html>
<html>
<head>
    <title>Minecraft WEB</title>
    <link href="css.css" rel="stylesheet"/>
</head>
<body>