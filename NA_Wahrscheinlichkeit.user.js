// ==UserScript==
// @name         Zeige NA Wahrscheinlichkeit
// @namespace    https://youtube.com/tuteplays
// @version      1.4
// @description  Zeigt neben der Anzahl verletzter Personen in der Einsatzmaske die Wahrscheinlichkeit für einen Notarzt.
// @author       TutePlays, Anpassungen von Jan und Lennard
// @match        https://www.leitstellenspiel.de/missions/*
// @grant        none
// @updateURL    https://github.com/TutePlays/LSS_NA_Wahrscheinlichkeit/raw/master/NA_Wahrscheinlichkeit.user.js
// @downloadURL  https://github.com/TutePlays/LSS_NA_Wahrscheinlichkeit/raw/master/NA_Wahrscheinlichkeit.user.js
// ==/UserScript==
(function() {
    'use strict';
    const missionID = $("#mission_help").attr('href').split("/").pop().replace(/\?.*/, '');
    let mission_specs_cache = {};

    async function output()
    {
        console.log("OUT!");
        let NA_Wahrscheinlichkeit = mission_specs_cache.filter(e => e.id == missionID)[0].chances.nef;
        NA_Wahrscheinlichkeit && $('.mission_header_info .col-md-6:first-of-type>small').append(` | ${NA_Wahrscheinlichkeit}% NA (${Math.ceil(NA_Wahrscheinlichkeit * $('.mission_patient').length / 100)})`);
    }

    async function init()
    {
        if(!localStorage.aMissions || JSON.parse(localStorage.aMissions).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) {
            await $.getJSON('/einsaetze.json').done(data => localStorage.setItem('aMissions', JSON.stringify({lastUpdate: new Date().getTime(), value: data})) );
        }
        var mission_specs_cache = JSON.parse(localStorage.aMissions).value;
        output();
    }
    init();
})();
