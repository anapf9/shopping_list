import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import routes from '@shared/infra/http/routes'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import '@shared/infra/typeorm'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            })
        }

        console.error(err)

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        })
    }
)

// app.get('/', (request, response) => {
//   return response.json({ message: 'Oie mudei' })
// })

app.listen(3333, () => {
    console.log('aki 😀')
})
