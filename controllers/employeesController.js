const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) {
        this.employees = data
    }
}

const fsPromise = require('fs').promises
const path = require('path')

const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createEmployess = async (req, res) => {
    try {
        const newEmployees = {
            id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }

        if (!newEmployees.firstname || !newEmployees.lastname) return res.status(400).json({ 'message': 'First and last name are require!' })
        data.setEmployees([...data.employees, newEmployees])
        await fsPromise.writeFile(
            path.join(__dirname, '../', 'model', 'employees.json'),
            JSON.stringify(data.employees)
        )
        res.json(data.employees)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'loi server' })
    }
}

const updateEmployees = async (req, res) => {

    const employees = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if (!employees) return res.status(400).json('Not Found ID!')
    try {
        let newFirstname = req.body.firstname
        let newLastname = req.body.lastname
        if (newFirstname) employees.firstname = newFirstname
        if (newLastname) employees.lastname = newLastname

        const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
        const unsortArray = [...filteredArray, employees]
        data.setEmployees(unsortArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

        await fsPromise.writeFile(
            path.join(__dirname, 'model', 'employees.json'),
            JSON.stringify(data.employees)
        )
        res.json(data.employees)
    }
    catch (err) {
        res.status(500).json('loi server')
    }
}

const deleteEmployees = async (req, res) => {
    const employees = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if (!employees) return res.status(400).json({ 'message': 'Not Found ID!' })

    try {
        const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
        data.setEmployees(filteredArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

        await fsPromise.writeFile(
            path.join(__dirname, 'model', 'employees.json'),
            JSON.stringify(data.employees)
        )
        res.json(data.employees)
    }
    catch (err) {
        res.status(500).json('loi server!')
    }
}

const getEmployeesById = (req, res) => {
    const employees = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if (!employees) return res.status(400).json({ 'message': 'Not Found ID!' })

    res.status(200).json(employees)
}

module.exports = {
    getAllEmployees,
    createEmployess,
    updateEmployees,
    deleteEmployees,
    getEmployeesById
}