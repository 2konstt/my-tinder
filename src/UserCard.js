import React from 'react';

class UserCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div>
                <img src={this.props.foto} />
                <p>{this.props.firstname} age:{this.props.age}</p>
                <p>{this.props.gender}</p>
                <button onClick={this.props.fncLike}>LIKE</button>
                <button onClick={this.props.fncInfo}>INFO</button>
                <button onClick={this.props.fncDislike}>DISLIKE</button>
            </div>
        )
    }
}

export default UserCard;