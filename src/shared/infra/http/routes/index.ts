import { Router } from 'express'
import todoRouter from '@modules/todos/http/routes/todos.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'

const routes = Router()

routes.use('/todos', todoRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
