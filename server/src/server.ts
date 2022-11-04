import Fastify from 'fastify'
import cors from '@fastify/cors'

import { PrismaClient } from 'prisma/prisma-client'

import { z } from 'zod'
import UUID from 'short-unique-id'

const prisma = new PrismaClient({
    log: ['query']
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true // Configurar o domínio do front-end em PRODUÇÃO //
    })

    // CONTAGEM DE BOLÕES //
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()

        return { count }
    })

    // CONTAGEM DE USUÁRIOS //
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()

        return { count }
    })

    // CONTAGEM DE PALPITES //
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count()

        return { count }
    })

    // CRIAR BOLÃO //
    fastify.post('/pools', async (req, res) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const generate = new UUID({ length: 6 })

        const { title } = createPoolBody.parse(req.body)

        const code = String(generate()).toLocaleUpperCase()

        await prisma.pool.create({
            data: {
                title,
                code
            }
        })

        return res.status(201).send({ code })
    })

    await fastify.listen({
        port: 3333,
        //host: '192.168.15.18' // MOBILE - SEGURANÇA //
    })
}

bootstrap()