function refreshTBA() {
    // VARIABLES
    var baseURL = "https://www.thebluealliance.com/api/v3/";
    var args = "?X-TBA-Auth-Key="+getApiKey();
    var validTeam = false;
    
    // DATA STREAM STATUS
    jQuery.ajax({
        url: baseURL+"status"+args,
        dataType: "json",
        success: function(json) {
            element = document.getElementById("apiStatus");
            if (json.is_datafeed_down == true) {
                element.innerHTML = "Down";
            } else {
                element.innerHTML = "Up";
            }
        },
        error: function(data) {
            alert("[ERROR]\nCannot get data.");
        }
    });
    
    // TEAM NAME (AND TEAM # CHECKER)
    jQuery.ajax({
        url: baseURL+"team/frc"+getTeam()+args,
        dataType: "json",
        success: function(json) {
            element = document.getElementById("teamName");
            element.innerHTML = json.name;
            validTeam = true;
        },
        error: function(data) {
            element = document.getElementById("teamName");
            element.innerHTML = "[Invalid Team]"
            alert("[ERROR]\nInvalid Team #.");
        }
    });
}