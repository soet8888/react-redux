import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class DropDown extends Component {
    render() {
        const defaultOption = this.props.projectList[0];
        return (
            <div>
                <Dropdown options={this.props.projectList}
                    onChange={this.props.onChange}
                    value={defaultOption}
                    placeholder="Select an option" />
            </div>
        )
    }
}
export default DropDown;