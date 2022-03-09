const express = require('express')

const router = express.Router()

const { 
    getAllUser,
    createUser,
    //viewUser
} = require('../controllers/users.controller')

router.get('/', getAllUser)
                   
router.post('/', createUser)

//router.view('/', viewUser)

module.exports = { usersRouter: router }