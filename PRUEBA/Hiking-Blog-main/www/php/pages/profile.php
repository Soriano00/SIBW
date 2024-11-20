<?php
    include("php/model/bd.php");
    session_start();

    $email = $_SESSION["email"][0];
    $user = getUser($email);
    
    echo $twig->render('profile.html',[
        'user' => $user,
        'role' => $_SESSION["email"][1]
    ] );
?>
