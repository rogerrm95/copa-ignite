import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

import { authenticate } from "../plugins/authenticate"
import { z } from 'zod'

export async function guessRoutes(fastify: FastifyInstance) {
    // CONTAGEM DE PALPITES //
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count()

        return { count }
    })

    // LISTAR OS PALPITES DE UM DETERMINADO JOGO DE UM DETERMINADO BOLÃO //
    fastify.post('/pools/:poolId/games/:gameId/guesses', {
        onRequest: [authenticate]
    }, async (req, res) => {
        const createGuessParams = z.object({
            poolId: z.string(),
            gameId: z.string()
        })

        const { gameId, poolId } = createGuessParams.parse(req.params)

        const createGuessBody = z.object({
            firstTeamPoints: z.number(),
            secondTeamPoints: z.number()
        })

        const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(req.body)

        const participant = await prisma.participant.findUnique({
            where: {
                userId_poolId: {
                    poolId,
                    userId: req.user.sub
                }
            }
        })

        // Validar se o usuário pertence a este bolão //
        if (!participant) {
            return res.status(400).send({
                message: 'Você não está permitido a palpitar neste bolão!'
            })
        }

        const guess = await prisma.guess.findUnique({
            where: {
                gameId_participantId: {
                    gameId,
                    participantId: participant.id
                }
            }
        })

        // Validação se o usuário já realizou um palpite neste jogo deste bolão //
        if (guess) {
            return res.status(400).send({
                message: 'Você já realizou um palpite neste jogo.'
            })
        }

        const game = await prisma.game.findUnique({
            where: {
                id: gameId
            }
        })

        // Validação se o jogo existe ou não //
        if (!game) {
            return res.status(400).send({
                message: 'Jogo não encontrado.'
            })
        }

        // Validação da data do jogo //
        if (game.date < new Date()) {
            return res.status(400).send({
                message: 'Não é possível enviar seu palpite neste jogo, data do jogo já passou'
            })
        }

        await prisma.guess.create({
            data: {
                gameId,
                participantId: participant.id,
                firstTeamPoints,
                secondTeamPoints
            }
        })

        res.status(201).send()
    })
}