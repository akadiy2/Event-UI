import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Event from './Event/Event';
import EventHeader from './Event/EventHeader';

class App extends Component {

componentDidMount() {
    fetch('http://localhost:8102/events/')
    .then(result => result.json())
    .then((data) => {
        this.setState({events: data})
    })
    .catch(console.log)
}

state = {
    events: [],
    createMode: false
}

deleteEventHandler = (eventIndex) => {
    const evts = [...this.state.events]
    let id = evts[eventIndex].id;
    fetch('http://localhost:8102/events/' + id, {method: 'delete'})
    .then(() => {
        evts.splice(eventIndex, 1);
        this.setState({events: evts});
        console.log(this.state.events);
        console.log(evts);
    })
    .catch(console.log);
  
}

handleEventUpdate = (id, event) => {
    console.log(id);
    const evts = this.state.events;
    let e = evts.find(x => x.id === id);

    e[event.target.name] = event.target.value;

    this.setState({createMode: false});
    this.setState({events: evts});
    console.log(this.state.events);
}

handleEventSubmit = (id, name, description) => {
    const evts = this.state.events;
    let e = evts.find(x => x.id === id);
    e.name = name;
    e.description = description;

    this.setState({events: evts});
}

createEventHandler = () => {

    this.setState({createMode: true});
    const evts = this.state.events;
    let eventCount = evts.length;
    const eventBody = {name: "Event", description: "Event Description"};

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const myRequest = new Request('http://localhost:8102/events/', {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        body: JSON.stringify(eventBody)
    });

    fetch(myRequest)
    .then(() => {
        evts.push(eventBody);
        this.setState({events: evts});
        console.log(this.state.events);
    });
}



render() {
    let events = null;
        events = (
            <div>
                {this.state.events.map((event, index) => {
                    return <Event deleteClick={()=> this.deleteEventHandler(index)}
                                  handleEventChange={this.handleEventUpdate}
                                  createMode={index === this.state.events.length - 1 ? this.state.createMode : false}
                                  key={event.id} id={event.id} name={event.name} description={event.description}/>

                })}

            </div>
        );


    return (
        <div>
            <h1>Events</h1>
            <EventHeader />
            {events}
            <button onClick={this.createEventHandler}>Create Event</button>
        </div>
    );

    //return React.createElement('div', null, React.createElement('h1', null, 'Events'));
}

}



export default App;
