


// ********************************************************************************************
// Script for submitting review popup
// ********************************************************************************************

var FullName, Email, Message;

function readReviewForm() {
    FullName = document.getElementById("fullName").value;
    Email = document.getElementById("email").value;
    Message = document.getElementById("message").value;
    console.log(FullName, Email, Message);
}

function clearReviewForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

document.getElementById("submitReview").onclick = function(event) {
    event.preventDefault(); // Prevent form submission

    readReviewForm();

    if (FullName && Email && Message) {
        firebase.database().ref("PendingReviews/" + FullName).set({
            name: FullName,
            email: Email,
            message: Message
        }).then(() => {
            alert("Your message id submitted for reviewing");
            clearReviewForm();
        }).catch(error => {
            alert("Failed to submit review: " + error.message);
        });
    } else {
        alert("Input fields cannot be empty");
    }
};