<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP | Gettin started</title>
</head>
<body>
    <?php
        $name = $_GET['name'];
        echo("<h1>Hello " . $name . "! </h1>");
    ?>
</body>
</html>