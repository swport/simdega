<?php
    define('PAGE_DAN', 1);
    
    require_once __DIR__ . '/_includes/site.php';

    // if contact form is posted
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['is_ajax'])) {

        header('Content-Type: application/json');

        $errors = [];

        // validate token
        if(isset($_POST['_token']) && hash_equals($_SESSION['token'], $_POST['_token']) ) {
            $values1 = ''; $values2 = '';
            $bindValues = [];

            if(! isset($_POST['name']) || empty( $_POST['name'] ) ) {
                $errors['name'] = "Field is required to fill";
            } else if( strlen($_POST['name']) > 191 ) {
                $errors['name'] = "Field cannot exceed 190 letters";
            }

            if(! isset($_POST['email']) || empty( $_POST['email'] ) ) {
                $errors['email'] = "Field is required to fill";
            } else if(! filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = "Must be a valid email";
            } else if( strlen($_POST['email']) > 191 ) {
                $errors['email'] = "Field cannot exceed 190 letters";
            }

            if(! isset($_POST['contact']) || empty( $_POST['contact'] ) ) {
                $errors['contact'] = "Field is required to fill";
            } else if(! preg_match('/^[0-9]{8,10}+$/', $_POST['contact']) ) {
                $errors['contact'] = "Must be a valid contact number";
            }

            if(! empty($_POST['comment']) && strlen($_POST['comment']) >1900 ) {
                $errors['comment'] = "Field cannot exceed 1900 letters";
            }

            if(! empty($errors) ) {
                echo json_encode(['status' => false, 'data' => $errors]); exit;
            }

            $values1 .= 'name,'; $values2 .= ':name,';
            $post_name = trim($_POST['name']);
            $bindValues[] = [":name", $post_name, PDO::PARAM_STR, 191];

            $values1 .= 'email,'; $values2 .= ':email,';
            $post_email = trim($_POST['email']);
            $bindValues[] = [":email", $post_email, PDO::PARAM_STR, 191];

            $values1 .= 'contact,'; $values2 .= ':contact,';
            $post_contact = trim($_POST['contact']);
            $bindValues[] = [":contact", $post_contact, PDO::PARAM_STR, 191];

            if (! empty($_POST['comment']) ) {
                $values1 .= 'comment'; $values2 .= ':comment';
                $post_comment = trim($_POST['comment']);
                $bindValues[] = [":comment", $post_comment, PDO::PARAM_STR, 191];
            }

            if( empty($bindValues) ) {
                echo json_encode(['status' => false, 'data' => $errors]); exit;
            }

            $values1 = rtrim($values1, ',');
            $values2 = rtrim($values2, ',');

            $stmt = PDO_ABS::getInstance()
                ->prepare("INSERT INTO `contacts`($values1,created_at) VALUES($values2,'".date('Y-m-d H:i:s')."')");

            if( $stmt ) {
                // bind values
                foreach ( $bindValues as $bindValue ) {
                    $stmt->bindParam(...$bindValue);
                }

                if( $stmt->execute() ) {
                    echo json_encode(['status' => true, 'data' => $errors]); exit;
                }
            }
        }

        echo json_encode(['status' => false, 'data' => $errors]); exit;
    }

    // create a fresh csrf token
    if (empty($_SESSION['token'])) {
        if (function_exists('mcrypt_create_iv')) {
            $_SESSION['token'] = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));
        } else {
            $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
        }
    }

    $_token = $_SESSION['token'];

    require_once __DIR__ . '/partials/header.php';
?>

<style>
    .fa.tick {
        color: #fff;
        margin-right: 8px;
        font-size: 22px;
        padding: 0.6rem;
        border-radius: 50%;
    }
    .fa.tick.success {
        background-color: green;
    }
    .fa.tick.danger {
        background-color: red;
    }
    #responseModalBox .modal-dialog { 
        max-width: 100%;
        display: table; 
    }
</style>

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
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" id="contact-form" class="pt-md-4 pt-3">
                        <input type="hidden" name="_token" value="<?=$_token?>">
                        <div class="row">
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="name">Full Name</label>
                                    <input type="text" class="form-control" name="name" id="name" aria-describedby="fullName" required>
                                </div>
                            </div>
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="email">Email Address</label>
                                    <input type="email" class="form-control" name="email" id="" aria-describedby="emailAddress" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="contact">Contact Number <small>(8-10 digits mobile no.)</small></label>
                                    <input type="text" class="form-control" name="contact" id="contact" aria-describedby="contactNumber" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="comment">Your Comments</label>
                                    <textarea class="form-control resize-none mh-150" name="comment" id="comment" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="pt-md-4 pt-3">
                            <!-- <button type="submit" class="btn btn-lg global-radius btn-blue btn-hvr-shutter">Send Message</button> -->
                            <button type="submit" class="btn btn-lg global-radius btn-blue btn-hvr-shutter">Send Message</button>
                            <button type="reset" class="btn btn-lg global-radius btn-white btn-hvr-shutter ml-3">Reset</button>
                        </div>
                        <p class="success-msg text-success pt-3" style="display: none">Thank your for your message.</p>
                        <p class="fail-msg text-danger pt-3" style="display: none">Something went wrong. Please try again.</p>
                        <p class="fail-errors text-danger pt-3" style="display: none"></p>
                    </form>

                    <!-- response modal -->
                    <div class="modal fade" id="responseModalBox" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!-- response modal -->

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