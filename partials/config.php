<?php
if(! defined('PAGE_DAN') ) {
    exit;
}

// CONSTANTS
define('BASE_URL', 'http://localhost/simdega/');
define('DEBUG_MODE', true);

function get_current_url() {
    return sprintf(
        "%s://%s%s",
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
        $_SERVER['SERVER_NAME'],
        $_SERVER['REQUEST_URI']
    );
};

if( DEBUG_MODE ) {
    error_reporting(-1);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}