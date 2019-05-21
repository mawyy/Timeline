$(document).ready(function() {

    $("#menu-btn").click(function() {

        if($("#menu-contenu").attr("class") == "hidden") {

            $("#menu-contenu").removeClass("hidden");
        }

        else {

            $("#menu-contenu").addClass("hidden");
        }
    });

    $('#setLocalStorage').on('click', setLocalStorage);

    function setLocalStorage() { 

        var article = {
            title : $("#title").val(),
            description : $("#description").val()
        };

        var index = localStorage.length + 1;

        localStorage.setItem(index, JSON.stringify(article)); 
    }
});