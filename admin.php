<?php

// start session
session_start();

define('PAGE_DAN', 1); // ref

// if logging out
if( isset($_GET['logout']) ) {
    session_destroy();

    header("Location: admin.php"); exit;
}

// if there's a login attempt
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ! isset($_SESSION['auth_user'])) {
    // validate request
    if(isset($_POST['_token']) && hash_equals($_SESSION['token'], $_POST['_token']) ) {
        // it's a valid request; make a login attempt
        if( $_POST['password'] === 'pDt$6QEhpfgJ%cE$WBk' ) {
            $_SESSION['auth_user'] = 'tpk$fQ%c5V&b';

            header("Location: admin.php"); exit;
        } else {
            $_message = "Invalid Credentials";
        }
    } else {
        $_message = "Invalid Request";
    }
}

// create a fresh token for login
if (empty($_SESSION['token'])) {
    if (function_exists('mcrypt_create_iv')) {
        $_SESSION['token'] = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));
    } else {
        $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
    }
}

$_token = $_SESSION['token'];

// hreader view
include(__DIR__ . '/partials/header.php');

?>

<?php if( ! isset($_SESSION['auth_user']) ): ?>

<section class="inner-banner-section position-relative">
    <div class="container">
        <div class="d-flex align-items-center justify-content-center mt-5 mb-5">
            <div class="heading text-center">
                <h2>Admin Login</h2>
                <?php if(isset($_message)): ?>
                    <div class="alert alert-danger" role="alert">
                        <?php echo $_message; ?>
                    </div>
                <?php endif;?>
                <form action="" method="POST" class="mt-4">
                    <input type="hidden" name="_token" value="<?=$_token?>">
                    <div class="row">
                        <label for="username" class="col-md-3 col-form-label text-left">Login</label>
                        <div class="col-md-9">
                            <input id="username" type="text" class="form-control" autocomplete="off" autofocus required>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <label for="password" class="col-md-3 col-form-label text-left">Password</label>
                        <div class="col-md-9">
                            <input id="password" type="password" name="password" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3"></div>
                        <div class="col-md-9 text-left">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<?php else: ?>

<section class="inner-banner-section position-relative">
    <div class="container mt-3 mb-3">
        <div class="card">
            <div class="card-header">
                <span>Simdega College Admin</span>
                <div class="float-right">
                    <a href="?logout=1">Logout</a>
                </div>
            </div>
            <div class="card-body">

            </div>
        </div>
    </div>
</section>
<?php endif;?>

<?php
    include(__DIR__ . '/partials/footer.php');
?>