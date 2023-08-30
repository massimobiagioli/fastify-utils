import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {HealthResponseType} from "@type/health.type";

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.get<{ Reply: HealthResponseType }>(
    '/health',
    async (_request, _reply) => {
      return { status: 'ok' }
    },
  )
}
