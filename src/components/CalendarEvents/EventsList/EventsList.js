import React, { Fragment } from 'react';

import './EventsList.scss'

import Event from '../Event/Event'

const EventsList = ({ events }) => {
  console.log(events)
  return (
    <ul className="events__list">
      {events.map(event => <Event event={event} key={event.Id} />)}
    </ul>
  )
}

export default EventsList