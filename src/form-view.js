"use strict";


const _ = require("underscore");
const $ = require("jquery");
const consts = require("./consts");


const myForm = $("form#myForm");
if (myForm.length === 0) {
    throw new Error(`Oops, there is no 'form#myForm'`);
}


const INPUTS = {};


(function initializeInputs() {
    _.each(consts.ALL_FIELD_NAMES, name => {
        const selector = `input[name="${name}"]`;
        const input = myForm.find(selector);
        
        assertSelectorSucceeded(selector, input);
        
        INPUTS[name] = input;
    });
})();


function assertSelectorSucceeded(selector, result) {
    if (result.length === 0) {
        throw new Error(`Oops, there is no ${selector}`);
    }
}


function setInputValue(name, value) {
    if (_.has(INPUTS, name)) {
        INPUTS[name].val(value);
    }
}


function getInputValue(name) {
    if (_.has(INPUTS, name)) {
        return INPUTS[name].val();
    }
    return void 0;
}


function setInvalidState(name) {
    if (_.has(INPUTS, name)) {
        INPUTS[name].addClass("error");
    }
}


function setValidState(name) {
    if (_.has(INPUTS, name)) {
        INPUTS[name].removeClass("error");
    }
}


exports.getInputValue = name => getInputValue(name);


exports.setInputValue = (name, value) => setInputValue(name, value);


exports.getFormAction = () => myForm.attr("action");


exports.setFieldInvalid = name => setInvalidState(name);


exports.resetFieldStates = () => _.each(consts.ALL_FIELD_NAMES, name => setValidState(name));


exports.lockSendButton = () => myForm.find("#submit").prop("disabled", true);


exports.unlockSendButton = () => myForm.find("#submit").prop("disabled", false);