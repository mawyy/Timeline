$(document).ready(function() {

    /* Menu */

    $("#menu-btn").click(function() {

        if($("#menu-contenu").attr("class") == "hidden") {

            $("#menu-contenu").removeClass("hidden");
        }

        else {

            $("#menu-contenu").addClass("hidden");
        }
    });


    /* Afficher détail d'un article */

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    }

    var i = $.urlParam('id');

    var tab = JSON.parse(localStorage.getItem('data'));

    article = tab[i];

    $("#detail_article").append(
            "<H1>" + article.title + "</H1><p>" + article.description + "</p><img src='" + article.image + 
            "' width='100%'/></div></a>");


    /* Map */

    function initialize() {
        var map = L.map('map').setView([48.833, 2.333], 7); // LIGNE 14

        var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 16
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
    
        map.addLayer(osmLayer);
    }

    /*Supprimer un article */

    $("#removeArticle").on('click', removeArticle);

    function removeArticle() {
        
        tab.splice(i, 1);

        localStorage.setItem('data', JSON.stringify(tab)); 
    }

});