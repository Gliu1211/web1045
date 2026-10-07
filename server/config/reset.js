import { pool } from './database.js'

// ids 1-4 must stay in this order: App.jsx maps /echolounge, /houseofblues,
// /pavilion and /americanairlines to location ids 1, 2, 3 and 4
const locationData = [
    {
        name: 'Echo Lounge & Music Hall',
        address: '1323 N Stemmons Fwy',
        city: 'Dallas',
        state: 'TX',
        zip: '75207',
        image: 'https://picsum.photos/seed/echolounge/600/400'
    },
    {
        name: 'House of Blues',
        address: '2200 N Lamar St',
        city: 'Dallas',
        state: 'TX',
        zip: '75202',
        image: 'https://picsum.photos/seed/houseofblues/600/400'
    },
    {
        name: 'The Pavilion at Toyota Music Factory',
        address: '300 W Las Colinas Blvd',
        city: 'Irving',
        state: 'TX',
        zip: '75039',
        image: 'https://picsum.photos/seed/pavilion/600/400'
    },
    {
        name: 'American Airlines Center',
        address: '2500 Victory Ave',
        city: 'Dallas',
        state: 'TX',
        zip: '75219',
        image: 'https://picsum.photos/seed/americanairlines/600/400'
    }
]

const eventData = [
    { title: 'Hack the Lounge: 24-Hour Web Jam', date: '2026-10-24', time: '09:00', image: 'https://picsum.photos/seed/webjam/400/300', location_id: 1 },
    { title: 'Indie Game Jam Weekend', date: '2026-11-14', time: '18:00', image: 'https://picsum.photos/seed/gamejam/400/300', location_id: 1 },
    { title: 'Civic Tech Hack Day', date: '2026-09-20', time: '10:00', image: 'https://picsum.photos/seed/civictech/400/300', location_id: 2 },
    { title: 'AI Agents Buildathon', date: '2026-11-07', time: '09:30', image: 'https://picsum.photos/seed/aibuild/400/300', location_id: 2 },
    { title: 'Climate Data Hackathon', date: '2026-10-30', time: '08:00', image: 'https://picsum.photos/seed/climatehack/400/300', location_id: 3 },
    { title: 'Beginner-Friendly First Hack', date: '2026-11-21', time: '11:00', image: 'https://picsum.photos/seed/firsthack/400/300', location_id: 3 },
    { title: 'FinTech Founders Hackathon', date: '2026-12-05', time: '09:00', image: 'https://picsum.photos/seed/fintechhack/400/300', location_id: 4 },
    { title: 'Winter Hardware Hack Finals', date: '2026-12-19', time: '13:00', image: 'https://picsum.photos/seed/hardwarehack/400/300', location_id: 4 }
]

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image TEXT NOT NULL
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT NOT NULL,
            location_id INTEGER NOT NULL REFERENCES locations(id)
        );
    `

    await pool.query(createTablesQuery)
    console.log('🎉 locations and events tables created successfully')
}

const seedLocations = async () => {
    for (const location of locationData) {
        await pool.query(
            'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)',
            [location.name, location.address, location.city, location.state, location.zip, location.image]
        )
        console.log(`✅ ${location.name} added successfully`)
    }
}

const seedEvents = async () => {
    for (const event of eventData) {
        await pool.query(
            'INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)',
            [event.title, event.date, event.time, event.image, event.location_id]
        )
        console.log(`✅ ${event.title} added successfully`)
    }
}

const reset = async () => {
    try {
        await createTables()
        await seedLocations()
        await seedEvents()
    }
    catch (error) {
        console.error('⚠️ error resetting database', error)
    }
    finally {
        await pool.end()
    }
}

reset()
