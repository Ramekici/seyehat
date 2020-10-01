const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateUserRegister = require('../validation/Register');
const validateUserLogin = require('../validation/Login');


exports.createUser = (req, res, next) => {
  const {errors, isValid} = validateUserRegister(req.body);
  if(!isValid){
     return res.status(400).json(errors);
  }
  User.findOne({email:req.body.email})
    .then(user => {
      if(user){
        return res.status(401).json({emil:"Bu adla kullanıcı mevcut"});
      } else {
        bcrypt.hash(req.body.password, 10)
        .then( hash => {
          const user = new User({
            name:req.body.name,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hash,
          });
        user.save()
        .then(result => {
          res.status(201).json({
            message: "Sayın " + result.name.toUpperCase() + " hesabınız oluşturulmuştur. " +
            result.email + " hesabınızla giriş yapabilirsiniz",
          })
        });})}
  });
}

exports.updateUser = (req, res, next)=>{
  let fetchedUser;
  User.findOne({_id:req.userData.userId})
  .then(user => {
    fetchedUser = user;
    return bcrypt.compare(req.body.oldPassword, user.password);
  })
  .then(result => {
      if(!result) {
        return res.status(401).json({
          message:"password false"
        });
      }
      bcrypt.hash(req.body.newPassword, 10)
      .then( hash => {
        fetchedUser.email = req.body.email;
        fetchedUser.password = hash;
        fetchedUser.save()
        res.status(200).json({
          message: "kullanıcı bilgileri değiştirldi"
        })
      })
    })
    .catch(err => {
      return res.status(401).json({
        message:"Auth is failed"
      });
    })
}




exports.userLogin = (req, res, next)=>{
  let adminUser= false;
  const {errors, isValid} = validateUserLogin(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }
  let fetchedUser;
  User.findOne({email:req.body.email})
    .then(user=>{
            if(!user){
                return res.status(401).json({
                  emil:"Kullanıcı bulunamadı."
                });
            }
            fetchedUser=user;
            return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if(!result){
          return res.status(401).json({
            psswd:"Parola hatalı."
          });
        }
        const payload = {userId:fetchedUser._id,
                        email: fetchedUser.email};
        if(fetchedUser.email === "ramekici@gmail.com"){
          adminUser = true;
        }
        const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn:"1h"});
        res.status(200).json({
          admin:adminUser,
          userId:fetchedUser._id,
          email: fetchedUser.email,
          token:token,
          name:fetchedUser.name,
          lastName:fetchedUser.lastName,
          expiresIn: 3600
        })
      })
      .catch(err=>{
        return res.status(401).json({
          emil:"Email veya parola hatalı"
        });
      })
}
