<?php
    define('PAGE_DAN', 1);

    require_once __DIR__ . '/_includes/site.php';

    require_once __DIR__ . '/partials/header.php';
?>
            
<!-- Banner Section -->
<section class="inner-banner-section position-relative">
    <div class="container">
        <div class="inner-banner d-flex align-items-center justify-content-center">
            <div class="heading text-center">
                <h2>Non-Vocational Courses</h2>
            </div>
        </div>
    </div>
</section>
<!-- End Banner Section -->

<!-- Non-vocational content -->
<section class="non-vocational-content">
    <div class="container">
        <div class="py-md-5 py-4 ">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">SL No</th>
                        <th scope="col">Name Of Course</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>01</strong>
                        </td>
                        <td>
                            <a href="<?=BASE_URL?>bachelors-of-arts.php">Bachelors in Arts</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>02</strong>
                        </td>
                        <td>
                            <a href="<?=BASE_URL?>bachelors-of-science.php">Bachelors in Science</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>03</strong>
                        </td>
                        <td>
                            <a href="<?=BASE_URL?>bachelors-of-commerce.php">Bachelors in Commerce</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</section>
<!-- End Non-vocational content -->

<?php
    include(__DIR__ . '/partials/footer.php');
?>
  