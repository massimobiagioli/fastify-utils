import fp from 'fastify-plugin'
import {FastifyInstance, FastifyPluginOptions} from 'fastify'
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

declare module 'fastify' {
    interface FastifyInstance {
        dynamoDB: DynamoDBClient
    }
}

const dynamoDB = new DynamoDBClient({})

async function dynamoDBPlugin(
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
): Promise<void> {
    fastify.decorate('dynamoDB', dynamoDB)
}

export default fp(dynamoDBPlugin)