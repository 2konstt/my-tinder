import React from 'react';
import './App.css';
import UserCard from './UserCard';

// Вспомогательные переменные для функций fncLike / fncDislike
var likesarr = []
var dislikesarr = []


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      likes: [], 
      dislikes: [], 
      infoON: 'none', 
      needGender: '',
      needAge: '',
    }
  }
  componentDidMount () {
    this.getNewUser();
    
  }

  getNewUser = () => {
    fetch('https://randomuser.me/api')
    .then(response => response.json())
    .then(result => {
      console.log(result)
      this.setState({
        userData: result
      })
    })
    .catch(error => console.log(error))
  }

  fncLike = () => {
    likesarr.push(this.state.userData)
    this.setState({
      likes: likesarr
    })
    this.findBestUser()
    this.state.needGender ? this.getBestUser() : this.getNewUser()
    
  }

  fncDislike = () => {
    dislikesarr.push(this.state.userData)
    this.setState({
      dislikes: dislikesarr
    })
    this.findBestUser()
    this.state.needGender ? this.getBestUser() : this.getNewUser()
    
  }

  fncInfo = () => {
      this.setState({
        infoON: this.state.infoON === 'block' ? 'none' : 'block'
      })
  }

  findBestUser = () => {
    //получаем данные из тех, кого лайкнул пользователь
    var Gender = []
    var age = []
    for (var i=0; i<this.state.likes.length; i++) {
      Gender.push(this.state.likes[i].results[0].gender)
      age.push(this.state.likes[i].results[0].dob.age)
    }
    console.log(Gender)
    console.log(age)
    //сортируем на М/Ж
    var FMarr = []
    var Marr = []
    for (var j=0; j<Gender.length; j++) {
      if (Gender[j] === 'female') {
        FMarr.push(Gender[j])
      } else {
        Marr.push(Gender[j])
      }
    }
    console.log(FMarr)
    console.log(Marr)
    //суммируем массив с возрастом
    var summAge = 0
    for (var a=0; a < age.length; a++) {
      summAge += age[a]
    }
    //сравниваем и получаем нужный пол и возраст
    if (this.state.likes.length > 10) {
      //сравниваем пол
      if (FMarr.length > Marr.length) {
        this.setState({
          needGender: 'female'
        })
      } else {
        this.setState({
          needGender: 'male'
        })
      }
      // получаем средний возраст
      var needAvgAge = Math.floor(summAge / this.state.likes.length)
      this.setState({
        needAge: needAvgAge
      })
      console.log(this.state.needGender)
      console.log(this.state.needAge)
    }
    
    
  
  }

  getBestUser = () => {
    fetch('https://randomuser.me/api?gender='+this.state.needGender)
    .then(response => response.json())
    .then(result => {
      this.setState({
        userData: result
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        {
          this.state.userData &&
          <div>
            <UserCard 
            firstname={this.state.userData.results[0].name.first}
            age={this.state.userData.results[0].dob.age}
            gender={this.state.userData.results[0].gender}
            foto={this.state.userData.results[0].picture.large}
            fncLike={this.fncLike}
            fncDislike={this.fncDislike}
            fncInfo={this.fncInfo}
            />
          <div style={{display: this.state.infoON ,position: 'fixed', zIndex: '223456789009876543234567890'}}>
            <p>Имя: {this.state.userData.results[0].name.first}</p>
            <p>Фамилия: {this.state.userData.results[0].name.last}</p>
            <p>Возраст: {this.state.userData.results[0].dob.age}</p>
            <p>Дата рождения: {this.state.userData.results[0].dob.date}</p>
            <p>Город: {this.state.userData.results[0].location.city}</p>
            <p>Улица: {this.state.userData.results[0].location.street}</p>
            <button onClick={this.fncInfo}>X</button>
          </div>
        </div>
        }
        <button onClick={this.getBestUser}></button>
      </div>
    );
  }

}




export default App;
