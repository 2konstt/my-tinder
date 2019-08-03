import React from 'react';
import Moment from 'moment'

class PopUpInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    
    }

    render () {
        return (
            <div>
                <div>
                    <img src={this.props.data.picture.large} />
                    <p>Имя: {this.props.data.name.first}</p>
                    <p>Фамилия: {this.props.data.name.last}</p>
                    <p>Возраст: {this.props.data.dob.age}</p>
                    <p>Дата рождения: {Moment(this.props.data.dob.date).format('DD MMMM YYYY')}</p>
                    <p>Город: {this.props.data.location.city}</p>
                    <p>Улица: {this.props.data.location.street}</p>
                </div>
                <button onClick={this.props.fncInfo}> X </button>
            </div>
        )
    }

}

export default PopUpInfo;