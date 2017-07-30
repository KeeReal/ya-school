"use strict";


const emailValidator = require("email-validator");


class ValidationResult {
    /**
     * @param reason
     * @returns {ValidationResult}
     */
    static invalid(reason) {
        return new ValidationResult(false, reason);
    }
    
    
    /**
     * @returns {ValidationResult}
     */
    static valid() {
        return new ValidationResult(true);
    }
    
    
    constructor(valid, reason = null) {
        this.valid = valid;
        this.reason = reason;
    }
}


/**
 * @type {ValidationResult}
 * */
exports.ValidationResult = ValidationResult;

exports.REASONS = {
    FULL_NAME_TYPE: "fullname: invalid type",
    FULL_NAME_EMPTY: "fullname: empty string",
    FULL_NAME_COUNT: "fullname: three words are required",
    
    EMAIL_EMPTY: "email: empty string",
    EMAIL_TYPE: "email: invalid type",
    EMAIL_NOT_AN_EMAIL: "email: not an email",
    EMAIL_FORMAT: "email: invalid domain",
    
    TEL_EMPTY: "tel: empty string",
    TEL_FORMAT: "tel: invalid format",
    TEL_TYPE: "tel: invalid type",
    TEL_COUNT: "tel: invalid amount"
};


/**
 * Ровно три слова
 * @param fullName
 * @returns {ValidationResult}
 */
exports.isFullNameValid = fullName => {
    if (typeof fullName !== "string") {
        return ValidationResult.invalid(exports.REASONS.FULL_NAME_TYPE);
    }
    
    if (fullName.length === 0) {
        return ValidationResult.invalid(exports.REASONS.FULL_NAME_EMPTY);
    }
    
    if (fullName.split(" ").length !== 3) {
        return ValidationResult.invalid(exports.REASONS.FULL_NAME_COUNT);
    }
    
    return ValidationResult.valid();
};


/**
 * Формат email-адреса, но только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com.
 * @param email
 * @returns {ValidationResult}
 */
exports.isEmailValid = email => {
    if (typeof email !== "string") {
        return ValidationResult.invalid(exports.REASONS.EMAIL_TYPE);
    }
    
    if (email.length === 0) {
        return ValidationResult.invalid(exports.REASONS.EMAIL_EMPTY);
    }
    
    if (!emailValidator.validate(email)) {
        return ValidationResult.invalid(exports.REASONS.EMAIL_NOT_AN_EMAIL);
    }
    
    const DOMAIN_RE = /@([\w.]+)$/ig;
    const result = DOMAIN_RE.exec(email);
    if (!result) {
        throw new Error("Are you kidding me!?");
    }
    
    // todo: regexp?
    const ALLOWED_DOMAINS = ["ya.ru", "yandex.ru", "yandex.ua", "yandex.by", "yandex.kz", "yandex.com"];
    const domain = (result[1] || "").toLowerCase();
    if (ALLOWED_DOMAINS.indexOf(domain) === -1) {
        return ValidationResult.invalid(exports.REASONS.EMAIL_FORMAT);
    }
    
    return ValidationResult.valid();
};


/**
 * Номер телефона, который начинается на +7, и имеет формат +7(999)999-99-99. Кроме того, сумма всех цифр
 * телефона не должна превышать 30. Например, для +7(111)222-33-11 сумма равняется 24,
 * а для +7(222)444-55-66 сумма равняется 47
 * @param tel
 * @returns {ValidationResult}
 */
exports.isTelValid = tel => {
    if (typeof tel !== "string") {
        return ValidationResult.invalid(exports.REASONS.TEL_TYPE);
    }
    
    if (tel.length === 0) {
        return ValidationResult.invalid(exports.REASONS.TEL_EMPTY);
    }
    
    const FORMAT_RE = /\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}/;
    if (!tel.match(FORMAT_RE)) {
        return ValidationResult.invalid(exports.REASONS.TEL_FORMAT);
    }
    
    const REMOVE_RE = /[()+\-]/g;
    const numbers = tel.replace(REMOVE_RE, "");
    const SUM_MAX = 30;
    
    let sum = 0;
    for (let i = 0; i < numbers.length;++i) {
        sum += +numbers[i];
    }
    
    if (sum > SUM_MAX) {
        return ValidationResult.invalid(exports.REASONS.TEL_COUNT);
    }
    
    return ValidationResult.valid();
};