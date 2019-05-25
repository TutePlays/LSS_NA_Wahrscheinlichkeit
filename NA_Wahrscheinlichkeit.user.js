// ==UserScript==
// @name         Zeige NA Wahrscheinlichkeit
// @namespace    https://youtube.com/tuteplays
// @version      0.1
// @description  Zeigt neben der Anzahl verletzter Personen in der Einsatzmaske die Wahrscheinlichkeit für einen Notarzt.
// @author       TutePlays
// @match        https://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    function NA_Wahrscheinlichkeit() {
        var MissionHelper = $("#mission-form .alert.alert-warning:contains('Notarzteinsatzfahrzeug')");
        var NA_Wahrscheinlichkeit = MissionHelper.text().substr(MissionHelper.text().indexOf("Notarzteinsatzfahrzeug (") + 24, 3);

        //Nur anzeigen, wenn NA benötigt
        if (NA_Wahrscheinlichkeit){
            var insertPos = $( "#missionH1" ).next().next();
            insertPos.html(insertPos.html() + " | " + NA_Wahrscheinlichkeit + " NA ");
        }

    }
    $(window).on("load", NA_Wahrscheinlichkeit);
})();

