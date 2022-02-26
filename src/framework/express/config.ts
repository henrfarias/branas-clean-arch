import express, { Express, json } from 'express'
import setupRoutes from './routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  app.use(json())
  await setupRoutes(app)
  return app
}
