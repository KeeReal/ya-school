"use strict";


const $ = require("jquery");


const results = $("div#resultContainer");
if (results.length === 0) {
    throw new Error(`Oops, there is no 'div#resultContainer'`);
}


function resetClasses() {
    results.removeClass("success");
    results.removeClass("error");
}


exports.setSuccess = () => {
    resetClasses();
    results.addClass("success");
};


exports.setProgress = () => {
    resetClasses();
    results.addClass("progress");
};


exports.setError = () => {
    resetClasses();
    results.addClass("error");
};


exports.reset = () => results.text("");
exports.setText = text => results.text(text);