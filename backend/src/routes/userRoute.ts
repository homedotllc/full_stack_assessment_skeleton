const express = require('express')
const router = express.Router()

// controllers 
import userController from '../controller/userController'

router.get('/find-all' , userController.findAll)
router.get('/find-by-home' , userController.findByHome)



module.exports = router
