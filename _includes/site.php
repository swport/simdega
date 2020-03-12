<?php
if(! defined('PAGE_DAN') ) {
    exit;
}

// start session
session_start();

// CONSTANTS
define('BASE_URL', 'http://localhost/simdega/');
define('DEBUG_MODE', true);
define('BASE_PATH', dirname(__DIR__));

require_once __DIR__ . '/functions.php';

// add unique count
if(! isset($_SESSION['count_set']) ) {
    $ini_file = __DIR__ . '/site.ini';
    $count = ini_get_site_count($ini_file);
    
    ini_file_update($ini_file, 'general', 'count', ++$count);
    $_SESSION['count_set'] = 1;
}

if( DEBUG_MODE ) {
    error_reporting(-1);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// database class
class PDO_ABS {
    protected static $instance;
    
    public static function getInstance() {
        if(! static::$instance ) {
            static::$instance = static::getDBH();
        }

        return static::$instance;
    }

    protected static function getDBH() {
        $ini_file = __DIR__ . '/db.ini';
        if (!$settings = parse_ini_file($ini_file, TRUE)) throw new exception('Unable to open ' . $ini_file . '.');

        $settings = $settings['database'];

        $dsn = $settings['driver'].':dbname='.$settings['schema'].';host='.$settings['host'];

        try {
            $dbh = new PDO($dsn, $settings['username'], $settings['password']);
            if( DEBUG_MODE ) {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
        } catch (PDOException $e) {
            throw new \Exception('Connection failed: ' . $e->getMessage());
        }
        return $dbh;
    }
}