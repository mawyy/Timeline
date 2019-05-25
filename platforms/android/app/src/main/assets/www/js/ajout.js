$(document).ready(function() {

    $("#menu-btn").click(function() {

        if($("#menu-contenu").attr("class") == "hidden") {

            $("#menu-contenu").removeClass("hidden");
        }

        else {

            $("#menu-contenu").addClass("hidden");
        }
    });

    $("#cameraTakePicture").on('click', cameraTakePicture);

    function cameraTakePicture() {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            $('#myImage').attr('src', "data:image/jpeg;base64," + imageData).show();
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        } 
    }

    $("#cameraGetPicture").on('click', cameraGetPicture);

    function cameraGetPicture() {

        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });

        function onSuccess(imageData) {
            $('#myImage').attr('src', "data:image/jpeg;base64," + imageData).show();
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        } 
    }

    $("#cameraTakeVideo").on('click', cameraTakeVideo);

    function cameraTakeVideo() {

        // capture callback
        var captureSuccess = function(mediaFiles) {
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                $("#myVideo").append("<video controls src='" + mediaFiles[i].fullPath + "'>Test<video");
            }
        };

        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        // start video capture
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});

    }

    $("#getGeolocation").on('click', getGeolocation);

    function getGeolocation() {

        var onSuccess = function(position) {

            $("#latitude").attr('value', position.coords.latitude);
            $("#longitude").attr('value', position.coords.longitude);
            $("#getGeolocation").remove();
            $("#successLocalisation").append("<span>Localisation ajoutée avec succès</span>");

        };

        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }


    $('#setLocalStorage').on('click', setLocalStorage);

    function setLocalStorage() { 

        $('#loader').attr('src', '../img/loader.gif');  
        
        var dateToday = new Date();

        var month = (dateToday.getMonth()+1);
        if(month >= 1 && month <= 9) {
            month = "0" + month;
        }
        var day = dateToday.getDate();
        if(day >= 1 && day <= 9) {
            day = "0" + day;
        }
        var d = day + "/" + month + "/" + dateToday.getFullYear();

        var hour = dateToday.getHours();
        if(hour >= 1 && hour <= 9) {
            hour = "0" + hour;
        }
        var min = dateToday.getMinutes();
        if(min >= 1 && min <= 9) {
            min = "0" + min;
        }
        var h = hour + "h" + min + "";

        var tab = [];

        if(localStorage.getItem("data")) {
            tab = JSON.parse(localStorage.getItem("data"));
        }

        var article = {
            title : $("#title").val() || '',
            description : $("#description").val() || '',
            image: $("#myImage").attr('src') || '',
            video: $("video").attr('src') || '',
            latitude: $("#latitude").val() || '',
            longitude: $("#longitude").attr('value') || '',
            date: d,
            heure: h,
        };

        tab.push(article);

        localStorage.setItem('data', JSON.stringify(tab)); 
    }
});