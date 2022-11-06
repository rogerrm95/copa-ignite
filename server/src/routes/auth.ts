import { FastifyInstance } from "fastify";

// Validações //
import { z } from 'zod'
import UUID from 'short-unique-id'
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
    // Recebe o Token na requisição //
    fastify.get('/me',
        {
            onRequest: [authenticate]
        },
        async (req) => {
            return { user: req.user }
        })

    fastify.post('/users', async (req, res) => {
        const createUserBody = z.object({
            accessToken: z.string()
        })

        const { accessToken } = createUserBody.parse(req.body)

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const userData = await userResponse.json()

        // Validação dos dados da API do Google //
        const userInforSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url()
        })

        const userInfo = userInforSchema.parse(userData)

        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture
                }
            })
        }

        // CRIAR UM TOKEN //
        const token = fastify.jwt.sign({
            name: user.name,
            avatar: user.avatarUrl
        }, {
            sub: user.id, // Quem gerou o Token //
            expiresIn: 3600 // Data de expiração //
        })

        return { token }
    })
}