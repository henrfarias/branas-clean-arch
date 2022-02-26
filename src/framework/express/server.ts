import { setupApp } from "./config"

const start = async () => {
  const app = await setupApp()
  const port = 3000
  app.listen(port, () => console.log(`server running on localhost:${port}`))
}

start()