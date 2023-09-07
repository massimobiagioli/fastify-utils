import fp from 'fastify-plugin'
import {FastifyInstance, FastifyPluginOptions} from 'fastify'
import {DeviceDtoType} from "@type/devices.type";
import {DynamoDBPaginatedResult} from "@src/utils/pager/pager.type";
import {QueryCommand} from "@aws-sdk/client-dynamodb";
import {AttributeValue} from "@aws-sdk/client-dynamodb/dist-types/models/models_0";

declare module 'fastify' {
    interface FastifyInstance {
        listDevices: (
            userId: string,
            limit: number,
            startKey?: string
        ) => Promise<DynamoDBPaginatedResult<DeviceDtoType>>
    }
}

async function listDevicesPlugin(
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    const listDevices = async (
        userId: string,
        limit: number,
        startKey?: string
    ): Promise<DynamoDBPaginatedResult<DeviceDtoType>> => {
        const queryCommand = new QueryCommand({
            TableName: 'test-pager',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: { ':userId': { S: userId } },
            Limit: limit,
            ExclusiveStartKey: startKey ? fastify.DynamoDBKeyUtil.decode(startKey) : undefined,
        })

        const deviceTransformer = (item: Record<string, AttributeValue>): DeviceDtoType => ({
            userId: item.userId.S as string,
            deviceId: item.deviceId.S as string,
            address: item.address.S as string,
        })

        const pager = fastify.DynamoDBPager<DeviceDtoType>(queryCommand, deviceTransformer);
        return await pager()
    }

    fastify.decorate('listDevices', listDevices)
}

export default fp(listDevicesPlugin)
