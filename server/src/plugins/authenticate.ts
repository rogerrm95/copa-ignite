import { FastifyRequest } from "fastify";

// Plugin de Autenticação //
export async function authenticate(request: FastifyRequest) {
    await request.jwtVerify()
}