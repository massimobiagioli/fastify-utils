import 'module-alias/register';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'path'
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";

export default function createApp(
  opts?: FastifyServerOptions,
): FastifyInstance {
  const defaultOptions = {
    logger: true,
  }

  const app = fastify({ ...defaultOptions, ...opts }).withTypeProvider<TypeBoxTypeProvider>()

  app.register(autoload, {
    dir: join(__dirname, 'core'),
  })

  app.register(autoload, {
    dir: join(__dirname, 'utils'),
  })

  app.register(autoload, {
    dir: join(__dirname, 'features'),
  })

  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  })

  return app
}
