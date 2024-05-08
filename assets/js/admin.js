// ************************************************************************************
//CAREERS SECTION ADMIN PANNEL
// ************************************************************************************

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

function clearAllForms() {
    document.getElementById("job_id").value = "";
    document.getElementById("vacancy_name").value = "";
    document.getElementById("job_description").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("student_code").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("cert_athority").value = "";
}

//function to add vacancy data 
document.getElementById("createV").onclick = function () {
    readFomV();

    if (jobId && vacancyName && JobDescriptioon && Experience && DeadLine) {
        alert('Are you sure to Update?')
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
        clearAllForms();
    } else {
        alert("Please enter Full details to insert vacancy data.");
    }




};

//function to read vacancy data 
// document.getElementById("readV").onclick = function () {
//     readFomV();

//     if (jobId) {
//         firebase
//         .database()
//         .ref("vacancies/" + jobId)
//         .on("value", function (snap) {
//             document.getElementById("job_id").value = snap.val().job_id;
//             document.getElementById("vacancy_name").value = snap.val().vacancy_name;
//             document.getElementById("job_description").value = snap.val().job_description;
//             document.getElementById("experience").value = snap.val().experience;
//             document.getElementById("deadline").value = snap.val().deadline;
//         });
//     } else {
//         alert("Please enter a Job ID to read vacancy data.");
//     }
// };

//function to update vacancy data 
// document.getElementById("updateV").onclick = function () {
//     readFomV();

//     if (jobId, vacancyName, JobDescriptioon, Experience, DeadLine) {
//         firebase
//         .database()
//         .ref("vacancies/" + jobId)
//         .update({
//             job_id:jobId,
//             vacancy_name: vacancyName,
//             job_description: JobDescriptioon,
//             experience: Experience,
//             deadline: DeadLine,
//         });
//     alert("Vacancy Details Updated");
//     } else {
//         alert("Please enter a full details to update vacancy data.");
//     }


//     document.getElementById("job_id").value = "";
//     document.getElementById("vacancy_name").value = "";
//     document.getElementById("job_description").value = "";
//     document.getElementById("experience").value = "";
//     document.getElementById("deadline").value = "";
// };




//function to remove vacancy data 
// document.getElementById("deleteV").onclick = function () {
//     readFomV();

//     if (jobId) {
//         firebase
//             .database()
//             .ref("vacancies/" + jobId)
//             .remove();
//         alert("vacancy removed");
//     } else {
//         alert("Please enter a Job ID to delete vacancy data.");
//     }
//     document.getElementById("job_id").value = "";
//     document.getElementById("vacancy_name").value = "";
//     document.getElementById("job_description").value = "";
//     document.getElementById("experience").value = "";
//     document.getElementById("deadline").value = "";

// };


















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
    headerRow.innerHTML = "<th class='action-column'>Action</th><th>Job ID</th><th>Vacancy Name</th><th>Job Description</th><th>Experience</th><th>Deadline</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    var tbody = document.createElement("tbody");

    // Iterate through vacancies data and populate the table
    snapshot.forEach(function (childSnapshot) {
        var vacancyKey = childSnapshot.key; // Get the key of the job
        var vacancyData = childSnapshot.val();
        var row = document.createElement("tr");
        row.innerHTML = "<td><button class='edit_btn' data-key='" + vacancyKey + "'><i class='fa-solid fa-pen-to-square'></i>&nbsp;&nbsp;Edit</button><br><button class='delete_btn' data-key='" + vacancyKey + "'><i class='fa-solid fa-trash'></i>&nbsp;&nbsp;Delete</button></td>" +
            "<td>" + vacancyData.job_id + "</td>" +
            "<td>" + vacancyData.vacancy_name + "</td>" +
            "<td class='job_description_cell'>" +
            "<div class='job_description_content'>" + vacancyData.job_description + "</div>" +
            "<button class='expand_collapse_btn'>Expand/Collapse</button>" +
            "</td>" +
            "<td>" + vacancyData.experience + "</td>" +
            "<td>" + vacancyData.deadline + "</td>";

        tbody.appendChild(row);
    });

    // Add event listener for expand/collapse button click, edit button click, and delete button click
    tbody.addEventListener("click", function (e) {
        if (e.target && (e.target.classList.contains("edit_btn") || e.target.parentNode.classList.contains("edit_btn"))) {
            // If edit button or its child element is clicked
            var button = e.target.classList.contains("edit_btn") ? e.target : e.target.parentNode;
            var key = button.getAttribute("data-key");
            var jobRef = firebase.database().ref("vacancies").child(key);
            jobRef.once("value", function (snapshot) {
                var jobData = snapshot.val();
                // Fill form fields with job data
                document.getElementById("job_id").value = jobData.job_id;
                document.getElementById("vacancy_name").value = jobData.vacancy_name;
                document.getElementById("job_description").value = jobData.job_description;
                document.getElementById("experience").value = jobData.experience;
                document.getElementById("deadline").value = jobData.deadline;
                // Set the key of the job being edited
                document.getElementById("edit_job_key").value = key;
            });
        } else if (e.target && e.target.classList.contains("delete_btn")) {
            // If delete button is clicked
            var key = e.target.getAttribute("data-key");
            if (confirm("Are you sure you want to delete this vacancy?")) {
                // If user confirms deletion, remove data from the database
                var jobRef = firebase.database().ref("vacancies").child(key);
                jobRef.remove()
                    .then(function () {
                        // Data successfully deleted
                        console.log("Vacancy deleted successfully");
                    })
                    .catch(function (error) {
                        // Error occurred while deleting data
                        console.error("Error deleting vacancy: ", error);
                    });
            }
        } else if (e.target && e.target.classList.contains("expand_collapse_btn")) {
            var descriptionContent = e.target.previousElementSibling;
            descriptionContent.classList.toggle("expanded");
            e.target.textContent = descriptionContent.classList.contains("expanded") ? "Collapse" : "Expand";
        }
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}

// Call the function to display vacancies when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    var vacanciesRef = firebase.database().ref("vacancies");
    vacanciesRef.once("value", function (snapshot) {
        createVacanciesTable(snapshot);
    });
});


















// ************************************************************************************
//CERTIFICATIONS SECTION ADMIN PANNEL
// ************************************************************************************

// variable decerations
var certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority;

//function to read certifications form data
function readFormC() {
    certificateId = document.getElementById("certificate_id").value;
    studentName = document.getElementById("student_name").value;
    studentCode = document.getElementById("student_code").value;
    mobileNumber = document.getElementById("phone").value;
    courseTitle = document.getElementById("course_title").value;
    cert_athority = document.getElementById("cert_athority").value;
    console.log(certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority);
}



//function to add certificate data 
document.getElementById("createC").onclick = function () {
    readFormC();

    if (certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority) {
        firebase
            .database()
            .ref("certificates/" + certificateId)
            .set({
                certificate_id: certificateId,
                student_name: studentName,
                student_code: studentCode,
                phone: mobileNumber,
                course_title: courseTitle,
                cert_athority: cert_athority,
            });
        alert("New certificate added");
    } else {
        alert("Please enter a certificate ID to insert vacancy data.");
    }


    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("student_code").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("cert_athority").value = "";

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
                document.getElementById("student_code").value = snap.val().student_code;
                document.getElementById("phone").value = snap.val().phone;
                document.getElementById("course_title").value = snap.val().course_title;
                document.getElementById("cert_athority").value = snap.val().cert_athority;
            });
    } else {
        alert("Please enter a Certificate ID ID to read Certification data.");
    }
};




//function to update certificate data 
document.getElementById("updateC").onclick = function () {
    readFormC();

    if (certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority) {
        firebase
            .database()
            .ref("certificates/" + certificateId)
            .update({
                certificate_id: certificateId,
                student_name: studentName,
                student_code: studentCode,
                phone: mobileNumber,
                course_title: courseTitle,
                cert_athority: cert_athority,
            });
        alert("Certification Details Updated");
    } else {
        alert("Please enter a full details to update Certification data.");
    }

    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("student_code").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("cert_athority").value = "";
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
    document.getElementById("student_code").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("cert_athority").value = "";

};




// Function to create the certifications table
// Updated createCertificationsTable function
function createCertificationsTable(snapshot) {
    var tableDiv = document.querySelector(".certifications_table_area");
    tableDiv.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("certifications_table");

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Action</th><th>Certificate ID</th><th>Student Name</th><th>Student Code</th><th>Mobile Number</th><th>Course Title</th><th>Certifying Authority</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    snapshot.forEach(function (childSnapshot) {
        var certificationData = childSnapshot.val();
        var row = document.createElement("tr");
        row.innerHTML = "<td><button class='editButton'><i class='fa-solid fa-pen-to-square'></i>&nbsp;&nbsp;Edit</button><button class='deleteButton'><i class='fa-solid fa-trash'></i>&nbsp;&nbsp;Delete</button></td>" +
            "<td>" + certificationData.certificate_id + "</td>" +
            "<td>" + certificationData.student_name + "</td>" +
            "<td>" + certificationData.student_code + "</td>" +
            "<td>" + certificationData.phone + "</td>" +
            "<td>" + certificationData.course_title + "</td>" +
            "<td>" + certificationData.cert_athority + "</td>";

        tbody.appendChild(row);

        // Edit button functionality
        var editButton = row.querySelector(".editButton");
        editButton.addEventListener("click", function () {
            // Fill form fields with respective data for editing
            document.getElementById("certificate_id").value = certificationData.certificate_id;
            document.getElementById("student_name").value = certificationData.student_name;
            document.getElementById("student_code").value = certificationData.student_code;
            document.getElementById("phone").value = certificationData.phone;
            document.getElementById("course_title").value = certificationData.course_title;
            document.getElementById("cert_athority").value = certificationData.cert_athority;
        });

        // Delete button functionality
        var deleteButton = row.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function () {
            // Show confirmation dialog
            var confirmDelete = confirm("Are you sure you want to delete this certificate?");
            if (confirmDelete) {
                // Remove respective data from the database
                childSnapshot.ref.remove()
                    .then(function () {
                        console.log("Certificate removed successfully");
                    })
                    .catch(function (error) {
                        console.error("Error removing certificate: ", error);
                    });
            }
        });
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}



// ************************************************************************************
//code to prevent default page refresh on submissions
// ************************************************************************************

document.addEventListener("DOMContentLoaded", function () {
    // Prevent page refresh on button clicks
    var preventRefresh = function (event) {
        event.preventDefault(); // Prevent default button click behavior
        // Additional logic can be added here if needed
    };

    // Buttons with IDs createV, readV, updateV, deleteV
    var vacanciesButtons = document.querySelectorAll("#createV, #readV, #updateV, #deleteV");
    vacanciesButtons.forEach(function (button) {
        button.addEventListener("click", preventRefresh);
    });

    // Buttons with IDs createC, readC, updateC, deleteC
    var certificationsButtons = document.querySelectorAll("#createC, #readC, #updateC, #deleteC");
    certificationsButtons.forEach(function (button) {
        button.addEventListener("click", preventRefresh);
    });
});



// ************************************************************************************
// function to refresh certifications table data
// ************************************************************************************
function refreshCertificateTable() {
    var certificationsRef = firebase.database().ref("certificates");
    certificationsRef.once("value", function (snapshot) {
        createCertificationsTable(snapshot);
    });
}


// ************************************************************************************
// function to refresh vacancy table data
// ************************************************************************************
function refreshVacancyTable() {
    var vacancyRef = firebase.database().ref("vacancies");
    vacancyRef.once("value", function (snapshot) {
        createVacanciesTable(snapshot);
    });
}



// ************************************************************************************
// SEARCH FUNCTIONALITY
// ************************************************************************************

document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("admin_searchBox");
    var searchButton = document.getElementById("admin_searchButtton");
    var certificationsTableArea = document.querySelector(".certifications_table_area");

    searchButton.addEventListener("click", function () {
        var searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === "") {
            // If search term is empty, clear the table area
            certificationsTableArea.innerHTML = "";
            return;
        }

        // Perform search operation in the "certificates" section of the database
        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            var searchResults = [];
            snapshot.forEach(function (childSnapshot) {
                var certificationData = childSnapshot.val();
                // Check if any of the fields contain the search term
                if (certificationData.certificate_id.toLowerCase().includes(searchTerm) ||
                    certificationData.student_name.toLowerCase().includes(searchTerm) ||
                    certificationData.student_code.toLowerCase().includes(searchTerm) ||
                    certificationData.phone.toLowerCase().includes(searchTerm)) {
                    searchResults.push(certificationData);
                }
                
            });

            // Display search results as a table
            displaySearchResults(searchResults);
            var certificationData = childSnapshot.val();
            // Edit button functionality
        var editButton = row.querySelector(".editButton");
        editButton.addEventListener("click", function () {
            // Fill form fields with respective data for editing
            document.getElementById("certificate_id").value = certificationData.certificate_id;
            document.getElementById("student_name").value = certificationData.student_name;
            document.getElementById("student_code").value = certificationData.student_code;
            document.getElementById("phone").value = certificationData.phone;
            document.getElementById("course_title").value = certificationData.course_title;
            document.getElementById("cert_athority").value = certificationData.cert_athority;
        });

        // Delete button functionality
        var deleteButton = row.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function () {
            // Show confirmation dialog
            var confirmDelete = confirm("Are you sure you want to delete this certificate?");
            if (confirmDelete) {
                // Remove respective data from the database
                childSnapshot.ref.remove()
                    .then(function () {
                        console.log("Certificate removed successfully");
                    })
                    .catch(function (error) {
                        console.error("Error removing certificate: ", error);
                    });
            }
        });
        });
    });

    function displaySearchResults(results) {
        var tableHTML = "<table class='certifications_table'>" +
            "<th>Action</th><th>Certificate ID</th><th>Student Name</th><th>Student Code</th><th>Mobile Number</th><th>Course Title</th><th>Certifying Authority</th>" +
            "<tbody>";

        results.forEach(function (certificationData) {
            tableHTML += "<tr>" +
                "<td><button class='editButton'><i class='fa-solid fa-pen-to-square'></i>&nbsp;&nbsp;Edit</button><button class='deleteButton'><i class='fa-solid fa-trash'></i>&nbsp;&nbsp;Delete</button></td>"+
                "<td>" + certificationData.certificate_id + "</td>" +
                "<td>" + certificationData.student_name + "</td>" +
                "<td>" + certificationData.student_code + "</td>" +
                "<td>" + certificationData.phone + "</td>" +
                "<td>" + certificationData.course_title + "</td>" +
                "<td>" + certificationData.cert_athority + "</td>" +
                "</tr>";
        });

        tableHTML += "</tbody></table>";
        certificationsTableArea.innerHTML = tableHTML;
    }
});









//download backup
function downloadEncryptedJSON() {
    const databaseURL = 'https://plyofit-49b60-default-rtdb.firebaseio.com/';
    const jsonDataURL = databaseURL + '.json';

    fetch(jsonDataURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            // Convert JSON object to a string
            const jsonString = JSON.stringify(jsonData, null, 2);

            // Encrypt the JSON string using AES encryption
            const encryptedData = CryptoJS.AES.encrypt(jsonString, 'Aubdgh6SDkuihS756db867astgsm').toString();

            // Create a Blob object with the encrypted data
            const blob = new Blob([encryptedData], { type: 'application/octet-stream' });

            // Create a temporary anchor element
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'backup.json';

            // Programmatically trigger a click event on the anchor element
            // to initiate the download
            a.click();

            // Remove the temporary anchor element
            window.URL.revokeObjectURL(a.href);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};
