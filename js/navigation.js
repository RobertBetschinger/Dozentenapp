document.addEventListener("deviceready", onDeviceReady, true);

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
    // navigator.notification.alert("PhoneGap is working");
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}

function callMainMenu() {
    window.location = "index.html";
}

function onOffline() {
    alert("Keine Internetverbindung! App nur eingeschränkt verwendungsfähig.");
}

function onOnline() {
    alert("Internetverbindung wieder vorhanden.");
}

function callDozentenappPage() {
    window.location = "index.html"
}

function callExistingQuestionsPage() {
    window.location = "fragenBearbeiten.html";
}

function callNewQuestionsPage() {
    window.location = "neueFrage.html";
}

function callNewCategoryPage() {
    window.location = "neueKategorieAnlegen.html";
}

function callStudentPerformancePage() {
    window.location = "student_performance_page.html";
}

function callUsageOverviewPage() {
    window.location = "usage_overview_page.html";
}