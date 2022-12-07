    /**
 * 
 */
const { response } = require('express');
const User = require('../../models/users/users.model');
const Roles = require('../../models/users/roles.model');
const Status = require('../../models/status/status.models');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../../helpers/jwt.helper');


const getUsers = async (req, res = response) => {

    const users = await User.find({}, 'firstName lastName email roleId status userId')            
    .populate('statusId', 'statusName');

    res.json({
        ok: true,
        users,
        //userId : req.userId
    })
}

const getUserByName = async(req, res = response) => {
    const {firstName}= req.body
    try {
        const users = await User.findOne({firstName : firstName})
        .populate('statusId', 'statusName');

        res.json({
            ok: true,
            users,
            //userId : req.userId
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

const createUser = async (req, res = response) => {

    const { email, password, roleId, statusId } = req.body;


    try {
       
        const existStatusId = await Status.findById(statusId);
        const existEmail = await User.findOne({ email });

        /*if (!existStatusId) {
            return res.status(400).json({
                ok: false,
                msg: 'Status Invalido'
            });
        };*/


        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un correo electrónico registrado con esa dirección"
            });
        };

        const user = new User(req.body);
        //enccriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };


};


const updatePass = async(req, res = response) => {

    const userId = req.params.id;
    const { password, email} = req.body

    try {
      
      
       const salt = bcrypt.genSaltSync();
       this.password = bcrypt.hashSync(password, salt);
       
        const userUpdated = await User.updateOne({
            "email" : email},{
            $set:{
                "password": this.password}},{
            multi:false
        }
    )

        res.json({
            ok: true,
            userUpdated
            
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

}

const updateUser = async (req, res = response) => {
   // const userId = req.params.id;
    try {

    
        //delete fields.password;/* si deseamos no actualizar un campo*/
       const {firstName, lastName, email, roleId, statusId, userId}  = req.body;

        const userUpdated = await User.updateOne({
            'userId': userId
        }, {
            $set: {
                'firstName' : firstName,
                'lastName' : lastName,
                'email' : email,
                'roleId' : roleId,
                'statusId': statusId

            }
        }, {multi: false})

        res.json({
            ok: true,
            userUpdated
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

};



const deleteUser = async (req, res = response) => {

    const{userId} = req.body;
    try {
      
        const deletedUser = await User.deleteOne({userId: userId});
        res.json({
            ok: true,
            deletedUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};

const usuarioRol = async (req, res = response) => {

 
    
};


module.exports = {
    getUsers,
    usuarioRol,
    createUser,
    updateUser,
    deleteUser,
    updatePass,
    getUserByName
}
