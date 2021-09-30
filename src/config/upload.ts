import multer from 'multer'
import path from 'path'
import { request } from 'express'
import crypto from 'crypto'
// o crypto é um serviço do node
const tempFolder = path.resolve(__dirname, '..', '..', 'temp')
export default {
    directory: tempFolder,
    // neste momento vamos gravar as imagens dentro da aplicação
    // Poré, deve ser usado serviços externos de upload de imagem
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex')
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        },
    }),
}
