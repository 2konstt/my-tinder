import React from 'react';
import './App.css';
import UserCard from './UserCard';
import BtnGroup from './BtnGroup';
import PopUpInfo from './PopUpInfo';
import MultiSelect from './MultiSelect'

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
      infoON: false, 
      needGender: '',
      needAge: '',
      dataForList: [{id: 0, active: false, find: false, lang: 'Русский', note: 'Русский'}, 
      {id: 1, active: false, find: false, lang: 'English', note: 'Английский'},
      {id: 2, active: false, find: false, lang: 'Polska', note: 'Польский'},
      {id: 3, active: false, find: false, lang: 'Deuchland', note: 'Неметский'}]
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
        infoON: this.state.infoON === true ? false : true
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
        {/* {
          this.state.userData &&
          <div>
            {
              this.state.infoON ? 
                <PopUpInfo 
                data={this.state.userData.results[0]}
                fncInfo={this.fncInfo}
                /> : 
              <div>
                <UserCard 
                data={this.state.userData.results[0]}  
                />
                <BtnGroup 
                fncLike={this.fncLike}
                fncDislike={this.fncDislike}
                fncInfo={this.fncInfo}
                />
                
              </div>
            }
            
 
        </div>
        } */}
        MultiSelect
                
        <MultiSelect data={this.state.dataForList}        />
      </div>
    );
  }

}




export default App;
