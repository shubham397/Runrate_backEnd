const jwtToken = require('../middlewares/authToken')
const bcrypt = require('bcrypt')
let User = require('../models/users')

/*
    SignUp
*/

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

exports.signUp = async(req, res) => {
    let response ={
        code:200,
        message:'',
        data:[]
    }
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        if(name.length<4){
            throw new Error('Name must be greater then 4 characters long')
        }
        if(validateEmail(email) === null){
            throw new Error('Must be a valid email')
        }
        await User.create({
            Name: name,
            Email: email,
            Password: bcrypt.hashSync(password, 8),
        });
        response.message = "User registered successfully!"
        return res.send(response);
    } catch (error) {
        response.code = 400;
        response.message = error.message;
        return res.send(response);
    }
}

/*
    login
*/
exports.login = async(req, res) => {
    let response ={
        code:200,
        message:'',
        data:[]
    }
    try {
        let email = req.body.email;
        let password = req.body.password;
        if(validateEmail(email) === null){
            throw new Error('Must be a valid email')
        }
        User.findOne({Email: email}).then((user)=>{
            if(user){
                const passwordIsValid = bcrypt.compareSync(
                    password,
                    user.Password
                );
                if(passwordIsValid){
                    response.message = 'Token generated successfully!'
                    response.data.push({
                        token:jwtToken.generateAccessToken(email),
                        userId: user._id
                    })
                    return res.send(response);  
                }
                else{
                    response.code = 400;
                    response.message = 'Email or Password mismatch'
                    return res.send(response);  
                }
            }
            else{
                response.code = 400;
                response.message = 'User does not exist';
                return res.send(response);
            }
        })
    } catch (error) {
        response.code = 400;
        response.message = error.message;
        return res.send(response);
    }
}