"use strict";


const _ = require("underscore");


const INPUT_NAMES = {
    FIO: "fio",
    EMAIL: "email",
    TEL: "tel"
};
const INPUT_NAMES_KEYS = _.values(INPUT_NAMES);



exports.FIELD_NAMES = INPUT_NAMES;
exports.ALL_FIELD_NAMES = INPUT_NAMES_KEYS;