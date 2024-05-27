<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['sub']);
    $message = htmlspecialchars($_POST['msg']);
    
    // Email configuration
    $to = "manastom670@gmail.com"; // Replace with your email address
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email content
    $email_content = "<html><body>";
    $email_content .= "<h2>New Contact Form Submission</h2>";
    $email_content .= "<p><strong>Name:</strong> $name</p>";
    $email_content .= "<p><strong>Phone:</strong> $phone</p>";
    $email_content .= "<p><strong>Email:</strong> $email</p>";
    $email_content .= "<p><strong>Subject:</strong> $subject</p>";
    $email_content .= "<p><strong>Message:</strong><br>$message</p>";
    $email_content .= "</body></html>";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Email sent successfully.";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
