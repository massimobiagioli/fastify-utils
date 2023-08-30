import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {PaginatedResult} from "@src/utils/pager/pager.type";
import {Adapter} from "@src/utils/pager/adapter.interface";

declare module 'fastify' {
    interface FastifyInstance {
        Pager: <T>(adapter: Adapter<T>) => (page: number, limit: number) => Promise<PaginatedResult<T>>
    }
}

async function pagerPlugin(
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    const Pager = <T>(adapter: Adapter<T>) => async (limit: number, offset: number): Promise<PaginatedResult<T>> => {
        const total = await adapter.count()
        const items = await adapter.fetch(limit, offset)

        return {
            total,
            items
        }
    }

    fastify.decorate('Pager', Pager)
}

export default fp(pagerPlugin)