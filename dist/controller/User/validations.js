"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
exports.validation = {
    create: {
        name: {
            required: true,
            regex: '^[a-zA-Z\\s]*$',
            string: true,
            in: ['body'],
            errorMessage: 'Name is required',
        },
        email: {
            required: true,
            regex: '([a-zA-Z0-9\+_.])+@successive.tech',
            in: ['body'],
            errorMessage: 'email is required'
        },
        mob: {
            required: true,
            number: true,
            in: ['body'],
            errorMessage: 'Number is required in mobile'
        },
        address: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'Address is required'
        },
        dob: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'Dob is required'
        },
        password: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'password is required'
        },
    },
};
exports.default = exports.validation;
//# sourceMappingURL=validations.js.map