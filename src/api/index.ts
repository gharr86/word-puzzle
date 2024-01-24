import express, { Application } from 'express'
import cors from 'cors'

import routes from './routes'

const app: Application = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, (): void => {
  console.log(`[Server running on http://localhost:${port}]`)
})
