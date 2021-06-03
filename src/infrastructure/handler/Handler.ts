import { FastifyReply, FastifyRequest } from "fastify";

export type Handler = (request: FastifyRequest, reply: FastifyReply) => void
