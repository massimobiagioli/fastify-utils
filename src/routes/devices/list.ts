import {FastifyInstance, FastifyPluginOptions} from 'fastify'
import {DeviceDtoType, DeviceRequestDto, DeviceRequestDtoType} from "@type/devices.type";
import {DynamoDBPaginatedResult} from "@src/utils/pager/pager.type";

export default async function (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    fastify.get<{ Querystring: DeviceRequestDtoType, Reply: DynamoDBPaginatedResult<DeviceDtoType> }>(
        '/',
        {
            schema: {
                querystring: DeviceRequestDto
            }
        },
        async (request, reply) => {
            try {
                const { userId, limit, startKey } = request.query
                const result = await fastify.listDevices(userId, limit, startKey)
                return reply.send(result)
            } catch (error) {
                request.log.error(error)
                return reply.code(500).send()
            }
        },
    )
}
