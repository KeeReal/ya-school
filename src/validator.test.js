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
    
    
    describe("#isTelValid", () => {
        it("")
    });
});


/**
 * @param {ValidationResult} result
 */
function assertValid(result) {
    should(result).be.instanceOf(validator.ValidationResult);
    should(result.valid).be.exactly(true);
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