import React, { Component } from 'react';

import { fetchEvents } from 'services/fetch-ds-events'

import EventsList from './EventsList/EventsList'

class CalendarEvents extends Component {

  state = {
    isLoading: false,
    events: []
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetchEvents().then(json => {
      this.setState({ isLoading: false, events: [...json] })
    })
  }

  render() {
    const { isLoading, events } = this.state
    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <EventsList events={events} />
    )
  }
}

export default CalendarEvents