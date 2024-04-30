document.addEventListener("DOMContentLoaded", function () {
    // Reference to the vacancies section of the database
    var vacanciesRef = firebase.database().ref("vacancies");

    // Get a reference to the table body
    var tableBody = document.querySelector("#jobTable tbody");

    // Populate the table with job vacancies
    vacanciesRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var vacancyData = childSnapshot.val();
            var row = document.createElement("tr");

            // Create cells for the job vacancy details
            var positionCell = document.createElement("td");
            positionCell.textContent = vacancyData.vacancy_name;
            positionCell.style.marginTop = "10px"; // Add top margin
            row.appendChild(positionCell);

            var experienceCell = document.createElement("td");
            experienceCell.textContent = vacancyData.experience + " years";
            experienceCell.style.marginTop = "10px"; // Add top margin
            row.appendChild(experienceCell);

            var applyButtonCell = document.createElement("td");
            var applyButton = document.createElement("button");
            applyButton.textContent = "Apply Now";
            applyButton.dataset.vacancyId = childSnapshot.key; // Store the vacancy ID as a data attribute
            applyButton.addEventListener("click", handleApplyNowClick);
            applyButtonCell.appendChild(applyButton);
            applyButton.style.marginBottom = "1%";
            applyButton.style.marginTop = "1%";
            applyButton.style.color = "#ffff";
            applyButton.style.backgroundColor = "#f003a0";
            applyButton.style.border = "none";
            applyButton.style.padding = "2%";
            applyButton.style.fontWeight = "bold";
            row.appendChild(applyButtonCell);

            // Append the row to the table
            tableBody.appendChild(row);
        });
    });


    // Function to handle form submission
    function submitApplication(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var formData = new FormData(document.getElementById("applicationForm"));
        var vacancyName = document.getElementById("vacancyName").innerText;

        // Send form data to the PHP script using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "submit_application.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Form submission successful
                    alert(xhr.responseText); // Display success message
                    // Close the popup or do any other necessary actions
                } else {
                    // Form submission failed
                    alert("Failed to submit the application. Please try again later.");
                }
            }
        };
        xhr.send(formData);
    }


    // Function to handle Apply Now button clicks
    function handleApplyNowClick(event) {
        var vacancyId = event.target.dataset.vacancyId;
        var vacancyRef = vacanciesRef.child(vacancyId);

        // Retrieve the job details from Firebase
        vacancyRef.once("value", function (snapshot) {
            var vacancyData = snapshot.val();
            // Construct the content for the popup
            var popupContent = `
        <div style="height: 40rem; overflow-y: auto;">
        <h2 style="color: #f003a0;">Apply Now</h2>
            <h3 id="jobTitle">Vacancy: ${vacancyData.vacancy_name}</h3>
            <p><strong>Job Description:</strong> ${vacancyData.job_description}</p>
            <p><strong>Required Experience:</strong> ${vacancyData.experience} years</p>
            <hr>
            <form id="applicationForm" action="submit_application.php" method="post" enctype="multipart/form-data">
                <input type="text" id="fullName" name="fullName" placeholder="Full Name" style="width: 70%; margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <input type="tel" id="contactNumber" name="contactNumber" placeholder="Contact Number" style="width: 70%; margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <input type="email" id="email" name="email" placeholder="Email ID" style="width: 70%; margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <input type="text" id="place" name="place" placeholder="Place" style="width: 70%; margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <label for="DOB" style="color: #000000;">Date of Birth:</label>
                <input type="date" id="dob" name="dob" placeholder="DOB" style="margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <input type="text" id="workExperience" name="workExperience" placeholder="Work Experience in same field" style="width: 70%; margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <label for="certifiedTrainer" style="color: #000000;">Certified Trainer:</label>
                <select id="certifiedTrainer" name="certifiedTrainer" style="margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select><br/>
                <input type="text" id="certificationName" name="certificationName" placeholder="Certification Name/s" style="margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <label for="relocate" style="color: #000000;">Willing to relocate:</label>
                <select id="relocate" name="relocate" style="margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select><br/>
                <input type="text" id="salaryExpectations" name="salaryExpectations" placeholder="Salary expectations" style="margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>
                <label for="immediateJoin" style="color: #000000;">Immediate joining:</label>
                <select id="immediateJoin" name="immediateJoin" style="margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select><br/>
                <input type="file" id="resume" name="resume" accept=".pdf, .doc, .docx" style="margin-bottom: 10px; border: 1px solid #000000; border-radius: 5px; padding: 5px;"><br/>                <input type="submit" value="Submit Application" style="background-color: #f003a0; color: #ffffff; border: none; border-radius: 5px; padding: 10px 20px; cursor: pointer;">
            </form>
        <div/>
            
        `;

            // Display the popup with the job details and application form
            displayPopup(popupContent);
        });
    }


    // Function to display the popup
    // Function to display the popup
    function displayPopup(content) {
        // Create the popup div
        var popupDiv = document.createElement("div");
        popupDiv.id = "popupDiv";
        popupDiv.style.position = "fixed";
        popupDiv.style.top = "50%";
        popupDiv.style.left = "50%";
        popupDiv.style.transform = "translate(-50%, -50%)";
        popupDiv.style.backgroundColor = "#ffffff";
        popupDiv.style.padding = "20px";
        popupDiv.style.border = "2px solid #000000";
        popupDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        popupDiv.style.zIndex = "9999";
        popupDiv.innerHTML = content;

        // Create the close button
        var closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.style.position = "absolute";
        closeButton.style.top = "10px";
        closeButton.style.right = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.addEventListener("click", closePopup);
        popupDiv.appendChild(closeButton);

        // Append the popup div to the document body
        document.body.appendChild(popupDiv);
    }

    // Function to close the popup
    function closePopup() {
        var popupDiv = document.getElementById("popupDiv");
        if (popupDiv) {
            popupDiv.remove();
        }
    }

});
