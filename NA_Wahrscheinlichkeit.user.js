// ==UserScript==
// @name         Zeige NA Wahrscheinlichkeit
// @namespace    https://youtube.com/tuteplays
// @version      1.0
// @description  Zeigt neben der Anzahl verletzter Personen in der Einsatzmaske die Wahrscheinlichkeit für einen Notarzt.
// @author       TutePlays (API von Jan (KBOE2)/LSS-Manager)
// @match        https://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    function NA_Wahrscheinlichkeit() {
        
        var missionID = $("#mission_help").attr("href").substr(11,$("#mission_help").attr("href").indexOf("?mission_id")-11);

        //GET Data from Jan's API
        $.getJSON("https://lssm.ledbrain.de/api/missions.php?mission=" + missionID, function(data) {
            var NA_Wahrscheinlichkeit = "undefined";
            if (data.onlyRd == true){
                NA_Wahrscheinlichkeit = data.nef;
            } else {
                NA_Wahrscheinlichkeit = data.patients.nef;
            }

            //Nur anzeigen, wenn NA benötigt
            if (NA_Wahrscheinlichkeit != undefined){

                var insertPos = $( "#missionH1" ).next().next();
                insertPos.html(insertPos.html() + " | " + NA_Wahrscheinlichkeit + "% NA ");
            }
        });


    }
    $(window).on("load", NA_Wahrscheinlichkeit);
})();

