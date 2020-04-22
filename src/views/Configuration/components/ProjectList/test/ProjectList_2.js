import React, { Component } from 'react';
import { ProjectCard } from '../ProjectCard/test/ProjectCard';
import { Grid,Card } from '@material-ui/core';
import { connect } from 'react-redux';
import * as ROUTES from 'constants/routes';

class PorjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      projects: [
        {
          id: 1,
          name: "David Davidson",
          company: "Some Company, Inc",
          description: "Met at a party. Will connect with later"
        },
        {
          id: 2,
          name: "Mark Markson",
          company: "Some Company, Inc",
          description: "Met at a party. Will connect with later"
        },
        {
          id: 3,
          name: "Judy Judyson",
          company: "Some Company, Inc",
          description: "Met at a party. Will connect with later"
        },
        {
          id: 4,
          name: "James Jameson",
          company: "Some Company, Inc",
          description: "Met at a party. Will connect with later"
        },
        {
          id: 1,
          name: "David Davidson",
          company: "Some Company, Inc",
          description: "Met at a party. Will connect with later"
        },
        {
          id: 1,
          name: "David Davidson",
          company: "Some Company, Inc",
          description: "Met at a party. Will connect with later"
        },
      ]
    }
  }
  onClick(id) {
    console.log("click callback", id);
    this.props.history.push(ROUTES.DASHBOARD);
  }

  render() {
    let projectCards = this.state.projects.map(p => {
      return (
        <div padding={20}>
          <Grid container spacing={3}>
          <ProjectCard key={p.id}  project={p} onClick={this.onClick.bind(this)} />
        </Grid>
        </div>
        
      )
    })
    return (
      <Card>
        <Grid container spacing={24}>
          {projectCards}
        </Grid>
      </Card>

    )
  }
}
function configListProps(state) {
  return {
      config: state.config,
  }
}
export default connect(configListProps)(PorjectList);

