<?php

require_once './vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('./views');
$twig = new \Twig\Environment($loader);

$user = [
    'name' => '<p>steve smith</p>',
    'age' => 26,
    'company-name' => 'JAES Made It'
];

echo $twig->render('index.html', compact('user'));