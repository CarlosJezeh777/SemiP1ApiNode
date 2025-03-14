const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
var AWS = require('aws-sdk');
const crypto = require('crypto');

const aws_keys = require('../awsCredentialls');
const s3 = new AWS.S3(aws_keys.s3)


const authService = {
    register: async (userData) => {
        console.log('Datos recibidos para registro:', userData);
        const { email, contraseña } = userData;
    
        try {
            // Decodifica la imagen de base64 a bytes
            const image_data = new Buffer.from(userData.foto_perfil, 'base64');
            const random_number = crypto.randomInt(0, 9000);
            const name_key = `Fotos/${userData.nombres.replace(' ', '_')}_${userData.apellidos.replace(' ', '_')}_${random_number}.jpg`;
    
            // Sube el archivo a S3
            const params = {
                Bucket: 'archivos-semi1-a-g19',
                Key: name_key,
                Body: image_data,
                ContentType: 'image'
            };
    
            const putResult = s3.putObject(params).promise();
            console.log('Resultado de la subida:', putResult);
            const url_foto_perfil = `https://archivos-semi1-a-g19.s3.amazonaws.com/${name_key}`;
            console.log("Se subió correctamente:", url_foto_perfil);
    
            const existingUser = await userRepository.findByEmail(email);
            console.log('Usuario existente:', existingUser);
    
            if (existingUser) {
                throw new Error('User already exists');
            }
    
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            console.log('Contraseña hasheada:', hashedPassword);
    
            const newUser = { ...userData, user_password: hashedPassword, foto_perfil: url_foto_perfil };
            const createdUser = await userRepository.createUser(newUser);
            console.log('Usuario creado:', createdUser);
    
            return createdUser;
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error;
        }
    },

    login: async (correo, contraseña) => {
        try {
            const user = await userRepository.findByEmail(correo);
            console.log('Usuario encontrado:', user);
    
            if (!user) {
                throw new Error('Invalid credentials');
            }
    
            const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
    
            
            const userResponse = {
                id_usuario: user.id,
                nombre: `${user.nombres} ${user.apellidos}`,
                correo: user.email,
                contraseña: contraseña,
                fecha_nacimiento: user.fecha_nacimiento
            };
    
            return { user: userResponse, token };
        } catch (error) {
            console.error('Error en el login:', error);
            throw error;
        }
    },


};

module.exports = authService;