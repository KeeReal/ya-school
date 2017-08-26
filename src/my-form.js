"use strict";


const _ = require("underscore");
const $ = require("jquery");
const consts = require("./consts");
const validator = require("./validator");
const formModel = require("./form-model");
const formView = require("./form-view");
const resultView = require("./result-view");


/**
 *
 * @param data
 * @returns {number}
 */
exports.setData = data => {
    formModel.setData(data);
};


exports.getData = () => {
    return formModel.getData();
};


exports.validate = () => {
    let isValid = true;
    let errorFields = [];
    
    _.each(consts.ALL_FIELD_NAMES, fieldName => {
        const r = validator.isFieldValueValid(fieldName, formModel.getValue(fieldName));
        if (!r.valid) {
            isValid = false;
            errorFields.push(fieldName);
        }
    });
    
    return { isValid, errorFields };
};


exports.submit = () => {
    formView.resetFieldStates();
    
    
    const v = exports.validate();
    
    if (!v.isValid) {
        _.each(v.errorFields, name => formView.setFieldInvalid(name));
        return;
    }
    
    const action = formView.getFormAction();
    
    sendImpl(action, formModel.getData());
};


function sendImpl(url, data) {
    formView.lockSendButton();
    
    $.post(url, data, response => {
        if (!_.isObject(response)) {
            throw new Error("Invalid response");
        }
        
        switch (response.status) {
            case "success":
                resultView.setSuccess();
                resultView.setText("Success");
                formView.unlockSendButton();
                break;
            
            case "error":
                resultView.setError();
                resultView.setText(response.reason);
                formView.unlockSendButton();
                break;
            
            case "progress":
                resultView.setProgress();
                resultView.setText("Progress");
                const timeout = +response.timeout || 0;
                if (timeout === 0) {
                    return;
                }
                setTimeout(sendImpl.bind(null, url, data), timeout);
                break;
        }
    });
}