import React, { useState ,useEffect} from 'react';
import { ObjectTable } from './ObjectTable';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMetadata } from 'actions'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));
const ObjectList = () => {
  const dispatch = useDispatch()
  const config = useSelector(state => state.config)
  const classes = useStyles();
  const [con] = useState(config)
  console.log("Provider dipatch object list", config.objectList)
  useEffect(() => {
    con.objectList.map((obj) => dispatch(fetchMetadata(con, obj.name)))
  }, [con, dispatch])
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ObjectTable objectList={config.objectList} />
      </div>
    </div>
  );
};

export default ObjectList;