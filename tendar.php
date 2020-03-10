<?php

    define('PAGE_DAN', 1);

    include(__DIR__ . '/partials/header.php');

?>

<!-- Banner Section -->
<section class="inner-banner-section position-relative">
    <div class="container">
        <div class="inner-banner d-flex align-items-center justify-content-center">
            <div class="heading text-center">
                <h2>Tender Notice</h2>
            </div>
        </div>
    </div>
</section>
<!-- End Banner Section -->

<!-- Naac content -->
<section class="naac-content">
    <div class="container">
        <div class="pt-5 text-center">
            <h5>Click here for view Tender:</h5>
        </div>
        <!-- <a class="doc-view mx-auto my-4" data-fancybox data-type="iframe" data-src="assets/pdf/ssr.pdf" href="javascript:;">
                </a> -->
        <a class="image-view my-5 mx-auto" data-fancybox="images" href="<?=$base_url?>assets/images/tender.jpeg">
        </a>
    </div>
</section>
<!-- End Naac content -->

<?php
    include(__DIR__ . '/partials/footer.php');
?>