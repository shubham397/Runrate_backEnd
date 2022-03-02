const Contact = require('../models/contacts')
const mongoose = require('mongoose')

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhone = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      );
  };

/*
    addContact
*/
exports.addContact = async(req, res) => {
    let response ={
        code:200,
        message:'',
        data:[]
    }
    try {
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let userId = req.body.userId;
        if(userId.length<10){
            throw new Error('Must be a valid UserId')
        }
        if(name.length<4){
            throw new Error('Name must be greater then 4 characters long')
        }
        if(validatePhone(phone) === null){
            throw new Error('Must be a valid phone')
        }
        if(validateEmail(email) === null){
            throw new Error('Must be a valid email')
        }
        await Contact.create({
            Name: name,
            Email: email,
            Phone: phone,
            UserId: mongoose.Types.ObjectId(userId)
        });
        response.message = "Contact created successfully!"
        return res.send(response);
    } catch (error) {
        response.code = 400;
        response.message = error.message;
        return res.send(response);
    }
}

/*
    getAllContacts
*/
exports.getAllContacts = (req, res) => {
    let response ={
        code:200,
        message:'',
        data:[]
    }
    try {
        let userId = mongoose.Types.ObjectId(req.params.userId);
        if(userId.length<10){
            throw new Error('Must be a valid userId')
        }
        Contact.find({UserId: userId}).then((contact)=>{
            response.message = 'Successfully fetched'
            response.data = contact
            return res.send(response);
        })
    } catch (error) {
        response.code = 400;
        response.message = error.message;
        return res.send(response);
    }
}

/*
    deleteContact
*/
exports.deleteContact = (req, res) => {
    let response ={
        code:200,
        message:'',
        data:[]
    }
    try {
        let userId = mongoose.Types.ObjectId(req.body.userId);
        let contactId = mongoose.Types.ObjectId(req.params.contactId)
        if(userId.length<10){
            throw new Error('Must be a valid userId')
        }
        if(contactId.length<10){
            throw new Error('Must be a valid contactId')
        }
        Contact.deleteOne({UserId: userId, _id: contactId}).then((contact)=>{
            if(contact.deletedCount === 1){
                response.message = 'Deleted Successfully!'
                return res.send(response);
            }
            else{
                response.code = 400;
                response.message = 'Contact does not exist';
                return res.send(response);
            }
            
        })
    } catch (error) {
        response.code = 400;
        response.message = error.message;
        return res.send(response);
    }
}

