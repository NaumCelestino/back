const User  = require('../models/User');
const send_email = require('../email');
const _ = require('lodash');


const validation_cpf = (strCPF)=>{
    let Soma;
    let Resto;
    Soma = 0;
    let i = 1;
    if(!strCPF) return false;
    if (strCPF.length !== 11) return false;
    if (strCPF === "00000000000") return false;
    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10)) ) return false;
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}
const  generateRandomString = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 6; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result1;
}
class UserController{
    async store(req, res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const { cpf, email } = req.body;
                if(!validation_cpf(cpf)){
                    return res.status(400).json({ erro: "CPF inválido" });
                }
                const cpf_exist = await User.findOne({ where: { cpf: cpf } });
                if(cpf_exist){
                    return res.status(400).json({ erro: "CPF já cadastrado" });
                }
                const email_exist = await User.findOne({ where: { email: email}})
                if(email_exist){
                    return res.status(400).json({ erro: "Email já cadastrado" });
                }
                const newUser = await User.create(req.body);
                const userReturn = {
                    id: newUser.id,
                    nome: newUser.nome,
                    cpf: newUser.cpf,
                    user_type: newUser.user_type,
                    email: newUser.email
                }
                return res.status(200).json(userReturn);
            });   
        }catch(e){
            console.log(e)
            return res.status(400).json({ erro: e })
        }
    }
    async select(req,res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const user = await User.findByPk(req.params.id);
                const userReturn = {
                    id: user.id,
                    nome: user.nome,
                    cpf: user.cpf,
                    user_type: user.user_type,
                    email: user.email
                }
                return res.json(userReturn);
            });
        }catch(e){
            return res.json(null)
        }
    }
    async selectLogin(req, res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const id = req.usuarioId;
                const user = await User.findByPk(id);
                const userReturn = {
                    id: user.id,
                    nome: user.nome,
                    cpf: user.cpf,
                    user_type: user.user_type,
                    email: user.email
                }
                return res.status(200).json(userReturn);
            });
        }catch(e){ 
            return res.status(400).json({ erro: e });
        }
    }
    async select_cpf(req,res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const cpf = _.get(req, "params.cpf", "");
                const user = await User.findOne({ where: { cpf: cpf } });
                const userReturn = {
                    id: user.id,
                    nome: user.nome,
                    cpf: user.cpf,
                    user_type: user.user_type,
                    email: user.email
                }
                return res.json(userReturn);
            });
        }catch(e){
            return res.json({ error: e })
        }
    }
    async allUsers(req, res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const usuarios = await User.findAll();
                console.log(usuarios);
                const users = usuarios.map(user => {
                    return{
                        id: user.id,
                        nome: user.nome,
                        cpf: user.cpf,
                        user_type: user.user_type,
                        email: user.email
                    }
                });
                return res.json(users);
            });
        }catch(e){
            console.log(e)
            res.status(400).json({ error: e })
        }
    }
    async update(req, res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const user = await User.findByPk(req.params.id);
                const newUser = user.update(req.body);
                return res.json(newUser);
            });
        }catch(e){
            return res.json(null)
        }
    }
    async changePassword(req, res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const { id, password } = req.body;
                if(!id){
                    return res.status(400).json({ erro: "Id não informado" });
                }
                if(!password){
                    return res.status(400).json({ erro: "senha não informado" });
                }
                const user = await User.findByPk(id);      
                const newUser = user.update({ password: password });
                return res.json(newUser);
            });
        }catch(e){
            return res.json({ error: e })
        }
    }
    async delete(req, res){
        try{
            const result = await User.sequelize.transaction(async (t) => {
                const { id } = req.params;
                if(!id){
                    return res.status(400).json({ erro: "Id não informado" });
                }
                const user = await User.findByPk(id);
                if(!user){
                    return res.status(400).json({ erro: "Usuario não encontrado" });
                }
                await user.destroy();
                return res.status(200).json({ message: "Usuario deletado com sucesso" });
            });
        }catch(e){
            return res.json({ error: e })
        }
    }
}
module.exports = UserController;