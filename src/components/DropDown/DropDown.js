import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const myStyle = {
    height: '40px',
    width: '100px',
    backgroundColor: 'transparent',
}
class Selector extends Component {
    render() {
        const arr = ["one", "two", "three"];
        return (
            <div style={myStyle}>
                <Dropdown options={arr} style={myStyle}
                    onChange={this.props.onChange}
                    value={arr[0]}
                    placeholder="Select an option" />
            </div>
        )
    }
}
export default Selector;