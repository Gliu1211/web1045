import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const locationId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM events WHERE location_id = $1 ORDER BY id ASC', [locationId])
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventById,
    getEventsByLocation
}
