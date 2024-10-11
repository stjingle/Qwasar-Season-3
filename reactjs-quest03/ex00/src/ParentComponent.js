import React, { Component } from 'react';
import ChildComponent from './ChildComponent.js';

export class ParentComponent extends Component {  
    render() {
      return (
        <h1>
          <span className="title">I'm the parent component.</span>
          <ChildComponent text={"I'm the 1st child"} />
          <ChildComponent text={"I'm the 2nd child"} />
          <ChildComponent text={"I'm the 3rd child"} />
        </h1>
      );
    }
  }

export default ParentComponent;