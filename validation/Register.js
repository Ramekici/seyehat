const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateRegisterInput = (data) => {
    let errors= {} ;

    data.name= !isEmpty(data.name) ? data.name : '';
    data.lastName= !isEmpty(data.lastName) ? data.lastName : '';
    data.email= !isEmpty(data.email) ? data.email : '';
    data.password= !isEmpty(data.password) ? data.password : '';
    data.rePassword= !isEmpty(data.rePassword) ? data.rePassword : '';

    if(Validator.isEmpty(data.name)){
        errors.nme = 'İsim alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.lastName)){
        errors.lstName = 'Soyad alanı boş bırakılmamalıdır.'
    }
    if(!Validator.isLength(data.name, {min:2, max:30})){
        errors.nme ="İsim alanı 2 ile 30 karakter arasında girilmelidir."
    }
    if(!Validator.isLength(data.lastName, {min:2, max:30})){
        errors.lstName ="Soyad alanı 2 ile 30 karakter arasında girilmelidir."
    }
    if(Validator.isEmpty(data.email)){
        errors.emil= 'Email alanı boş bırakılmamalıdır.'
    }

    if(!Validator.isEmail(data.email)){
        errors.emil= 'Geçerli bir email adresi giriniz.'
    }

    if(Validator.isEmpty(data.password)){
        errors.psswd= 'Parola alanı boş bırakılmamalıdır.'
    }

    if(!Validator.isLength(data.password, {min:8, max:20})){
        errors.psswd= 'Minumum 8 karakter giriniz.'
    }

    if(Validator.isEmpty(data.rePassword)){
        errors.rePsswd = 'Parola doğrulama alanı boş bırakılmamalıdır'
    }
    if(!Validator.equals(data.password, data.rePassword)){
        errors.rePsswd = 'Parolalar birbiri ile uyumlu değil.';
    }


    return{
        errors,
        isValid:isEmpty(errors)
    }
};
