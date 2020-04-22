import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import  {LogView} from './LogView'
import {LogToolbar} from './LogToolbar'

class Logs extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }
  render(){
    return (
      <div>
        <LogToolbar/>
        <Divider/>
        <LogView/>
      </div>
    )

  }

}

export default Logs;
