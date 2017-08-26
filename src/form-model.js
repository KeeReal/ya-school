"use strict";


const _ = require("underscore");
const formView = require("./form-view");
const consts = require("./consts");


exports.getValue = fieldName => formView.getInputValue(fieldName);


exports.setData = data => {
    if (_.isObject(data)) {
        _.each(consts.ALL_FIELD_NAMES, name => formView.setInputValue(name, data[name]));
    }
};


exports.getData = () => {
    return _.reduce(
        consts.ALL_FIELD_NAMES,
        (memo, name) => {
            memo[name] = formView.getInputValue(name);
            return memo;
        },
        {});
};