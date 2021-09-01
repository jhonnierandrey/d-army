<?php

require_once __DIR__ . '/vendor/autoload.php';

define('APP_ROOT', __DIR__);

$loader = new \Twig\Loader\FilesystemLoader(APP_ROOT . '/views');
$twig = new \Twig\Environment($loader);