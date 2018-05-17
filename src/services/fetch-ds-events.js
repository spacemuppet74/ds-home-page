import { sp, Web } from '@pnp/sp'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import startOfToday from 'date-fns/start_of_today'

export function fetchEvents() {
  const web = new Web('http://cornerstone')
  const today = startOfToday()

  const camlFields = "<ViewFields>" +
    "<FieldRef Name='Title' />" +
    "<FieldRef Name='EventDate' />" +
    "<FieldRef Name='EndDate' />" +
    "<FieldRef Name='Location' />" +
    "<FieldRef Name='Description' />" +
    "<FieldRef Name='Category' />" +
    "<FieldRef Name='fRecurrence' />" +
    "<FieldRef Name='RecurrenceData' />" +
    "<FieldRef Name='RecurrenceID' />" +
    "<FieldRef Name='fAllDayEvent' />" +
    "</ViewFields>"

  const camlQuery = '<Query>' +
    '<CalendarDate>' + today + '</CalendarDate>' +
    '<OrderBy>' +
    '<FieldRef Name="EventDate" />' +
    '</OrderBy>' +
    '<Where>' +
    '<Gt><FieldRef Name=\"StartDate\" /><Value Type=\"DateTime\"><Today /></Value></Gt>' +
    '<And>' +
    '<DateRangesOverlap>' +
    '<FieldRef Name="EventDate" />' +
    '<FieldRef Name="EndDate" />' +
    '<FieldRef Name="RecurrenceID" />' +
    '<Value Type="DateTime">' +
    '<Year />' +
    '</Value>' +
    '</DateRangesOverlap>' +
    '<Contains>' +
    '<FieldRef Name="appear_in" />' +
    '<Value Type="Text">cornerstone</Value>' +
    '</Contains>' +
    '</And>' +
    '</Where>' +
    '</Query>'

  const camlQueryOption = '<QueryOptions>' +
    '<CalendarDate>' + today + '</CalendarDate>' +
    '<ExpandRecurrence>TRUE</ExpandRecurrence>' +
    '<RecurrenceOrderBy>TRUE</RecurrenceOrderBy>' +
    '<ViewAttributes Scope="RecursiveAll"/>' +
    '</QueryOptions>'

  const xml = `<View>${camlFields}${camlQueryOption}${camlQuery}<RowLimit>5</RowLimit></View>`

  const q = {
    ViewXml: xml
  }

  return web.lists.getByTitle('Events').getItemsByCAMLQuery(q).then(resp => {
    const result = resp.filter(event => {
      // return true if the event enddate is after today
      return isAfter(format(event.EndDate), today) && isBefore
    })

    return result
  })
}