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
                <h2>Non-Vocational Courses >> Bachelors Of Commerce</h2>
            </div>
        </div>
    </div>
</section>
<!-- End Banner Section -->

<!-- Non Vocational B.Com content -->
<section class="b-com-content">
    <div class="container">
        <div class="py-md-5 py-4 ">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">SL No</th>
                        <th scope="col">Name Of Course</th>
                        <th scope="col">Eligibility</th>
                        <th scope="col">Duration</th>
                        <!-- <th scope="col">Syllabus</th> -->
                        <th scope="col">Fee(Annual)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>01</strong>
                        </td>
                        <td>Bachelors in Account</td>
                        <td>I A/I Sc/I Com(10+2) (With Minimum 45%)	</td>
                        <td>3 Years	</td>
                        <td>1065/- (Exam and Reg excluded)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>
<!-- End Non Vocational B.Com content -->



<?php
    include(__DIR__ . '/partials/footer.php');
?>