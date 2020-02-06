import React, {Component} from 'react';
import './Event.css';

// EventName     Description    Action?
class Event extends Component {

    state = {
        editable: false
    }

    makeEditable = () => {
        const editable = this.state.editable;
        if (editable) {
            console.log(this.props.id+'-'+this.props.name + '-' + this.props.description);
            const eventBody = {name: this.props.name, description: this.props.description};
        
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            const myRequest = new Request('http://localhost:8102/events/' + this.props.id, {
                method: 'PUT',
                headers: myHeaders,
                cache: 'default',
                body: JSON.stringify(eventBody)
            });

            fetch(myRequest)
            .then(() => {
                this.setState({editable: false});
            });
        } else {
            this.setState({editable: true});
        }
    }

    componentDidMount() {
        const createMode = this.props.createMode;

        if (createMode) {
            this.setState({editable: true});
        }
    }

    render() {
        
        

        const updateMode = this.state.editable;
       
        if (updateMode) {
            return (
                    <div>
                        <form onSubmit={this.makeEditable}>
                            <input type="text" name="name" onChange={(event) => this.props.handleEventChange(this.props.id, event)} placeholder={this.props.name}/>
                            <span className="tab">
                                <input type="text" name="description" onChange={(event) => this.props.handleEventChange(this.props.id, event)} placeholder={this.props.description}/>
                                    <span className="tab"><button type="submit">Update</button>
                                        <span className="tab"><button type="button" onClick={this.props.deleteClick}>Remove</button>
                                        </span>
                                    </span>
                            </span>
                        </form>
                    </div>
            );

        } else {
        return (
            <div className="Event">
                <p>{this.props.name}
                    <span className="tab">{this.props.description}
                        <span className="tab"><button onClick={this.makeEditable}>Edit</button>
                        <span className="tab"><button onClick={this.props.deleteClick}>Remove</button>
                        </span>
                        </span>
                 </span>
                </p>
            </div>
        );
        }
}
}

export default Event;