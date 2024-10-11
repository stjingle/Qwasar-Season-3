import React, { Component } from 'react';

class MyLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'local state',
        };
    }

    render() {
        return (
            <div id="location">This content is from the {this.state.location}!</div>
        );
    }
}

export default MyLocation;
