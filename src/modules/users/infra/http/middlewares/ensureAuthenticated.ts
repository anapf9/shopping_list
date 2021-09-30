import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

interface tokenPayload {
    iat: number
    exp: number
    sub: string
}
// sempre que o parametro esta any, devemos definir de forma manual o
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    // Validação do token JWT

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('JWT token esta faltando', 401)
    }
    // Bearer
    // a seguinte expressao retorna uma array
    // const token = authHeader
    // na primeira posição temos o type e na segunda o token
    // como nao queremos usar o type, podemos apenas ignorar ele na desestruturação para pegarmos apenas
    // a hash JWT e não junto com a string Bearer
    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, authConfig.jwt.secret)
        // console.log(decoded)

        const { sub } = decoded as tokenPayload
        // fazemos a sequinte atribuição para que nas rotas que utilizarmos essa autenticação
        // possamos ter sempre o id do usuario que fez a autenticação
        request.user = {
            id: sub,
        }
        return next()
    } catch {
        throw new AppError('JWT invalido', 401)
    }
}
