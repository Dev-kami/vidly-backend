const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomers = (customer) => {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
    });

    const result = schema.validate(customer);
    return result;
};

exports.Customer = Customer;
exports.validate = validateCustomers;
