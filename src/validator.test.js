"use strict";


const should = require("should");
const validator = require("./validator");


describe("validator", () => {
    describe("#isFullNameValid", () => {
        const isFullNameValid = validator.isFullNameValid;
        
        it("must be valid", () => {
            assertValid((isFullNameValid("Ivanov Ivan Ivanovich")))
        });
        
        
        it("three words are required", () => {
            assertInvalid(isFullNameValid("Ivanov Ivan"), validator.REASONS.FULL_NAME_COUNT);
        });
        
        
        it("empty string are not allowed", () => {
            assertInvalid(isFullNameValid(""), validator.REASONS.FULL_NAME_EMPTY);
        });
        
        
        it("invalid type (null)", () => {
            assertInvalid(isFullNameValid(null), validator.REASONS.FULL_NAME_TYPE);
        });
    });
    
    
    describe("#isEmailValid", () => {
        const isEmailValid = validator.isEmailValid;
        
        it("must be valid (uppercase)", () => {
            assertValid(isEmailValid("hello@YA.RU"));
        });
    
    
        it("must be valid (lowercase)", () => {
            assertValid(isEmailValid("hello@yandex.ru"));
        });
    
    
        it("invalid type given", () => {
            assertInvalid(isEmailValid(null), validator.REASONS.EMAIL_TYPE);
        });
    
    
        it("empty string are not allowed", () => {
            assertInvalid(isEmailValid(""), validator.REASONS.EMAIL_EMPTY);
        });
    
    
        it("not an email", () => {
            assertInvalid(isEmailValid("helloworld.r.r.r"), validator.REASONS.EMAIL_NOT_AN_EMAIL);
        });
        
        
        it("invalid domain", () => {
            assertInvalid(isEmailValid("hello@yand.ru"), validator.REASONS.EMAIL_FORMAT);
        });
    });
    
    
    describe("#isTelValid", () => {
        const isTelValid = validator.isTelValid;
        
        
        it("must be valid", () => {
            assertValid(isTelValid("+7(111)222-33-11"));
        });
        
        
        it("invalid type given", () => {
            assertInvalid(isTelValid(null), validator.REASONS.TEL_TYPE);
        });
        
        
        it("empty string are not allowed", () => {
            assertInvalid(isTelValid(""), validator.REASONS.TEL_EMPTY);
        });
        
        
        it("invalid format", () => {
            assertInvalid(isTelValid("+7(999)999-99-9A"), validator.REASONS.TEL_FORMAT);
        });
        
        
        it("sum of numbers exceed maximum", () => {
            assertInvalid(isTelValid("+7(999)999-99-92"), validator.REASONS.TEL_COUNT);
        });
    });
});


/**
 * @param {ValidationResult} result
 */
function assertValid(result) {
    should(result).be.instanceOf(validator.ValidationResult);
    should(result.valid).be.exactly(true, result.reason);
}


/**
 * @param {ValidationResult} result
 * @param {string} reason
 */
function assertInvalid(result, reason) {
    should(result).be.instanceOf(validator.ValidationResult);
    should(result.valid).be.exactly(false);
    should(result.reason).be.exactly(reason);
}