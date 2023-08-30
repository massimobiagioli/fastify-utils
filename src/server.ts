import createApp from "./app";

const app = createApp()

app.ready().then(() => {
  app.listen({ port: 4000 }, (err, address) => {
    if (err != null) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.debug(`Server listening at ${address}`)
  })
})
