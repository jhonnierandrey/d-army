<?php

require_once __DIR__ . '/../config.php';

$user = [
    'name' => '<p>steve smith</p>',
    'age' => 26,
    'company-name' => 'JAES Made It'
];

$online = true;

echo $twig->render('index.html', compact('user', 'online'));