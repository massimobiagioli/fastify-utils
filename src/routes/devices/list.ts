import {FastifyInstance, FastifyPluginOptions} from 'fastify'
import {DeviceDtoType, DeviceRequestDtoType} from "@type/devices.type";
import {PaginatedResult} from "@src/utils/pager/pager.type";

export default async function (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    fastify.get<{ Querystring: DeviceRequestDtoType, Reply: PaginatedResult<DeviceDtoType> }>(
        '/',
        async (request, reply) => {
            try {
                const limit = request.query.limit ?? 10
                const offset = request.query.offset ?? 0
                const result = await fastify.listDevices(limit, offset)
                return reply.send(result)
            } catch (error) {
                request.log.error(error)
                return reply.code(500).send()
            }
        },
    )
}
