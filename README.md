# Fastify Utils

## Pager

Use case: list all devices paginated

Route:

```typescript
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
```

Feature `listDevices` that uses an ArrayAdapter to paginate the result:

```typescript
async function listDevicesPlugin(
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    const listDevices = async (limit: number, offset: number): Promise<PaginatedResult<DeviceDtoType>> => {
        const devices = await DeviceLib.listDevices()
        const adapter = new ArrayAdapter<DeviceDtoType>(devices)
        const pager = fastify.Pager<DeviceDtoType>(adapter)
        return await pager(limit, offset)
    }

    fastify.decorate('listDevices', listDevices)
}

export default fp(listDevicesPlugin)
```

