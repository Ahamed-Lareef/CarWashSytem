const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
const { getServices, getSingleService, updateService, deleteService, newService, getAdminServices } = require('../controllers/serviceController');
const multer = require('multer');


const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', 'uploads/service'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})})

router.route('/services').get( getServices);
//router.route('/booking/new').post(isAuthenticatedUser, authorizeRoles('admin','customer'), newBooking);
router.route('/service/:id')
                            .get(getSingleService)
                            .put(updateService)
                            .delete(deleteService)

                        
//Admin routes
router.route('/admin/service/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.single("image"), newService);
router.route('/admin/services').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminServices);

module.exports = router;