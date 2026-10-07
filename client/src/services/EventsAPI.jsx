const getAllEvents = async () => {
    const response = await fetch('/api/events')
    const data = await response.json()
    return data
}

const getEventById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    const data = await response.json()
    return data
}

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`/api/locations/${locationId}/events`)
    const data = await response.json()
    return data
}

export default {
    getAllEvents,
    getEventById,
    getEventsByLocation
}
