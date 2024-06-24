const {Sequelize, Model} = require('sequelize');
const bcryptjs = require('bcryptjs');

class  User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: "Campo nome deve ter entre 3 e 255 caracteres."
                    }
                }
            },        
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    isEmail:{
                        args: true,
                        msg: "E-mail inálido"
                    }
                }
            },        
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: "Campo senha deve ter entre 6 e 50 caracteres."
                    }
                },
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            cpf: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo cpf não pode ficar vazio',
                      },

                },
            },
            user_type: {
                type: Sequelize.INTEGER,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo tipo não pode ficar vazio',
                      },
                },
            },
            last_login: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
        },{
            sequelize
        });
        this.addHook('beforeCreate', async (user) => {
            user.password_hash = await bcryptjs.hash(user.password, 10);
        });
        this.addHook('beforeUpdate', async (user) => {
            if (user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 10);
            }
        });
        return this;
    }
    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
    // static associate(models){
    //     this.hasMany(models.Agendamento, { foreignKey: 'usuario_id' });
    // }
}
 


module.exports = User;
