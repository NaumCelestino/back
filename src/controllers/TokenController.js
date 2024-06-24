const jwt = require('jsonwebtoken')
const User = require('../models/User');

class TokenController{
    async store(req, res){
        try{
            const { email, password } = req.body;
            console.log(email, password)
            if(!email || !password) {
                return res.status(401).json({ error: ['Credenciais invalidas!'] });
            }
            const usuario = await User.findOne({ where: { email } });
            if(!usuario){
                return res.status(401).json({ error: ['Credenciais invalidas!!'] });
            }
            if(!(await usuario.passwordIsValid(password))) {
                return res.status(401).json({ error: ['Credenciais invalidas3!!!'] });
            }
            const { id } = usuario;
            const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            });
            return res.json({ token });
        }catch(e){
            console.log(e)
            return res.status(400).json({ erro: e})
        }
    }  
}
module.exports = TokenController;