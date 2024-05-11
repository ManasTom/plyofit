<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Set recipient email address
    $to = "manastom670@gmail.com";
    
    // Set email subject
    $subject = "New Review Submission from $fullName";
    
    // Construct email message
    $email_message = "You have a new review submission from $fullName to be posted to Plyofit website\n";
    $email_message .= "Click the link to review: https://manastom.github.io/plyofit/faq.html\n";
    
    // Set headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Attempt to send email
    if (mail($to, $subject, $email_message, $headers)) {
        echo "Your review has been submitted successfully!";
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    echo "Access denied";
}
?>
