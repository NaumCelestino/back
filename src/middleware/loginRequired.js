const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).json({ 
            errors: [ 'Login required'],
        });
    }
    const token  = authorization.split(' ')[1];
    console.log("token", token);
    try{
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id } = dados;
        req.usuarioId = id;
        req.usuarioCpf = cpf;
        return next();
    }catch(e){
        return res.status(401).json(e)
    }
}