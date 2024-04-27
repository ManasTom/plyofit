//*************************
//CAREERS SECTION ADMIN PANNEL
//*************************

// variable decerations
var jobId, vacancyName, JobDescriptioon, Experience, DeadLine;

//function to read careers form data
function readFomV() {
    jobId = document.getElementById("job_id").value;
    vacancyName = document.getElementById("vacancy_name").value;
    JobDescriptioon = document.getElementById("job_description").value;
    Experience = document.getElementById("experience").value;
    DeadLine = document.getElementById("deadline").value;
    console.log(jobId, vacancyName, JobDescriptioon, Experience, DeadLine);
}

//function to add vacancy data 
document.getElementById("createV").onclick = function () {
    readFomV();
    
    if (jobId, vacancyName, JobDescriptioon, Experience, DeadLine) {
        firebase
        .database()
        .ref("vacancies/" + jobId)
        .set({
            job_id: jobId,
            vacancy_name: vacancyName,
            job_description: JobDescriptioon,
            experience: Experience,
            deadline: DeadLine,
        });
    alert("New vacancy added");
    } else {
        alert("Please enter a Job ID to insert vacancy data.");
    }

    
    document.getElementById("job_id").value = "";
    document.getElementById("vacancy_name").value = "";
    document.getElementById("job_description").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("deadline").value = "";

    
};

//function to read vacancy data 
document.getElementById("readV").onclick = function () {
    readFomV();

    if (jobId) {
        firebase
        .database()
        .ref("vacancies/" + jobId)
        .on("value", function (snap) {
            document.getElementById("job_id").value = snap.val().job_id;
            document.getElementById("vacancy_name").value = snap.val().vacancy_name;
            document.getElementById("job_description").value = snap.val().job_description;
            document.getElementById("experience").value = snap.val().experience;
            document.getElementById("deadline").value = snap.val().deadline;
        });
    } else {
        alert("Please enter a Job ID to read vacancy data.");
    }
};

//function to update vacancy data 
document.getElementById("updateV").onclick = function () {
    readFomV();

    if (jobId, vacancyName, JobDescriptioon, Experience, DeadLine) {
        firebase
        .database()
        .ref("vacancies/" + jobId)
        .update({
            job_id:jobId,
            vacancy_name: vacancyName,
            job_description: JobDescriptioon,
            experience: Experience,
            deadline: DeadLine,
        });
    alert("Vacancy Details Updated");
    } else {
        alert("Please enter a full details to update vacancy data.");
    }

    
    document.getElementById("job_id").value = "";
    document.getElementById("vacancy_name").value = "";
    document.getElementById("job_description").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("deadline").value = "";
};

//function to remove vacancy data 
document.getElementById("deleteV").onclick = function () {
    readFomV();

    if (jobId) {
        firebase
            .database()
            .ref("vacancies/" + jobId)
            .remove();
        alert("vacancy removed");
    } else {
        alert("Please enter a Job ID to delete vacancy data.");
    }
    document.getElementById("job_id").value = "";
    document.getElementById("vacancy_name").value = "";
    document.getElementById("job_description").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("deadline").value = "";

};


// Function to create the vacancies table with expand/collapse functionality
function createVacanciesTable(snapshot) {
    // Clear previous content of the dummy_table div
    var tableDiv = document.querySelector(".vacancy_table");
    tableDiv.innerHTML = "";

    // Create a table element
    var table = document.createElement("table");
    table.classList.add("vacancies_table");

    // Create table header
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Job ID</th><th>Vacancy Name</th><th>Job Description</th><th>Experience</th><th>Deadline</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    var tbody = document.createElement("tbody");

    // Iterate through vacancies data and populate the table
    snapshot.forEach(function(childSnapshot) {
        var vacancyData = childSnapshot.val();
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + vacancyData.job_id + "</td>" +
                        "<td>" + vacancyData.vacancy_name + "</td>" +
                        "<td class='job_description_cell'>" + 
                            "<div class='job_description_content'>" + vacancyData.job_description + "</div>" +
                            "<button class='expand_collapse_btn'>Expand/Collapse</button>" +
                        "</td>" +
                        "<td>" + vacancyData.experience + "</td>" +
                        "<td>" + vacancyData.deadline + "</td>";

        tbody.appendChild(row);
    });

    // Add event listener for expand/collapse button click
    tbody.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("expand_collapse_btn")) {
            var descriptionContent = e.target.previousElementSibling;
            descriptionContent.classList.toggle("expanded");
            e.target.textContent = descriptionContent.classList.contains("expanded") ? "Collapse" : "Expand";
        }
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}

// Call the function to display vacancies when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    var vacanciesRef = firebase.database().ref("vacancies");
    vacanciesRef.once("value", function(snapshot) {
        createVacanciesTable(snapshot);
    });
});





//*************************
//CERTIFICATIONS SECTION ADMIN PANNEL
//*************************

// variable decerations
var certificateId, studentName, membershipId, mobileNumber, courseTitle, awards;

//function to read certifications form data
function readFormC (){
    certificateId = document.getElementById("certificate_id").value;
    studentName = document.getElementById("student_name").value;
    membershipId = document.getElementById("membership_number").value;
    mobileNumber = document.getElementById("phone").value;
    courseTitle = document.getElementById("course_title").value;
    awards = document.getElementById("awards").value;
    console.log(certificateId, studentName, membershipId, mobileNumber, courseTitle, awards);
}



//function to add certificate data 
document.getElementById("createC").onclick = function () {
    readFormC();
    
    if (certificateId, studentName, membershipId, mobileNumber, courseTitle, awards) {
        firebase
        .database()
        .ref("certificates/" + certificateId)
        .set({
            certificate_id: certificateId,
            student_name: studentName,
            membership_number: membershipId,
            phone: mobileNumber,
            course_title: courseTitle,
            awards: awards,
        });
    alert("New certificate added");
    } else {
        alert("Please enter a certificate ID to insert vacancy data.");
    }

    
    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("membership_number").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("awards").value = "";

};



//function to read certificate data 
document.getElementById("readC").onclick = function () {
    readFormC();

    if (certificateId) {
        firebase
        .database()
        .ref("certificates/" + certificateId)
        .on("value", function (snap) {
            document.getElementById("certificate_id").value = snap.val().certificate_id;
            document.getElementById("student_name").value = snap.val().student_name;
            document.getElementById("membership_number").value = snap.val().membership_number;
            document.getElementById("phone").value = snap.val().phone;
            document.getElementById("course_title").value = snap.val().course_title;
            document.getElementById("awards").value = snap.val().awards;
        });
    } else {
        alert("Please enter a Certificate ID ID to read Certification data.");
    }
};




//function to update certificate data 
document.getElementById("updateC").onclick = function () {
    readFormC();

    if (certificateId, studentName, membershipId, mobileNumber, courseTitle, awards) {
        firebase
        .database()
        .ref("certificates/" + certificateId)
        .update({
            certificate_id: certificateId,
            student_name: studentName,
            membership_number: membershipId,
            phone: mobileNumber,
            course_title: courseTitle,
            awards: awards,
        });
    alert("Certification Details Updated");
    } else {
        alert("Please enter a full details to update Certification data.");
    }
    
    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("membership_number").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("awards").value = "";
};




//function to remove certificate data 
document.getElementById("deleteC").onclick = function () {
    readFormC();

    if (certificateId) {
        firebase
            .database()
            .ref("certificates/" + certificateId)
            .remove();
        alert("Certification Details removed");
    } else {
        alert("Please enter a Certifiate ID to delete Certification data.");
    }

    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("membership_number").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("awards").value = "";

};




// Function to create the certifications table
function createCertificationsTable(snapshot) {
    var tableDiv = document.querySelector(".certifications_table_area");
    tableDiv.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("certifications_table");

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Certificate ID</th><th>Student Name</th><th>Membership Number</th><th>Mobile Number</th><th>Course Title</th><th>Awards Received</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    snapshot.forEach(function(childSnapshot) {
        var certificationData = childSnapshot.val();
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + certificationData.certificate_id + "</td>" +
                        "<td>" + certificationData.student_name + "</td>" +
                        "<td>" + certificationData.membership_number + "</td>" +
                        "<td>" + certificationData.phone + "</td>" +
                        "<td>" + certificationData.course_title + "</td>" +
                        "<td>" + certificationData.awards + "</td>";

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}

// Call the function to display certifications when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    var certificationsRef = firebase.database().ref("certificates");
    certificationsRef.once("value", function(snapshot) {
        createCertificationsTable(snapshot);
    });
});



//***************************************************
//code to prevent default page refresh on submissions
//***************************************************

document.addEventListener("DOMContentLoaded", function() {
    // Prevent page refresh on button clicks
    var preventRefresh = function(event) {
        event.preventDefault(); // Prevent default button click behavior
        // Additional logic can be added here if needed
    };

    // Buttons with IDs createV, readV, updateV, deleteV
    var vacanciesButtons = document.querySelectorAll("#createV, #readV, #updateV, #deleteV");
    vacanciesButtons.forEach(function(button) {
        button.addEventListener("click", preventRefresh);
    });

    // Buttons with IDs createC, readC, updateC, deleteC
    var certificationsButtons = document.querySelectorAll("#createC, #readC, #updateC, #deleteC");
    certificationsButtons.forEach(function(button) {
        button.addEventListener("click", preventRefresh);
    });
});

