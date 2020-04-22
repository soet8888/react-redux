import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Selector extends Component {
    render() {
        var defaultOption;
        if (this.props.defaultOption ===null){
            defaultOption = this.props.projectList[0].name;
        }else{
            defaultOption = this.props.defaultOption.name;
        }
        return (
            <div>
                <Dropdown options={this.props.projectList.map((v) => v.name)}
                    onChange={this.props.onChange}
                    value={defaultOption}
                    placeholder="Select an option" />
            </div>
        )
    }
}
export default Selector;