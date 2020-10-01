const Kategori = require('../models/Category');
const validateCategoryInput = require('../validation/Category');

exports.kategoriCreate = (req, res, next)=> {
    const {errors, isValid} = validateCategoryInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const newKategori = new Kategori({
        user:req.userData.userId,
        category:req.body.category,
        link:req.body.link,
    })

    newKategori.save()
        .then(profile => res.status(201).json({
            profile: profile,
            message: "Veriler oluşturuldu..."}))
        .catch (err => {
            res.status(400).json(err);
        })
}

exports.kategoriUpdate = (req, res, next)=> {
    
    const {errors, isValid} = validateCategoryInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const newAltKategori = {  
        category:req.body.category,
        link:req.body.link
    }

    Kategori.findByIdAndUpdate(req.params.id, newAltKategori)
    .then(profile => {
        profile.save();
        res.status(201).json({message:"veriler güncellendi"})
    })
    .catch(err => {
        res.status(400).json(err);
    })
}

exports.kategoriDelete = (req, res, next)=> {

    Kategori.findOneAndDelete({_id: req.params.id})
    .then(profile => {
        res.status(201).json({message:"veriler silindi"})
    })
    .catch (err => {
        res.status(400).json(err);}
    )
}

exports.kategoriGet = (req, res, next)=> {

    Kategori.find()
    .then(profile => {
        res.status(201).json({kategoriler: profile})
    })
    .catch (err => {
        res.status(400).json(err);}
    )
}

//////////// Alt Görevler //////// 

exports.missionCreate = (req, res, next) => {
    const data = req.body.missionEl;

    Kategori.findOne({_id:req.params.id})
        .then(profile => {
            profile.missions.unshift(data);
            profile.save();
            res.status(201).json({
                profile: profile,
                message:"veriler oluşturuldu"})
        })
        .catch (err => {
            res.status(400).json(err);
        })
}



exports.missionDelete = (req, res, next)=> {

    Kategori.findById(req.params.id)
    .then(profile => {
        profile.missions.splice(req.params.ind, 1);
        profile.save();
        res.status(201).json({message:"veriler silindi"})
    })
    .catch (err => {
        res.status(400).json(err);}
    )
}

exports.missionUpdate = (req, res, next)=> {

    Kategori.findById(req.params.id)
    .then(profile => {
        const data = req.body.missionEl; 
        profile.missions.splice(req.params.ind, 1);
        profile.missions.unshift(data);
        profile.save();
        res.status(201).json({message:"veriler güncellendi"})
    })
    .catch (err => {
        res.status(400).json(err);}
    )
}



