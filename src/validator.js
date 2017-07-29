"use strict";


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
    FULL_NAME_COUNT: "fullname: three words are required"
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
 * @returns {boolean}
 */
exports.isEmailValid = email => {

};


/**
 * Номер телефона, который начинается на +7, и имеет формат +7(999)999-99-99. Кроме того, сумма всех цифр
 * телефона не должна превышать 30. Например, для +7(111)222-33-11 сумма равняется 24,
 * а для +7(222)444-55-66 сумма равняется 47
 * @param tel
 * @returns {boolean}
 */
exports.isTelValid = tel => {

};