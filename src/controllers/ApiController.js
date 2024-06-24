class ApiController{
    async teste_rota(req,res){
        return res.status(200).json({ message: 'Rotas funcionando!' });
    }
    async index(req,res){
        var obj = { message: 'Oi tudo bem!' }
        return res.status(200).json(obj);
    }
}
module.exports = ApiController;