import React from 'react'
import './MultiSelect.css'
import downarrow from './down-arrow.svg'

class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            data: this.props.data,
            searchInput: '',
            findItems: [],
            ListTogleON: false,
            isFound: false,
            isActive: false
        }
    }

    

    handleOpenList = () => {
        this.setState({
            ListTogleON: this.state.ListTogleON === true ? false : true
        })
    }
    
    filterItems = (arr, query) => {
        return arr.filter((item) => (item.lang.toLowerCase().indexOf(query.toLowerCase()) !== -1) || item.note.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      }
    

    findToList = (e) => {
        var dataCh = this.state.data;
        var filterData = this.filterItems(this.state.data, e.target.value)
        for (var j=0; j<dataCh.length; j++) {
            for (var f=0; f<filterData.length; f++)
            if (filterData[f].lang === dataCh[j].lang) {
                dataCh[j].find = true 
            }
        }
        this.setState({
            data: dataCh,
            findItems: filterData,
            isFound: true
        })      
    }

   handleActiveItem = (e) => {
        var data = this.state.data;
        data[e.currentTarget.id].active = !data[e.currentTarget.id].active
        this.setState({
            data: data,
            isActive: true
        })

   }

    render() {

        return (
            <div className='MSBody'>
                <form autoComplete="off">
                    <div style={{position: "relative"}} className='input-conteiner'>
                        <input  className='input' 
                            name='searchInput' 
                            type='text' 
                            onFocus={this.handleOpenList} 
                            autoComplete={false}
                            // onBlur={this.handleOpenList}
                            onChange={this.findToList} 
                            />
                        <img src={downarrow}  />
                        <div className='ActiveItems'>
                            {
                            this.state.isActive ? <ActiveCard  items={this.state.data} funcA={this.handleActiveItem} /> : <div></div>
                            }
                        </div>
                    </div>
                    {
                        this.state.ListTogleON ? <List data={this.state.isFound ? this.state.findItems : this.state.data} funcA={this.handleActiveItem} /> : <div></div>
                    }
                </form>
            </div>
        )
    }
}

function List(props) {
    var dataForList = props.data
    return (
        <div>
            {   
                dataForList.map((data, i) => 
                    <ListCard id={data.id} key={i} header={data.lang} note={data.note}  funcA={props.funcA}/>
                )
            }
        </div>
    )
}

function ListCard(props) {
    return (
        <div id={props.id} className='ListCard' onClick={props.funcA}>
            <h3>{props.header}</h3>
            <p>{props.note}</p>
        </div>
    )  
}

function ActiveCard (props) {

    var activeItem = props.items
    activeItem = activeItem.filter(((data, i) => data.active))
    return (
        activeItem.map((item, i) => 
            <div className='ActiveCard' key={i}>
                <p>{item.lang}</p>
                <button id={item.id} onClick={props.funcA}>X</button>
            </div>
        )
    )
}

export default MultiSelect;