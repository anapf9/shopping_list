import { Router, request } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '@modules/todos/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/todos/services/CreateApointmentService'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
// da forma seguinte usamos o middleware em todas as rotas que criarmos
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {
    console.log(req.user)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find()

    return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
    const { provider_id, date } = req.body

    // const parsedDate = startOfHour(parseISO(date))
    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService()

    const appointment = await createAppointmentService.execute({
        date: parsedDate,
        provider_id,
    })

    return res.json(appointment)
})

export default appointmentsRouter
