const express = require('express');
const KategoriController = require('../../controllers/category');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

router.post('/create', checkAuth, KategoriController.kategoriCreate);
router.delete('/delete/:id', checkAuth, KategoriController.kategoriDelete);
router.put('/update/:id', checkAuth, KategoriController.kategoriUpdate);
router.get('/', KategoriController.kategoriGet);


//////mission api 

router.post('/mission/create/:id', checkAuth, KategoriController.missionCreate);
router.delete('/mission/delete/:id/:ind', KategoriController.missionDelete);
router.put('/mission/update/:id/:ind', KategoriController.missionUpdate);

module.exports= router;
