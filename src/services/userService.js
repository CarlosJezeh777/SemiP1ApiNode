const userRepository = require('../repositories/userRepository');
var AWS = require('aws-sdk');
const base64 = require('base64-js');
const crypto = require('crypto');

const aws_keys = require('../awsCredentialls');
const s3 = new AWS.S3(aws_keys.s3);

const userService = {
    updateProfile:async (data) => {
        let url_foto_perfil = '';
    
        if (data.foto_perfil) {
            try {
                const image_data = new  Buffer.from(data.foto_perfil, 'base64');
                const random_number = crypto.randomInt(0, 9000);
                const name_key = `Fotos/${data.nombres.replace(' ', '_')}_${data.apellidos.replace(' ', '_')}_${random_number}.jpg`;
    
                const params = {
                    Bucket: 'archivos-semi1-a-g19',
                    Key: name_key,
                    Body: image_data,
                    ContentType: 'image/jpeg'
                };
    
                const putResult = s3.putObject(params).promise();
                console.log('Resultado de la subida:', putResult);
                url_foto_perfil = `https://archivos-semi1-a-g19.s3.amazonaws.com/${name_key}`;
                console.log("Se subió correctamente:", url_foto_perfil);
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                throw new Error('No se pudo subir la imagen');
            }
        }
    
        const user = {
            id: data.ID,
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            user_password: data.contraseña,
            foto_perfil: url_foto_perfil
        };
    
        return await userRepository.updateUser(user);
    }
};

module.exports = userService;