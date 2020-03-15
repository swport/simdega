<?php

if (! function_exists('get_current_url')  ) {
    function get_current_url() {
        return sprintf(
            "%s://%s%s",
            isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
            $_SERVER['SERVER_NAME'],
            $_SERVER['REQUEST_URI']
        );
    };
}


if(! function_exists('ini_file_update')  ) {
    function ini_file_update($config_file, $section, $key, $value) {
        $config_data = parse_ini_file($config_file, true);
        $config_data[$section][$key] = $value;
        $new_content = '';
        foreach ($config_data as $section => $section_content) {
            $section_content = array_map(function($value, $key) {
                return "$key=$value";
            }, array_values($section_content), array_keys($section_content));
            $section_content = implode("\n", $section_content);
            $new_content .= "[$section]\n$section_content\n";
        }
        file_put_contents($config_file, $new_content);
    }
}

if(! function_exists('ini_get_site_count')  ) {
    function ini_get_site_count($ini_file_path, $value = 'count') {
        $settings = parse_ini_file($ini_file_path, true);

        return $settings['general'][$value];
    }   
}