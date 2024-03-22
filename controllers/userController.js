const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = ('##dasdsa##');

const userController = {
    getAllUsers: async (req, res) =>{
        try{
            const users = await User.find();
            res.json(users);
        }catch(error){
            console.error('Error al obtener usuarios:',error);
            res.status(500).json({message:'Internal Server Error'});
        }
    },
    register: async (req, res) =>{
        try{
            const users = await User.find();
            const{name,email,password}=req.body;

            const userData ={
                userid:users.length+1,
                name:name,
                email:email,
                password:await bcrypt.hash(password,10)
            }
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser)
        }catch(error){
            console.error('Error al registar usuario:',error);
            res.status(500).json({message:'Internal Server Error'});
        }
    },

    login: async (req, res) =>{
        try{
            const{email,password}=req.body;
            const user = await User.find({email:email});

            if(!user){
                return res.status(400).json({message:"Invalid username or password"});
            }
            const isPasswordValid = await bcrypt.compare(password,user[0].password);
            
            if(!isPasswordValid){
                console.log("malo");
                return res.status(400).json({message:"Invalid username or password"});
            }

            const token = jwt.sign({userid:user.id},jwt_secret,{expiresIn:"1h"})
            res.json({message:"logged in successfully",token})
        }catch(error){
            console.log('Error al loguear usuario:',error);
            res.status(500).json({message:'Internal Server Error'});
        }
    },
};

module.exports = userController;
