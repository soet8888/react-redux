import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard/Card';
import { useDispatch, useSelector } from 'react-redux';
import { StopReplicator, StartReplicator, addCurrentProject } from 'actions';
import * as CONSTANT from 'constants/constants';
import * as ROUTES from 'constants/routes';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 200,
        width: 200,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const ProjectList = props => {
    const config = useSelector(state => state.config);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { history } = props;

    const onStart = ( id) => {
        console.log("start id", id);
        StopReplicator(config)
    };
    const onStop = (id) => {
        console.log("stop id", id);
        StartReplicator(config)
    };
    const onSelect = ( id) => {
        console.log("select id", id);
        if (id!==CONSTANT.NEW_PROJECT_ID){
            dispatch(addCurrentProject(config, id));
            history.push(ROUTES.DASHBOARD);
        }else{
            history.push(ROUTES.CREATE_PROJECT);
        }
    };
    return (
        <div>
            <br /><br />
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {config.projectList.filter(p => p.id !== CONSTANT.ALL_PROJECT_ID)
                            .map((p) => (
                                <Grid key={p.id} item>
                                    <ProjectCard
                                        onStart={onStart}
                                        onStop={onStop}
                                        project={p}
                                        onSelect={onSelect}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
export default ProjectList;