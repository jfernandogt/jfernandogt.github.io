ics_sources = [
    {url:'calendars/frontend.ics', event_properties:{color:'green'}},
    {url:'calendars/qa-testing.ics', event_properties:{color:'purple'}},
    {url:'calendars/aws.ics', event_properties:{color:'orange'}},
    {url:'calendars/azure.ics', event_properties:{color:'#3a87ad'}},
    {url:'calendars/blockchain.ics', event_properties:{color:'#647157'}},
    {url:'calendars/kubernetes.ics', event_properties:{color:'#6B310C'}},
]


function data_req (url, callback) {
    req = new XMLHttpRequest()
    req.addEventListener('load', callback)
    req.open('GET', url)
    req.send()
}

function add_recur_events() {
    if (sources_to_load_cnt < 1) {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events)
    } else {
        setTimeout(add_recur_events, 30)
    }
}

function load_ics(ics){
    data_req(ics.url, function(){
        $('#calendar').fullCalendar('addEventSource', fc_events(this.response, ics.event_properties))
        sources_to_load_cnt -= 1
    })
}

$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'month',
        defaultDate: new Date(),
        locale: 'es',
    })
    sources_to_load_cnt = ics_sources.length
    for (ics of ics_sources) {
        load_ics(ics)
    }
    add_recur_events()
})

