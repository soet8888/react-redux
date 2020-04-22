import React, { Component } from 'react';
import { SqlToolBar } from './SqlToolBar'
import { SqlTable } from './SqlTable'
import { Divider } from '@material-ui/core';

class Sql extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
    }
    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { title, description, author } = doc.data();
            boards.push({
                key: doc.id,
                doc,
                title,
                description,
                author,
            });
        });
        this.setState({
            boards
        });
    }
    render() {
        return (
            <div>
                <SqlToolBar />
                <Divider/>
                <Divider />
                <br/>
                <br/>
                <br/>
                <SqlTable />
            </div>
        )

    }

}

export default Sql;
