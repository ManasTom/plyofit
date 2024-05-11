<?php
$to = "manas.illforddigital@gmail.com";
$subject = "New Review Submitted";
$message = "A new review has been submitted.";
$headers = "From: manastom670@gmail.com" . "\r\n" .
    "Reply-To: manastom670@gmail.com" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

// Send email
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo "Email notification sent successfully.";
} else {
    echo "Failed to send email notification.";
}
?>
