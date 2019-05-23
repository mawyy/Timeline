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
            $('#myImage').attr('src', "data:image/jpeg;base64," + imageData);
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
            $('#myImage').attr('src', "data:image/jpeg;base64," + imageData);
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
                console.log(mediaFiles);
            }
        };

        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        // start video capture
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});

    }


    $('#setLocalStorage').on('click', setLocalStorage);

    function setLocalStorage() { 

        $('#loader').attr('src', '../img/loader.gif');

        var article = {
            title : $("#title").val(),
            description : $("#description").val(),
            image: $("#myImage").attr('src')
        };

        var index = localStorage.length + 1;

        localStorage.setItem(index, JSON.stringify(article)); 
    }
});