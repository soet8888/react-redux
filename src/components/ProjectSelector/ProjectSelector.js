import React, { useState, useEffect } from 'react';
import * as CONSTANT from 'constants/constants';
import * as ROUTES from 'constants/routes';
import { withRouter } from 'react-router-dom';
import Selector from './components/selector';
import { useSelector, useDispatch } from 'react-redux'
import { fetchObject, fetchProject, addCurrentProject } from "actions"
const ProjectSelector = props => {
  const config = useSelector(state => state.config)
  const dispatch = useDispatch();
  const { history } = props;
  const [newconfig] = useState(config)
  useEffect(() => {
    dispatch(fetchProject(newconfig))
    dispatch(fetchObject(newconfig))
  }, [newconfig, dispatch]);
  const onDropDownChange = (e) => {
    const filterProject = config.projectList.filter(p=> p.name===e.value);
    if (e.value === CONSTANT.ALL_PROJECT) {
      history.push(ROUTES.PROJECT_LIST)
    } else {
      dispatch(fetchObject(config, filterProject[0].id));
      dispatch(addCurrentProject(config, filterProject[0].id));
    }
  }
  return (
    <div>
      <div align="center">
        <Selector
          defaultOption={config.currentProject.id === null ? null : config.currentProject}
          projectList={config.projectList.filter(p=> p.id!==CONSTANT.NEW_PROJECT_ID)}
          onChange={onDropDownChange} />
      </div>
    </div>
  );
};

export default withRouter(ProjectSelector);
