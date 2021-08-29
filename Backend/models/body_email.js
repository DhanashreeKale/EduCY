const mongoose= require('mongoose');
const Joi = require('joi');

const emailBody = mongoose.model('emailBody', new mongoose.Schema({
    from: {
        type:String,
        required: true
    },
    subject: {
        type: String,
        maxlength: 70
    },
    body: {
        type: String,
        maxlength:255 
        
    }
}));

function validateEmailBody(body_email){
    const schema ={
        from: Joi.string().required(),
        subject: Joi.string().max(70),
        body: Joi.string().max(255)
    };
    return Joi.validate(body_email,schema);
}

exports.emailBody = emailBody;
exports.validateEmailBody = validateEmailBody;