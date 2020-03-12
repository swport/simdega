<?php

define('PAGE_DAN', 1); // ref

require_once __DIR__ . '/_includes/site.php';

// if logging out
if( isset($_GET['logout']) ) {
    // session_destroy();
    unset($_SESSION['auth_user']);

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
require_once __DIR__ . '/partials/header.php';

// echo "<pre>";
// var_dump( PDO_ABS::getInstance()->query("SELECT * FROM `contacts` ORDER BY `created_at` DESC LIMIT 10")->fetchAll() ); die();

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
                <h4>Recent Messages</h4>

                <table class="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">From</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Added On</th>
                            <th scope="col">Message</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                <?php
                    $thisPage = isset($_GET['page']) && $_GET['page']>0 ? (int)$_GET['page']:'1';
                    $nextPage = 1;
                    $prevPage = 1;

                    $limit = 10;
                    $offset = ($thisPage * $limit) - $limit;

                    $total_rows = 0;

                    $contacts = PDO_ABS::getInstance()
                        ->query("SELECT * FROM `contacts` ORDER BY `created_at` DESC LIMIT $offset,$limit");

                    if( $contacts ) {
                        $total_rows = $contacts->rowCount();

                        if($total_rows ===10) {
                            $nextPage = $thisPage + 1;
                        } else {
                            $nextPage = false;
                        }

                        if(!$nextPage || $nextPage > 2) {
                            $prevPage = $thisPage - 1;
                        }

                        $key = 0;
                        while( $row = $contacts->fetchObject() ) {?>
                            <tr>
                                <th><?php echo ++$key?></th>
                                <th><?php echo $row->name ?> < <?php echo $row->email ?> ></th>
                                <th><?php echo $row->contact ?></th>
                                <th><?php echo date('d M, Y (h:i A)', strtotime($row->created_at)) ?></th>
                                <th><?php
                                    $comment = $row->comment;
                                    if( $comment ) {
                                        echo (strlen($comment) > 22) ? substr($comment,0,22).'...' : $comment;
                                    }
                                ?></th>
                                <th>
                                    <?php if($comment): ?>
                                        <button type="button" class="btn" data-toggle="modal" data-target="#viewFullComment<?=$key?>">
                                            <i class="fa fa-eye" aria-hidden="true"></i> view message
                                        </button>

                                        <div class="modal fade" id="viewFullComment<?=$key?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">Message</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <?php echo $comment ?>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endif;?>

                                </th>
                            </tr>
                        <?php }
                    }
                ?>
                    </tbody>
                </table>

                <?php if(!$nextPage || $nextPage>2): ?>
                <div class="float-left">
                    <a class="btn btn-primary" href="?page=<?=$prevPage?>"><< Prev</a>
                </div>
                <?php endif;?>

                <?php if($nextPage):?>
                <div class="float-right">
                    <a class="btn btn-primary" href="?page=<?=$nextPage?>">Next >></a>
                </div>
                <?php endif;?>
            </div>
        </div>
    </div>
</section>
<?php endif;?>

<?php
    include(__DIR__ . '/partials/footer.php');
?>