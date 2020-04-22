import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as CONSTANT from 'constants/constants';

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial'
    }
});

const ProjectCard = props => {
    const classes = useStyles();
    const {
        project,
    } = props;
    const cardOnSelect = (e, id) => {
        e.preventDefault();
        props.onSelect(id);
    }

    const cardOnStart = (e, id) => {
        e.preventDefault();
        props.onStart(id);
    }

    const cardOnStop = (e, id) => {
        e.preventDefault();
        props.onStop(id);
    }
    return (
        <div onClick={(e) => cardOnSelect(e, project.id)}>
            <Card className={classes.root} >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={project.id === CONSTANT.NEW_PROJECT_ID ? "images/add.png" : "/images/project.jpg"}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {project.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {project.id} <br />{project.description} <br />{project.updateTime}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {project.id !== CONSTANT.NEW_PROJECT_ID ?
                    <CardActions>
                        <Button className={classes.cardAction}
                            size="small"
                            color="secondary"
                            onClick={(e) => cardOnStart(e, project.id)}
                        >
                            start
    </Button>
                        <Button
                            size="small"
                            color="primary"
                            onClick={(e) => cardOnStop(e, project.id)}
                        >
                            stop
    </Button>
                    </CardActions> : <div />
                }

            </Card>
        </div>
    );
}
export default ProjectCard;