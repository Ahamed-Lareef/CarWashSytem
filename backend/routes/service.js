const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
const { getServices, getSingleService, updateService, deleteService, newService } = require('../controllers/serviceController');

router.route('/services').get( getServices);
//router.route('/booking/new').post(isAuthenticatedUser, authorizeRoles('admin','customer'), newBooking);
router.route('/service/:id')
                            .get(getSingleService)
                            .put(updateService)
                            .delete(deleteService)

                        
//Admin routes
router.route('/admin/service/new').post(isAuthenticatedUser, authorizeRoles('admin'), newService);

module.exports = router;