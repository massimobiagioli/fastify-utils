import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {DynamoDBPaginatedResult} from "@src/utils/pager/pager.type";
import {QueryCommand} from "@aws-sdk/client-dynamodb";
import {AttributeValue} from "@aws-sdk/client-dynamodb/dist-types/models/models_0";

declare module 'fastify' {
    interface FastifyInstance {
        DynamoDBPager: <T>(
            queryCommand: QueryCommand,
            itemTransformer: (item: Record<string, AttributeValue>) => T
        ) => () => Promise<DynamoDBPaginatedResult<T>>
    }
}

async function dynamoDBPagerPlugin(
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    const DynamoDBPager = <T>(
        queryCommand: QueryCommand,
        itemTransformer: (item: Record<string, AttributeValue>) => T
    ) => async (): Promise<DynamoDBPaginatedResult<T>> => {
        const queryResult = await fastify.dynamoDB.send(queryCommand)
        const items = queryResult.Items?.map(itemTransformer) ?? []

        const paginatedResult: DynamoDBPaginatedResult<T> = {
            items
        }

        if (queryResult?.LastEvaluatedKey) {
            paginatedResult.lastKey = fastify.DynamoDBKeyUtil.encode(queryResult.LastEvaluatedKey)
        }

        return paginatedResult
    }

    fastify.decorate('DynamoDBPager', DynamoDBPager)
}

export default fp(dynamoDBPagerPlugin)