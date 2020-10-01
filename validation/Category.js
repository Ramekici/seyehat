const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateCategoryInput = (data) => {
    let errors={};

    data.category= !isEmpty(data.category) ? data.category : '';

    if(Validator.isEmpty(data.category)){
        errors.categor= 'Kategori Alanı Boş Bırakılmamalıdır.'
    }
   
    
    return{
        errors,
        isValid:isEmpty(errors)
    }
};
