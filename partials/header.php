<?php if(! defined('PAGE_DAN') ) {
        exit;
    }

// helpers vars
$base_url = 'http://localhost/simdega/';

$current_url = sprintf(
    "%s://%s%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME'],
    $_SERVER['REQUEST_URI']
  );
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="description" content="Simdega College">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Simdega College</title>
    <link rel="icon" href="<?=$base_url?>assets/images/favicon.ico">

    <!-- Include Google Roboto Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap" rel="stylesheet">

    <!-- Inlucde Boostrap CSS Library -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/bootstrap.min.css">

    <!-- Inlucde Mega Menus CSS Library -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/hs.megamenu.css">

    <!-- Inlucde Owl Carousel CSS Library -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="<?=$base_url?>assets/css/owl.theme.default.min.css">

    <!-- Include Font Awesome CSS Library -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/all.css">

    <!-- Inlucde FancyBox CSS File -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/jquery.fancybox.min.css">

    <!-- Include Animate CSS Library -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/animate.min.css">

    <!-- Inlucde Custom Animation CSS File -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/animation.css">

    <!-- Inlucde Custom CSS File -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/style.css">

    <!-- Inlucde Custom Responsive CSS File -->
    <link rel="stylesheet" href="<?=$base_url?>assets/css/responsive.css">

</head>

<body>

    <div class="main-wrapper">
        <!-- Website Header Section -->
        <header id="header" class="site-header u-header u-header--abs-top-lg u-header--bg-transparent u-header--show-hide-lg" data-header-fix-moment="500" data-header-fix-effect="slide">
            <div class="u-header__section">
                <!-- Topbar -->
                <!-- End Topbar -->
                <div id="logoAndNav" class="container px-sm-3 px-2">
                    <!-- Nav -->
                    <nav class="js-mega-menu js-mega-menu-basic navbar navbar-expand-lg u-header__navbar px-0 hs-menu-initialized hs-menu-horizontal">
                        <!-- Navigation -->
                        <!-- Logo -->
                        <div class="d-flex align-items-center">
                            <a class="navbar-brand u-header__navbar-brand u-header__navbar-brand-center p-0" href="index.html" aria-label="Front">
                                <img src="<?=$base_url?>assets/images/logo.png" alt="Simdega College Simdega">
                            </a>
                            <div class="logo-name">
                                <h1 class="text-uppercase">Simdega College Simdega</h1>
                                <p>(A Constituent Unit, Ranchi University)</p>
                            </div>
                        </div>

                        <!-- End Logo -->
                        <div class="d-flex align-items-center flex-row-reverse">
                            <button class="navbar-toggler shadow-none rounded-0 pt-0 px-0" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">
                                <span class="navbar-toggler-icon transition-all-3ms">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                        </div>
                        <div id="navBar" class="collapse navbar-collapse u-header__navbar-collapse justify-content-end">
                            <ul class="navbar-nav u-header__navbar-nav">

                                <li class="nav-item u-header__nav-item u-header__nav-last-item"><a href="index.html" class="nav-link u-header__nav-link">Home</a></li>

                                <!-- About -->
                                <li class="nav-item hs-has-sub-menu u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                                    <a id="blogMegaMenu" class="nav-link u-header__nav-link" href="#javascript:void(0)">About</a>
                                    <span class="u-header__nav-link-toggle u-header__nav-link-icon" aria-haspopup="true" aria-expanded="false" aria-labelledby="aboutSubMenu"></span>
                                    <!-- About - Submenu -->
                                    <ul id="aboutSubMenu" class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer animated fadeOut" aria-labelledby="blogMegaMenu" style="min-width: 230px; display: none;">
                                        <li><a class="nav-link u-header__sub-menu-nav-link" href="about-us.html#history">History</a></li>
                                        <li><a class="nav-link u-header__sub-menu-nav-link" href="about-us.html#objective">Objective</a></li>
                                        <li><a class="nav-link u-header__sub-menu-nav-link" href="about-us.html#vision">Vision &amp; Mission</a></li>
                                        <li><a class="nav-link u-header__sub-menu-nav-link" href="contact-us.html">Contact Us</a></li>
                                    </ul>
                                    <!-- End Submenu -->
                                </li>
                                <!-- End Company -->

                                <!-- Gallery -->
                                <li class="nav-item hs-has-sub-menu u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                                    <a id="blogMegaMenu" class="nav-link u-header__nav-link" href="javascript:void(0)">Gallery</a>
                                    <span class="u-header__nav-link-toggle u-header__nav-link-icon" aria-haspopup="true" aria-expanded="false" aria-labelledby="gallerySubMenu"></span>
                                    <!-- Gallery - Submenu -->
                                    <ul id="gallerySubMenu" class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer animated fadeOut" aria-labelledby="blogMegaMenu" style="min-width: 230px; display: none;">
                                        <li><a href="javascript:void(0)" class="nav-link u-header__sub-menu-nav-link">Events</a> </li>
                                        <li><a href="javascript:void(0)" class="nav-link u-header__sub-menu-nav-link">Infrastructure</a> </li>
                                    </ul>
                                    <!-- End Submenu -->
                                </li>
                                <!-- End Gallery -->

                                <!-- Programme -->
                                <li class="nav-item hs-has-sub-menu u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                                    <a id="blogMegaMenu" class="nav-link u-header__nav-link" href="javascript:void(0)">Programme</a>
                                    <span class="u-header__nav-link-toggle u-header__nav-link-icon" aria-haspopup="true" aria-expanded="false" aria-labelledby="programmeSubMenu"></span>
                                    <!-- Programme - Submenu -->
                                    <ul id="programmeSubMenu" class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer animated fadeOut" aria-labelledby="blogMegaMenu" style="min-width: 230px; display: none;">
                                        <li><a href="javascript:void(0)" class="nav-link u-header__sub-menu-nav-link">Vocational</a> </li>
                                        <li><a href="javascript:void(0)" class="nav-link u-header__sub-menu-nav-link">Non Vocational</a> </li>
                                    </ul>
                                    <!-- End Submenu -->
                                </li>
                                <!-- End Programme -->

                                <!-- College Staff -->
                                <li class="nav-item hs-has-sub-menu u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                                    <a id="blogMegaMenu" class="nav-link u-header__nav-link" href="javascript:void(0)">College Staff</a>
                                    <span class="u-header__nav-link-toggle u-header__nav-link-icon" aria-haspopup="true" aria-expanded="false" aria-labelledby="staffSubMenu"></span>
                                    <!-- College Staff  - Submenu -->
                                    <ul id="staffSubMenu" class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer animated fadeOut" aria-labelledby="blogMegaMenu" style="min-width: 230px; display: none;">
                                        <li><a href="teaching.html" class="nav-link u-header__sub-menu-nav-link">Teaching</a> </li>
                                        <li><a href="non-teaching.html" class="nav-link u-header__sub-menu-nav-link">Non Teaching</a> </li>
                                    </ul>
                                    <!-- End Submenu -->
                                </li>
                                <!-- End College Staff  -->

                                <!-- Link -->
                                <li class="nav-item u-header__nav-item u-header__nav-last-item"><a href="naac.html" class="nav-link u-header__nav-link">NAAC</a></li>

                                <li class="nav-item u-header__nav-item u-header__nav-last-item"><a href="tendar.html" class="nav-link u-header__nav-link" target="_blank">Tender</a></li>

                                <!-- End link -->
                            </ul>
                        </div>
                        <!-- End Navigation -->
                    </nav>
                    <!-- End Nav -->
                </div>
            </div>
        </header>
        <!-- End Website Header Section -->