import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {AttributeValue} from "@aws-sdk/client-dynamodb/dist-types/models/models_0";

declare module 'fastify' {
    interface FastifyInstance {
        DynamoDBKeyUtil: {
            encode: (key: Record<string, AttributeValue>) => string
            decode: (key: string) => Record<string, AttributeValue>
        }
    }
}

async function dynamoDBkeyUtilPlugin(
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    const DynamoDBKeyUtil = {
        encode: (key: Record<string, AttributeValue>): string => btoa(JSON.stringify(key)),
        decode: (key: string): Record<string, AttributeValue> => JSON.parse(atob(key))
    }
    fastify.decorate('DynamoDBKeyUtil', DynamoDBKeyUtil)
}

export default fp(dynamoDBkeyUtilPlugin)