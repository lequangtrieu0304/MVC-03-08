const dataUsers = {
    users: require('../model/user.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const handledLogin = async (req, res) => {

    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'User and pwd are require!' })

    const userLogin = dataUsers.users.find(per => per.username === user)
    if (!userLogin) return res.status(400).json({ 'message': 'user khong ton tai!' })

    try {
        const checkedPwd = await bcrypt.compare(pwd, userLogin.password)
        if (!checkedPwd) {
            return res.status(400).json('pwd khong dung!')
        } else {
            const accessToken = jwt.sign(
                { 'username': userLogin.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            )
            res.json(accessToken)
        }
    }
    catch (err) {
        res.status(500).json('loi server')
    }
}

module.exports = {
    handledLogin
}