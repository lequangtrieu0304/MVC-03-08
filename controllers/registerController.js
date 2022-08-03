const dataUsers = {
    users: require('../model/user.json'),
    setUsers: function(data){
        this.users = data
    }
}

const path = require('path')
const fsPromise = require('fs').promises
const bcrypt = require('bcrypt')

const handledRegister = async (req, res) => {
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(400).json({'message': 'user and password are require!'})

    const checkedUser = dataUsers.users.find(per => per.username === user)
    if(checkedUser) return res.status(400).json({'message': 'User da ton tai ^-^'})

    try{
        const hashedPwd = await bcrypt.hash(pwd, 10)
        const newUser = {
            "username": user,
            "password": hashedPwd
        }
        dataUsers.setUsers([...dataUsers.users, newUser])
        await fsPromise.writeFile(
            path.join(__dirname, '../', 'model', 'user.json'),
            JSON.stringify(dataUsers.users)
        )
        res.json(dataUsers.users)
    }
    catch (err){
        console.log(err);
        res.status(500).json('loi server')
    }
}

module.exports = {
    handledRegister
}