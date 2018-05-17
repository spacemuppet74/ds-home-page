import React, { Component } from 'react';
import format from 'date-fns/format'

import './Event.scss'

function createMarkUp(html) {
  return { __html: 'Description: ' + html }
}

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }

  }

  handleMouseEnter = () => {
    this.setState({ showDetails: true })
  }

  handleMouseLeave = () => {
    this.setState({ showDetails: false })
  }

  render() {
    let displayDescription = false
    const { event } = this.props
    const { showDetails } = this.state
    const eventDay = format(event.EventDate, 'DD')
    const eventMonth = format(event.EventDate, 'MMM')
    const eventFinishDate = format(event.EndDate, 'Do MMM YYYY')
    let showDescription

    if (event.Description && event.Description.length > 11) {
      displayDescription = true
    }

    if (this.state.showDetails) {
      showDescription = "show__details"
    } else {
      showDescription = "hide__details"
    }



    return (
      <li className='event' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className='event__date'>
          <div className='event__date__month'>{eventMonth}</div>
          <div className='event__date__day'>{eventDay}</div>

        </div>
        <div className='event__details'>
          <h3>
            <a className="event-details__link" href={`http://cornerstone/Lists/Events/DispForm.aspx?ID=${event.ID}`} >
              {event.Title}
            </a>
          </h3>
          <div className={`event__details__description} ${showDescription}`}>
            {event.Location && <p>Location: {event.Location}</p>}
            {displayDescription && <p className="event__description" dangerouslySetInnerHTML={createMarkUp(event.Description)} ></p>}
            {eventFinishDate && <p>Finish Date: {eventFinishDate}</p>}
          </div>
        </div>
      </li>
    )
  }
}

export default Event