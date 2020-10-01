const express = require('express');
const TarihController = require('../../controllers/tarihBugun');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');


router.post('/tarihtebugun', checkAuth, TarihController.tarihverileriCreated);
router.get('/tarihte', TarihController.tarihverileriGettor);
router.get('/tarihindeki', TarihController.tarihverileriBelirli);
router.delete('/tarihdelete/:id', checkAuth, TarihController.tarihverileriBelirliDelete);
router.put('/tarihupdate/:id', checkAuth, TarihController.tarihverileriBelirliUpdate);



module.exports= router;
