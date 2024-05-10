document.addEventListener("DOMContentLoaded", function () {
    const careersBarMobile = document.querySelector(".admin_sidebar_mobile_careers_bar");
    const certificationsBarMobile = document.querySelector(".admin_sidebar_mobile_Certifications_bar");
    const careersBar = document.querySelector(".admin_sidebar_careers_bar");
    const certificationsBar = document.querySelector(".admin_sidebar_Certifications_bar");
    const careersAdminBoard = document.querySelector(".careers_admin_board");
    const certificationsAdminBoard = document.querySelector(".certifications_admin_board");

    function setActiveSection(section) {
        // Remove active class from all sections
        [careersBarMobile, certificationsBarMobile, careersBar, certificationsBar].forEach(bar => {
            bar.classList.remove("active");
        });

        // Add active class to the clicked section
        section.classList.add("active");
    }

    careersBarMobile.addEventListener("click", function () {
        setActiveSection(careersBarMobile);
        careersAdminBoard.style.display = "block";
        certificationsAdminBoard.style.display = "none";

        var vacancyRef = firebase.database().ref("vacancies");
        vacancyRef.once("value", function (snapshot) {
            createVacanciesTable(snapshot);
        });
    });

    certificationsBarMobile.addEventListener("click", function () {
        setActiveSection(certificationsBarMobile);
        certificationsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";

        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            createCertificationsTable(snapshot);
        });
    });

    careersBar.addEventListener("click", function () {
        setActiveSection(careersBar);
        careersAdminBoard.style.display = "block";
        certificationsAdminBoard.style.display = "none";

        var vacancyRef = firebase.database().ref("vacancies");
        vacancyRef.once("value", function (snapshot) {
            createVacanciesTable(snapshot);
        });
    });

    certificationsBar.addEventListener("click", function () {
        setActiveSection(certificationsBar);
        certificationsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";

        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            createCertificationsTable(snapshot);
        });
    });
});
