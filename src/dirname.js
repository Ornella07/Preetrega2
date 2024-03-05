import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generamos el hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validamos el hash
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}

export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) =>{
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '120s'}); //?->Este token genera una duracion en segundos
}

export const passportCall = (strategy) => {

}


export default __dirname;