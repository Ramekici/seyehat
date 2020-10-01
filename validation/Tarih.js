const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateTarihInput = (data) => {
    let errors={};

    data.title= !isEmpty(data.title) ? data.title : '';
    data.info= !isEmpty(data.info) ? data.info : '';
    data.date= !isEmpty(data.date) ? data.date : '';

    if(Validator.isEmpty(data.title)){
        errors.titl= 'Başlık Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.info)){
        errors.inf= 'Açıklama Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.date)){
        errors.dat= 'Tarih Alanı Boş Bırakılmamalıdır.'
    }
    
    return{
        errors,
        isValid:isEmpty(errors)
    }
};
