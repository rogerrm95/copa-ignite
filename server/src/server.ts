import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import 'dotenv/config'

// Rotas //
import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { gameRoutes } from './routes/game'
import { authRoutes } from './routes/auth'

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true // Configurar o domínio do front-end em PRODUÇÃO //
    })

    // VARIAVEL AMBIENTE //
    const KEY = process.env.JWT_KEY_SECRET ? process.env.JWT_KEY_SECRET : 'nwlcopa'

    await fastify.register(jwt, {
        secret: KEY,
    })

    // Rotas //
    fastify.register(authRoutes)
    fastify.register(poolRoutes)
    fastify.register(userRoutes)
    fastify.register(gameRoutes)
    fastify.register(guessRoutes)

    await fastify.listen({
        port: 3333,
        //host: '192.168.15.18' // MOBILE - SEGURANÇA //
    })
}

bootstrap()