import React from 'react';

class BtnGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div>
                <button onClick={this.props.fncLike}>LIKE</button>
                <button onClick={this.props.fncInfo}>INFO</button>
                <button onClick={this.props.fncDislike}>DISLIKE</button>
            </div>
        )
    }
}

export default BtnGroup;