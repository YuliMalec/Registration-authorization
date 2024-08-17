
const Router = require('express')

const controller = require('./authController')
const {body} =require('express-validator')
const authMiddlewaree = require('./middlewaree/authMiddlewaree')
const roleMiddlewaree = require('./middlewaree/roleMiddlewaree')
const router = new Router()

router.post('/registration',[
   body('username').notEmpty().withMessage('Username cannot be empty..'),
   body('password','Min 4,max 10').isLength({min:4,max:10}).withMessage('Min 4,max 10')
],controller.register)
router.post('/login',controller.login)
router.get('/users',roleMiddlewaree(["ADMIN"]),controller.getUsers)


module.exports=router
module.exports=router