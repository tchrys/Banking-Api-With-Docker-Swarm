const UsersRepository = require('../../Infrastructure/PostgreSQL/Repository/UsersRepository.js');
const AuthenticatedUserDto = require('../DTOs/AuthenticatedUserDto.js');
const RegisteredUserDto = require('../DTOs/RegisteredUserDto.js');
const JwtPayloadDto = require('../DTOs/JwtPayloadDto.js');
const ServerError = require('../../WebApp/Models/ServerError.js');

const { hashPassword, comparePlainTextToHashedPassword } = require('../Security/Password')
const { generateTokenAsync } = require('../Security/Jwt');

const authenticateAsync = async (username, plainTextPassword) => {
    console.info(`Authenticates user with username ${username}`);
    const user = await UsersRepository.getByUsernameWithRoleAsync(username);
    if (!user) {
        throw new ServerError(`Utilizatorul cu username ${username} nu exista in sistem!`, 404);
    }
    const cmpPass = await comparePlainTextToHashedPassword(plainTextPassword, user.password);
    if (!cmpPass) {
        throw new ServerError('Password doesn\'t match!', 400);
    }
    const token = await generateTokenAsync(new JwtPayloadDto(user.id, user.role));
    return new AuthenticatedUserDto(token, username, user.role);
};

const registerAsync = async (username, plainTextPassword) => {
    const encryptedPass = await hashPassword(plainTextPassword);
    const user = await UsersRepository.addAsync(username, encryptedPass);
    return new RegisteredUserDto(user.id, user.username, user.role_id);
};

module.exports = {
    authenticateAsync,
    registerAsync
}