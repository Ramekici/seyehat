const Validator= require('validator');
const isEmpty = require('./is-empty');
const isZero = require('./is-zero');

module.exports = validateUrunlerInput=(data)=>{
    let errors={};

    data.isim= !isEmpty(data.isim)? data.isim:'';
    data.marka= !isEmpty(data.marka)? data.marka:'';
    data.fiyat= (!isEmpty(data.fiyat) ) ? data.fiyat:'';
    data.miktar= (!isEmpty(data.miktar)) ? data.miktar:'';
    data.sektor= !isEmpty(data.sektor)? data.sektor:'';
    data.aciklama= !isEmpty(data.aciklama)? data.aciklama:'';

    if(Validator.isEmpty(data.isim)){
        errors.ism= 'İsim alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.sektor)){
        errors.sktr= 'Sektor alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.marka)){
        errors.mrk= 'Marka alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.fiyat)){
        errors.fyt= 'Fiyat alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.miktar)){
        errors.mktr= 'Miktar alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.aciklama)){
        errors.aciklm= 'Açıklama alanı boş bırakılmamalıdır'
    }
    if(!Validator.isLength(data.aciklama,{min:10, max:200})){
        errors.aciklm= 'Açıklama alanı 200 karakter ile sınırlandırılmıştır.'
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
};
