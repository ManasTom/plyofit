
//script to toggle between careers and certifications window in admin pannel
document.addEventListener("DOMContentLoaded", function () {
    const careersBarMobile = document.querySelector(".admin_sidebar_mobile_careers_bar");
    const certificationsBarMobile = document.querySelector(".admin_sidebar_mobile_Certifications_bar");
    const careersBar = document.querySelector(".admin_sidebar_careers_bar");
    const certificationsBar = document.querySelector(".admin_sidebar_Certifications_bar");
    const careersAdminBoard = document.querySelector(".careers_admin_board");
    const certificationsAdminBoard = document.querySelector(".certifications_admin_board");

    careersBarMobile.addEventListener("click", function () {
        careersAdminBoard.style.display = "block";
        certificationsAdminBoard.style.display = "none";

        var vacancyRef = firebase.database().ref("vacancies");
        vacancyRef.once("value", function (snapshot) {
            createVacanciesTable(snapshot);
        });
    });




    certificationsBarMobile.addEventListener("click", function () {
        certificationsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";

        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            createCertificationsTable(snapshot);
        });
    });




    careersBar.addEventListener("click", function () {
        careersAdminBoard.style.display = "block";
        certificationsAdminBoard.style.display = "none";

        var vacancyRef = firebase.database().ref("vacancies");
        vacancyRef.once("value", function (snapshot) {
            createVacanciesTable(snapshot);
        });
    });




    certificationsBar.addEventListener("click", function () {
        certificationsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";

        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            createCertificationsTable(snapshot);
        });
    });
});
