import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

// Validações //
import { z } from 'zod'
import UUID from 'short-unique-id'
import { authenticate } from "../plugins/authenticate"

export async function poolRoutes(fastify: FastifyInstance) {
    // CONTAGEM DE BOLÕES //
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()

        return { count }
    })

    // CRIAR BOLÃO //
    fastify.post('/pools', async (req, res) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(req.body)

        const generate = new UUID({ length: 6 })
        const code = String(generate()).toLocaleUpperCase()

        try {
            await req.jwtVerify()

            // Se chegar até aqui, o usuário está autenticado //
            await prisma.pool.create({
                data: {
                    title,
                    code,
                    ownerId: req.user.sub,

                    participants: {
                        create: {
                            userId: req.user.sub
                        }
                    }
                }
            })

        } catch {
            // Se não o usuário ainda não está autenticado //
            await prisma.pool.create({
                data: {
                    title,
                    code
                }
            })
        }

        return res.status(201).send({ code })
    })

    // PARTICIPAR DE UM BOLÃO //
    fastify.post('/pools/join', {
        onRequest: [authenticate]
    }, async (req, res) => {
        const joinPoolBody = z.object({
            code: z.string(),
        })

        const { code } = joinPoolBody.parse(req.body)

        const pool = await prisma.pool.findUnique({
            where: {
                code
            },

            include: {
                participants: {
                    where: {
                        userId: req.user.sub
                    }
                }
            }
        })

        // SE - Validação se não for encontrado bolão //
        if (!pool) {
            return res.status(400).send({
                message: 'Bolão não encontrado'
            })
        }

        // SE - Validação se o usuário que deseja participar, já não faz parte do bolão informado //
        if (pool.participants.length > 0) {
            return res.status(400).send({
                message: 'Usuário já participando do bolão.'
            })
        }

        // SOLUÇÃO PALEATIVA //
        // CASO IMPLEMENTE LOGIN PELA PLATAFORMA WEB - REMOVER ESTA VALIDAÇÃO //
        // Se - Bolão no qual o usuário estiver tentando entrar, não hovuer participantes, o mesmo será o dono do bolão //
        if (pool.ownerId) {
            await prisma.pool.update({
                where: {
                    id: pool.id
                },
                data: {
                    ownerId: req.user.sub
                }
            })
        }

        // Caso não atenda as validações acima //
        // O usuário entrará na lista de participantes daquele bolão //
        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: req.user.sub
            }
        })

        return res.status(201).send()
    })

    // LISTAR TODOS OS BOLÕES NO QUAL O USUÁRIO ESTÁ PARTICIPANDO //
    fastify.get('/pools', {
        onRequest: [authenticate]
    }, async (req, res) => {
        const pools = await prisma.pool.findMany({
            where: {
                participants: {
                    some: {
                        userId: req.user.sub
                    }
                }
            },

            include: {
                // Selecionando o nome do dono do bolão //
                owner: {
                    select: {
                        name: true,
                        id: true
                    }
                },
                // Contagem de participantes //
                _count: {
                    select: {
                        participants: true,
                    }
                },

                // Selecionando até 4 participantes e retornando o AVATAR e NAME deles //
                participants: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                name: true,
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4
                }
            }
        })

        return res.status(201).send({ pools })
    })

    // LISTAR INFORMAÇÕES DE UM BOLÃO ESPECÍFICO //
    fastify.get('/pools/:id', {
        onRequest: [authenticate]
    }, async (req, res) => {
        const getPoolParams = z.object({
            id: z.string()
        })

        const { id } = getPoolParams.parse(req.params)

        const pool = await prisma.pool.findUnique({
            where: {
                id
            },

            include: {
                // Selecionando o nome do dono do bolão //
                owner: {
                    select: {
                        name: true,
                        id: true
                    }
                },
                // Contagem de participantes //
                _count: {
                    select: {
                        participants: true,
                    }
                },

                // Selecionando até 4 participantes e retornando o AVATAR e NAME deles //
                participants: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                name: true,
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4
                }
            }
        })

        return res.status(201).send({ pool })
    })
}