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
                <img src={this.props.data.picture.large} />
                <p style={{fontSize: '35px'}}>{this.props.data.name.first}</p>
                <p>age:{this.props.data.dob.age}</p>
                <p>{this.props.data.gender}</p>
            </div>
        )
    }
}

export default UserCard;