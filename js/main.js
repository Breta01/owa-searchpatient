function loadManifest() {
    jQuery.getJSON('manifest.webapp').done(function (data) {
        sessionStorage.setItem("serverUrl", data.activities.openmrs.href);
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("reading manifest file request Failed: " + err);
    });
}

function searchFunction() {
    var getUrl = sessionStorage.getItem("serverUrl") + "/ws/rest/v1/patient?q=" + document.getElementById("field").value + "&v=default";

    $.ajax({
        url: getUrl,
        dataType:'xml',
        success: function (data) {
            $("tbody").children().remove();
            $(data).find("patient").each(function () {
                var gender = "Male";
                if ($(this).find('person > gender').text() === "F")
                    gender = "Female";

                var info = '<tr>' + '<td>'+ $(this).find('identifier > display').text().split('= ')[1] +'</td>'
                 + '<td>'+ $(this).find('person > preferredName > display').text() +'</td>'
                 + '<td>'+ $(this).find('person > age').text() +'</td>'
                 + '<td>'+ gender +'</td>'
                 + '</tr>';

                $("tbody").append(info);
                console.log("success TR");
            });
        }
    });
}

function goHome () {
    window.location.href = sessionStorage.getItem("serverUrl")
}
