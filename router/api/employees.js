const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController')


router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createEmployess)
    .put(employeesController.updateEmployees)
    .delete(employeesController.deleteEmployees)

router.get('/:id', employeesController.getEmployeesById)

module.exports = router;
