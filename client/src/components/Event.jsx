import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import '../css/Event.css'

const Event = (props) => {

    const [event, setEvent] = useState([])
    const [time, setTime] = useState([])
    const [remaining, setRemaining] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [props.id])

    useEffect(() => {
        if (!event.time) return

        // '19:30:00' -> '7:30 PM'
        const [hours, minutes] = event.time.split(':')
        const hour = parseInt(hours)
        setTime(`${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`)
    }, [event])

    useEffect(() => {
        if (!event.date) return

        const days = Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24))
        setRemaining(days >= 0 ? `${days} day${days === 1 ? '' : 's'} away` : 'This event has passed')
    }, [event])

    return (
        <article className='event-information'>
            <img src={event.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date && String(event.date).slice(0, 10)} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event