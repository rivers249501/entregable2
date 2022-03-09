const express = require('express')

const router = express.Router()

const { 
    getAllUser,
    createUser,
    getUserById,
    //viewUser
} = require('../controllers/users.controller')

router.get('/', getAllUser)

router.get('/:id', getUserById)
                   
router.post('/', createUser)



//router.view('/', viewUser)

module.exports = { usersRouter: router }