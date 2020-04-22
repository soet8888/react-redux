import React, { Component } from 'react';

class Configuration extends Component {
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
      <div />
      // <div>
      //   <ConfigToolBar />
      //   <Divider />
      //   <div>
      //     <br/><br/>
      //     <CreateProject isUpdate={true} />
      //   </div>

      // </div>
    )

  }

}

export default Configuration;
