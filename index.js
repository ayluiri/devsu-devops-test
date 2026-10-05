import sequelize from './shared/database/database.js'
import { usersRouter } from "./users/router.js"
import express from 'express'

const app = express()
const PORT = process.env.PORT || 8000

sequelize.sync({ force: true }).then(() => console.log('db is ready'))

app.use(express.json())

// Endpoint para healthcheck de Docker y probes de Kubernetes
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))

app.use('/api/users', usersRouter)

const server = app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})

export { app, server }
