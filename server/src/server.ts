import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from 'prisma/prisma-client'

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

    await fastify.listen({
        port: 3333,
        host: '192.168.15.18' // MOBILE - SEGURANÇA //
    })
}

bootstrap()