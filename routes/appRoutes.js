/* const express = require('express')
const Controller = require('../controller/appController.js')
const router = express.Router();
 */
router
    .route('/login')
    .get(Controller.getLogin)
    .post(Controller.postLogin)

router
    .route('/login-error')
    .get(Controller.getLoginError)

router
    .route('/registro')
    .get(Controller.getRegistro)
    .post(Controller.postRegistro)

router
    .route('/datos')
    .get(Controller.getDatos)

router
    .route('/logout')
    .get(Controller.getLogout)


/* module.exports= router; */