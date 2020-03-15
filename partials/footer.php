<?php

if(! defined('PAGE_DAN') ) {
    exit;
}

// get viewership count
$viewership_count = PDO_ABS::getInstance()
    ->query("SELECT meta_value AS views FROM `options` WHERE meta_key = 'site_count' limit 1;")
    ->fetchObject();

?>

</div>
<!-- Footer Section -->
<footer class="site-footer text-white">
    <div class="footer-links-block bg-blue">
        <div class="container position-relative">
            <div class="row py-lg-5 py-sm-4 pt-4 pb-3">
                <div class="col-lg-4 col-12 pb-lg-0 pb-3">
                    <div class="d-flex align-items-center mb-3">
                        <div class="footer-logo rounded-circle">
                            <img src="<?=BASE_URL?>assets/images/logo.png" alt="Simdega College Simdega" class="img-fluid">
                        </div>
                        <div class="footer-logo-name pl-3">
                            <h6 class="text-uppercase">Simdega College Simdega</h6>
                            <p class="font-12">(A Constituent Unit, Ranchi University)</p>
                        </div>
                    </div>

                    <div class="pr-xl-3 d-none d-lg-block">
                        <p>
                            The college was founded with the noble objective of enlightening the first generation learners of this predominantly tribal community who were far away from the mainstream of national development.
                        </p>
                    </div>
                </div>
                <div class="col-lg-5 col-sm-8 col-12">
                    <div class="row">
                        <div class="col-6">
                            <div class="subheading line-after position-relative pb-md-2 mb-md-3 pb-2 mb-2">
                                <h4>Important Links</h4>
                            </div>
                            <ul class="footer-links-list">
                                <li>
                                    <a href="javascript:void(0)">Master Routine</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">Alumni</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">Holiday List</a>
                                </li>
                                <li>
                                    <a href="<?=BASE_URL?>contact-us.php">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <div class="subheading line-after position-relative pb-md-2 mb-md-3 pb-2 mb-2">
                                <h4>Campus</h4>
                            </div>
                            <ul class="footer-links-list">
                                <li>
                                    <a href="<?=BASE_URL?>vocational.php">Fee Structure</a>
                                </li>
                                <!-- <li>
                                    <a href="javascript:void(0)">Department</a>
                                </li> -->
                                <li>
                                    <a href="<?=BASE_URL?>simdega-infrastructure.php">College Infrastructure</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-lg-3 col-sm-4 col-6">
                   
                </div> -->
                <div class="col-lg-3 col-sm-4 col-12">
                    <div class="subheading line-after position-relative pb-md-2 mb-md-3 pb-2 mb-2">
                        <h4>Contact</h4>
                    </div>
                    <ul class="list-top-space-sm">
                        <li>
                            <div class="text-white text-white d-flex align-items-start">
                                <i class="fas fa-map-marker-alt mt-1"></i>
                                <p class="ml-2 footer-address">Simdega College Simdega
                                    College Road,Simdega
                                    835223 Jharkhand</p>
                            </div>
                        </li>
                        <li>
                            <div class="text-white text-white d-flex align-items-center">
                                <i class="fab fa-whatsapp"></i>
                                <p class="ml-2 contact-number">+91 9304620748</p>
                            </div>
                        </li>
                        <li>
                            <div class="text-white text-white d-flex align-items-center">
                                <i class="fas fa-envelope"></i>
                                <p class="ml-2">simdegacollege@gmail.com</p>
                            </div>
                        </li>
                        <li>
                            <div class="text-white text-white d-flex align-items-center">
                                <i class="fas fa-globe"></i>
                                <p class="ml-2"><a href="http://simdegacollegesimdega.com" class="text-white word-break">www.simdegacollegesimdega.com</a></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="copyright-content-block position-relative py-lg-4 py-3">
                <div class="row py-lg-2">
                    <div class="col-md-4 col-12 text-md-left text-center">
                        <?php

                            if(! empty($viewership_count) && null!==$viewership_count->views ) {
                                echo "<p>Visitor Count: <span>{$viewership_count->views}</span></p>";
                            }

                        ?>
                    </div>
                    <div class="col-md-4 col-12 px-md-0 py-md-0 py-2">
                        <div class="text-center">
                            <p>© Copyright 2020. All Rights Reserved by Simdega College.</p>
                        </div>
                    </div>
                    <div class="col-md-4 col-12 text-md-right text-center">
                        <ul class="social-links d-flex justify-content-md-end justify-content-center">
                            <li>
                                <a href="javascript:void(0)" class="text-white" title="Facebook">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="text-white" title="Twitter">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="text-white" title="LinkedIn">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="text-white" title="Instragram">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- End Footer Section -->

<!-- Back To Top Button -->
<div class="back-to-top d-flex align-items-center justify-content-center transition-all-3ms shadow-lg">
    <i class="fas fa-chevron-up text-white"></i>
</div>
<!-- End Back To Top Button -->


<!-- Include Jquery Library -->
<script src="<?=BASE_URL?>assets/js/jquery-3.4.1.min.js"></script>

<!-- Include Popper JS Library -->
<script src="<?=BASE_URL?>assets/js/popper.min.js"></script>

<!-- Include Bootstrap JS Library -->
<script src="<?=BASE_URL?>assets/js/bootstrap.min.js"></script>

<!-- Include Mega Menu JS Library -->
<script src="<?=BASE_URL?>assets/js/hs.megamenu.js"></script>

<!-- Include Owl Carousel JS Library -->
<script src="<?=BASE_URL?>assets/js/owl.carousel.js"></script>

<!-- Include FancyBox JS Library -->
<script src="<?=BASE_URL?>assets/js/jquery.fancybox.min.js"></script>

<!-- Include Masnory JS Library -->
<script src="<?=BASE_URL?>assets/js/masonry.pkgd.min.js"></script>
<script src="<?=BASE_URL?>assets/js/imagesloaded.pkgd.js"></script>

<!-- Include Custom JS file -->
<script src="<?=BASE_URL?>assets/js/custom.js"></script>
</body>

</html>