const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateGazeteInput = (data) => {
    let errors={};

    data.title= !isEmpty(data.title) ? data.title : '';
    data.description= !isEmpty(data.description) ? data.description : '';
    data.name= !isEmpty(data.name) ? data.name : '';
    data.date= !isEmpty(data.date) ? data.date : '';

    if(Validator.isEmpty(data.title)){
        errors.titl= 'Başlık Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.description)){
        errors.desc= 'Açıklama Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.name)){
        errors.nam = 'Gazete Adı Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.date)){
        errors.dat= 'Tarih Alanı Boş Bırakılmamalıdır.'
    }
    
    return{
        errors,
        isValid:isEmpty(errors)
    }
};
