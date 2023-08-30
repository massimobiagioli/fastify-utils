import fp from 'fastify-plugin'
import {FastifyInstance, FastifyPluginOptions} from 'fastify'
import * as DeviceLib from '@lib/devices.lib'
import {DeviceDtoType} from "@type/devices.type";
import {PaginatedResult} from "@src/utils/pager/pager.type";
import {ArrayAdapter} from "@src/utils/pager/adapter.array";

declare module 'fastify' {
    interface FastifyInstance {
        listDevices: (limit: number, offset: number) => Promise<PaginatedResult<DeviceDtoType>>
    }
}

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
