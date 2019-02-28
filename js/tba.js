// VARIABLES
var baseURL = "https://www.thebluealliance.com/api/v3/";
var args = "?X-TBA-Auth-Key="+getApiKey();

function refreshTBA() {
    // RELOAD VARIABLES
    var currentDate = new Date(); var currentYear = currentDate.getFullYear();

    // LAST REFRESHED TIME
    timeElement = document.getElementById("lastUpdated");
    timeElement.innerHTML = currentDate.toLocaleTimeString().split(" ")[0];
}