<?php
    define('PAGE_DAN', 1);

    include(__DIR__ . '/partials/header.php');
?>

<!-- Banner Section -->
<section class="inner-banner-section position-relative">
    <div class="container">
        <div class="inner-banner d-flex align-items-center justify-content-center">
            <div class="heading text-center">
                <h2>Contact Us</h2>
            </div>
        </div>
    </div>
</section>
<!-- End Banner Section -->

<!-- Contact Us content -->
<section class="contact-us-wrapper py-lg-5 pt-5">
    <div class="container py-lg-4">
        <div class="row">
            <div class="col-lg-7 col-12 pr-lg-5">
                <div>
                    <div class="heading">
                        <h2 class="font-weight-semibold">Send us an e-mail</span></h2>
                    </div>
                    <form action="" method="post" id="contact" class="pt-md-4 pt-3">
                        <div class="row">
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="">Full Name</label>
                                    <input type="text" class="form-control" name="" id="" aria-describedby="fullName">
                                </div>
                            </div>
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="">Email Address</label>
                                    <input type="email" class="form-control" name="" id="" aria-describedby="emailAddress">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Contact Number</label>
                                    <input type="text" class="form-control" name="" id="" aria-describedby="contactNumber">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Your Comments</label>
                                    <textarea class="form-control resize-none mh-150" name="" id="" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="pt-md-4 pt-3">
                            <!-- <button type="submit" class="btn btn-lg global-radius btn-blue btn-hvr-shutter">Send Message</button> -->
                            <a href="javascript:void(0)" id="send" class="btn btn-lg global-radius btn-blue btn-hvr-shutter">Send Message</a>
                            <button type="reset" class="btn btn-lg global-radius btn-white btn-hvr-shutter ml-3">Reset</button>
                        </div>
                        <p class="success-msg text-success pt-3" style="display: none">Thank your for your message.</p>
                    </form>

                </div>
                <div class="pt-lg-5 pt-4 aos-init" data-aos="fade-zoom-in" data-aos-easing="ease-in" data-aos-delay="100" data-aos-offset="0">
                    <div class="heading">
                        <h2 class="font-weight-semibold">Contact Us</h2>
                    </div>
                    <div class="row pt-md-4 pt-3">
                        <div class="col-12">
                            <div class="subheading line-after position-relative pb-md-3 pb-2">
                                <h4 class="font-weight-normal">Address Details</h4>
                            </div>
                            <ul class="contact-info pt-1">
                                <li>
                                    <div class="d-flex text-gray py-2">
                                        <i class="fas fa-map-marker-alt mt-1"></i>
                                        <p class="d-inline-block pl-3">Simdega College Simdega
                                            College Road,Simdega
                                            835223 Jharkhand</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex text-gray py-2">
                                        <i class="fab fa-whatsapp mt-1"></i>
                                        <p class="d-inline-block pl-3">+91 9304620748</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex text-gray py-2">
                                        <i class="fas fa-envelope mt-1"></i>
                                        <p class="d-inline-block pl-3 contact-number">simdegacollege@gmail.com</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex text-gray py-2">
                                        <i class="fas fa-map-marker-alt mt-1"></i>
                                        <p class="d-inline-block pl-3">www.simdegacollegesimdega.com</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-12 pt-lg-0 pt-4 px-lg-3 px-0">
                <section class="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.391806092419!2d84.49329075102335!3d22.601839637518793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398a9c6967fa6313%3A0x9b4dfae68857f6b3!2sSimdega%20College%20Simdega!5e0!3m2!1sen!2sin!4v1581702464791!5m2!1sen!2sin" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                </section>
            </div>
        </div>
    </div>
</section>
<!-- End Contact Us content -->

</div>

<?php
    include(__DIR__ . '/partials/footer.php');
?>