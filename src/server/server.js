const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { Client } = require("pg")

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

//get varible from env file
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
})

client.connect()

// Fetch data from the PostgreSQL database
app.get("/api/pokemon", async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM league."Teirs"`)
        res.json(result.rows)
    } catch (error) {
        console.error("Error fetching data:", error)
        res.status(500).send("Internal Server Error")
    }
})

// Update data in the PostgreSQL database
app.put("/api/pokemon/:id", async (req, res) => {
    const { id } = req.params
    const { pokemonID, pokemon, pts, smogonName, coachID } = req.body

    try {
        const result = await client.query(
            'UPDATE league."Teirs" SET "PokemonID"=$1, "Pokemon"=$2, "Pts"=$3, "SmogonName"=$4, "CoachID"=$5 WHERE "ID"=$6',
            [pokemonID, pokemon, pts, smogonName, coachID, id]
        )

        res.json(result.rows)
    } catch (error) {
        console.error("Error updating data:", error)
        res.status(500).send("Internal Server Error")
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
