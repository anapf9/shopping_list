import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import CreateUserService from '@modules/users/services/CreateUserService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body
        const createuser = new CreateUserService()
        const user = await createuser.execute({
            name,
            email,
            password,
        })

        delete user.password

        return response.json(user)
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        // console.log(request.file)
        const updateUserAvatar = new UpdateUserAvatarService()
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        })
        delete user.password
        return response.json(user)
    }
)

export default usersRouter
