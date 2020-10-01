const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateVerilerInput = (data) => {
    let errors = {};

    data.category = !isEmpty(data.category) ? data.category : '';
    data.mission = !isEmpty(data.mission) ? data.mission : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.surName = !isEmpty(data.surName) ? data.surName : '';
    data.start = !isEmpty(data.start) ? data.start : '';
    data.end = !isEmpty(data.end) ? data.end : '';

    if(Validator.isEmpty(data.category)){
        errors.categor= 'Kategori Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.mission)){
        errors.missio= 'Görev Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.name)){
        errors.nam= 'İsim Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.surName)){
        errors.surNam= 'Soyad Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.start)){
        errors.starDat= 'Görev Başlangıç Alanı Boş Bırakılmamalıdır.'
    }
    if(Validator.isEmpty(data.end)){
        errors.endDat= 'Görev Bitiş Alanı Boş Bırakılmamalıdır.'
    }
    
    return{
        errors,
        isValid:isEmpty(errors)
    }
};
