<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $fullName = $_POST['fullName'];
    $contactNumber = $_POST['contactNumber'];
    $email = $_POST['email'];
    $place = $_POST['place'];
    $dob = $_POST['dob'];
    $workExperience = $_POST['workExperience'];
    $certifiedTrainer = $_POST['certifiedTrainer'];
    $certificationName = $_POST['certificationName'];
    $relocate = $_POST['relocate'];
    $salaryExpectations = $_POST['salaryExpectations'];
    $immediateJoin = $_POST['immediateJoin'];

    // Get the file details
    $resumeName = $_FILES['resume']['name'];
    $resumeTmpName = $_FILES['resume']['tmp_name'];

    // Define email content
    $to = "manastom670@gmail.com";
    $subject = "Application for ".$_POST['vacancyName'];
    $message = "Name: ".$fullName."\n".
               "Contact Number: ".$contactNumber."\n".
               "Email: ".$email."\n".
               "Place: ".$place."\n".
               "Date of Birth: ".$dob."\n".
               "Work Experience: ".$workExperience."\n".
               "Certified Trainer: ".$certifiedTrainer."\n".
               "Certification Name: ".$certificationName."\n".
               "Willing to relocate: ".$relocate."\n".
               "Salary Expectations: ".$salaryExpectations."\n".
               "Immediate Joining: ".$immediateJoin."\n".
               "Applied for: ".$_POST['vacancyName']."\n";

    // Set headers
    $headers = "From: ".$email;
    
    // Attach resume
    $file = fopen($resumeTmpName,'rb');
    $data = fread($file,filesize($resumeTmpName));
    fclose($file);
    $content = chunk_split(base64_encode($data));
    $uid = md5(uniqid(time()));
    $name = basename($resumeName);

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";
    $headers .= "This is a multi-part message in MIME format.\r\n";
    $headers .= "--".$uid."\r\n";
    $headers .= "Content-type:text/plain; charset=iso-8859-1\r\n";
    $headers .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $headers .= $message."\r\n\r\n";
    $headers .= "--".$uid."\r\n";
    $headers .= "Content-Type: application/octet-stream; name=\"".$resumeName."\"\r\n";
    $headers .= "Content-Transfer-Encoding: base64\r\n";
    $headers .= "Content-Disposition: attachment; filename=\"".$resumeName."\"\r\n\r\n";
    $headers .= $content."\r\n\r\n";

    // Send the email
    if (mail($to, $subject, "", $headers)) {
        echo "Your application has been submitted successfully.";
    } else {
        echo "Failed to submit the application. Please try again later.";
    }
}
?>
