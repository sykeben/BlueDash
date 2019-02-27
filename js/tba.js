// VARIABLES
var baseURL = "https://www.thebluealliance.com/api/v3/";
var args = "?X-TBA-Auth-Key="+getApiKey();

function refreshTBA() {
    // RELOAD VARIABLES
    var currentDate = new Date(); var currentYear = currentDate.getFullYear();
    
    // LAST REFRESHED TIME
    timeElement = document.getElementById("lastUpdated");
    timeElement.innerHTML = currentDate.toLocaleTimeString().split(" ")[0];
    
    
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
            element = document.getElementById("apiStatus");
            element.innerHTML = "<i>[Error]</i>";
            if (!(jQuery(".autoRefresh:checked").val() == "autoRefresh")) {
                alert("[ERROR]\nCannot get data.");
            }
        }
    });
    
    // TEAM NAME (AND TEAM # CHECKER)
    jQuery.ajax({
        url: baseURL+"team/frc"+getTeam().toString()+args,
        dataType: "json",
        success: function(json) {
            element = document.getElementById("teamName");
            element.innerHTML = json.name;
        },
        error: function(data) {
            if (document.getElementById("apiStatus").innerHTML != "<i>[Error]</i>") {
                element = document.getElementById("teamName");
                element.innerHTML = "<i>[Invalid Team]</i>";
                if (!(jQuery(".autoRefresh:checked").val() == "autoRefresh")) {
                    alert("[ERROR]\nInvalid team #.");
                }
            }
        }
    });
    
    // REST OF DATA (ONLY IF TEAM IS VALID)
    jQuery.ajax({
        url: baseURL+"team/frc"+getTeam().toString()+args,
        dataType: "json",
        success: function(fkJson) {
            
            // CURRENT EVENT
            jQuery.ajax({
                url: baseURL+"team/frc"+getTeam().toString()+"/events/"+currentYear+"/simple"+args,
                dataType: "json",
                success: function(json) {
                    var eventDate; var formattedEventDate; var timeDiff; var inEvent;
                    element = document.getElementById("currentEvent"); element.innerHTML = "";
                    for (var i = 0; i < json.length; i++) {
                        processEvent = json[i];
                        eventStartDate = new Date(convertEventDate(processEvent.start_date));
                        eventEndDate = new Date(convertEventDate(processEvent.end_date));
                        if (eventStartDate.getTime() <= currentDate.getTime() && eventEndDate.getTime() >= currentDate.getTime()) {
                            inEvent = true; currentEvent = processEvent;
                            break;
                        }
                    }
                    if (inEvent) {
                        element.innerHTML = currentEvent.name;
                    } else {
                        element.innerHTML = "<i>Not currently in an event.</i>";
                    }
                },
                error: function(data) {
                    element = document.getElementById("currentEvent");
                    element.innerHTML = "";
                }
            });
            
        }
    });
}

function convertEventDate(rawString) {
    rawDate = rawString.split("-");
    return rawDate[1] + "/" + rawDate[2] + "/" + rawDate[0];
}