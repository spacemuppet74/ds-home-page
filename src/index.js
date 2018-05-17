import React from "react";
import ReactDOM from "react-dom";

import NewsFeed from 'components/NewsFeed/NewsFeed'
import CalendarEvents from 'components/CalendarEvents/CalendarEvents'

const newsEl = document.getElementById("main-news");
const eventsEl = document.getElementById("calendar-events")

ReactDOM.render(<NewsFeed />, newsEl);
ReactDOM.render(<CalendarEvents />, eventsEl)
