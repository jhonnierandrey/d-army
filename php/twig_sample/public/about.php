<?php

require_once __DIR__ . '/../config.php';

$people = [
    'Jean',
    'Angie',
    'Ben',
    'Carl'
];

echo $twig->render('about.html', compact('people'));