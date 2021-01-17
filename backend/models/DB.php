<?php

namespace Models;

use PDO;

class DB
{
    private static PDO|null $instance = null;

    public static function getInstance(): PDO
    {
        if (!is_null(self::$instance)) {
            return self::$instance;
        }

        $config = include(dirname(__DIR__) . '/config/database.php');
        $dataSource = strtr("mysql:host=@host;dbname=@name;charset=utf8mb4", array(
            '@host' => $config['host'],
            '@name' => $config['name']
        ));

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];

        self::$instance = new PDO($dataSource, $config['username'], $config['password'], $options);
        return self::$instance;
    }
}
