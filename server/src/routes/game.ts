import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function gameRoutes(fastify: FastifyInstance) {
    // DADOS DOS JOGOS DE UM BOLÃO //
    fastify.get('/pools/:id/games', {
        onRequest: [authenticate]
    }, async (req, res) => {
        const getGameParams = z.object({
            id: z.string()
        })

        const { id } = getGameParams.parse(req.params)

        const games = await prisma.game.findMany({
            // Ordenar //
            orderBy: {
                date: 'desc'
            },

            include: {
                guesses: {
                    where: {
                        participant: {
                            userId: req.user.sub,
                            poolId: id
                        }
                    }
                }
            },
        })

        res.status(200).send({
            games: games.map(game => {
                return {
                    ...game,
                    guess: game.guesses.length > 0 ? game.guesses[0] : null,
                    guesses: undefined
                }
            })
        })
    })
}