import User from '@modules/users/infra/typeorm/entities/User'
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

interface Request {
    email: string
    password: string
}

interface Response {
    user: User
    token: string
}
class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            throw new AppError('Email ou senhas incorretos', 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Email ou senhas incorretos', 401)
        }
        // bacana essa desetruturação:
        const { secret, expiresIn } = authConfig.jwt
        // o segundo parametro podemos usar um hash do md5.cz reinventese
        // o terceiro sempre sera o id do usuario que fez a requisição
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })
        return { user, token }
    }
}

export default AuthenticateUserService
