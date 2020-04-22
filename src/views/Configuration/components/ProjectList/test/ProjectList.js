import React, { Component } from "react";
import Filter from '../ProjectCard/test/Filter';
import * as ROUTES from 'constants/routes';
import * as CONSTANT from 'constants/constants';
import { connect } from 'react-redux';
import { addCurrentProject } from 'actions'

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.projectSelected = this.projectSelected.bind(this);
  }
  projectSelected(projectID) {
    if (projectID === CONSTANT.NEW_PROJECT_ID) {
      this.props.history.push(ROUTES.CREATE_PROJECT);
    } else {
      this.props.dispatch(addCurrentProject(this.props.config, projectID));
      this.props.history.push(ROUTES.DASHBOARD);
    }
  }
  render() {
    return (
      <div className="container">
        <br /><br /><br />
        <div>
          <Filter
            projects={this.props.config.projectList.filter(p => p.id !== CONSTANT.ALL_PROJECT_ID)}
            projectSelected={projectID => this.projectSelected(projectID)}
          />
        </div>
      </div>
    );
  }
}
function configListProps(state) {
  return {
    config: state.config,
  }
}
export default connect(configListProps)(ProjectList);

