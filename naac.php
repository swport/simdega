<?php
    define('PAGE_DAN', 1);

    include(__DIR__ . '/partials/header.php');
?>

<!-- Banner Section -->
<section class="inner-banner-section position-relative">
    <div class="container">
        <div class="inner-banner d-flex align-items-center justify-content-center">
            <div class="heading text-center">
                <h2>National Assessment and Accreditation Council (NAAC)</h2>
            </div>
        </div>
    </div>
</section>
<!-- End Banner Section -->

<!-- Naac content -->
<section class="naac-content">
    <div class="container">
        <div class="pt-5 text-center">
            <h5>Click here for view Self Study Report:</h5>
        </div>
        <a class="doc-view mx-auto my-sm-5 my-4" data-fancybox data-type="iframe" data-src="/assets/pdf/ssr.pdf" href="javascript:;">
        </a>

        <div class="pt-sm-5 pt-4 blue-gradient-border position-relative text-center">
            <h5>View some important Notices:</h5>
        </div>
        <div class="row  mx-500 mx-auto">
            <div class="col-sm-6 col-12">
                <a class="image-view my-4" data-fancybox="images" href="/assets/images/naac-doc-1.jpg">
                </a>
            </div>
            <div class="col-sm-6 col-12">
                <a class="image-view my-4" data-fancybox="images" href="/assets/images/naac-doc-2.jpg">
                </a>
            </div>
        </div>
    </div>
</section>
<!-- End Naac content -->
<?php
    include(__DIR__ . '/partials/footer.php');
?>