import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setplanets} from '../actions/index.js'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import axios from 'axios';


class Planets extends Component {

constructor(props){
super(props);
this.state={allplanets:[],searchcount:0}
}
  
 renderplanets() {
         let size;
         const planets = this.props.planets.map((planet) => {
                     let pop = planet.population;
                     if (pop === "unknown") {
                         size = "200%"
                     } else {
                         size = Math.log(pop) * 100 / 7 + "%";
                     }			 
         return <li key={planet.name} style = {{fontSize: size}} > {planet.name} </li>
     })
     return planets;
    }

componentDidMount() {

    let planet_array = [];
    addtoarray();

    function addtoarray(url = "http://swapi.co/api/planets/") {
        axios.get(url).then((result) => {
            console.log(this);
            for (let i = 0; i < result.data.results.length; i++) {
                let obj = {};
                obj.name = result.data.results[i].name;
                obj.population = result.data.results[i].population;
                planet_array.push(obj);
            }
            if (result.data.next != null) {
                addtoarray(result.data.next)
            } else {
                populate();
            }
        })
    }
    let populate = () => {
        console.log("inside populate");
        this.props.setplanets(planet_array);
        this.setState({
            allplanets: planet_array
        });
    }
	
	setInterval(()=>{
	console.log("resetting time");
	this.setState({searchcount:0});
	},60000)
}

changehandler = (e) => {
if(this.state.searchcount>=15 && this.props.loggedinuser!=="Luke Skywalker"){
alert("you can search only 15 times a minute");
}
else{
	this.setState({searchcount:this.state.searchcount+1})
    const base_url = "https://swapi.co/api/";
    const search_url = `${base_url}planets/?search=${e.target.value}`;
    let planet_array = [];
    if (e.target.value === "") {
        console.log(this.state.allplanets);
        this.props.setplanets(this.state.allplanets);
    } else {
        const request = axios.get(search_url);

        request.then((response) => {
            if (response.data.count === 0) {
                this.props.setplanets(this.state.allplanets);
            } else {
                for (let i = 0; i < response.data.results.length; i++) {
                    planet_array.push(response.data.results[i]);
                }
                this.props.setplanets(planet_array);
            }
        })
    }
}
}

render() {
if(this.props.planets.length===0){
return(
<div className="loader">
   <img src="../../assets/imgs/original.gif"/>
</div>
);
}
else{
return(
<div>
   <div className="form-group">
      <label>Search For Planets:</label>
      <input className="planet-search" onChange={this.changehandler}/>
   </div>
   <ul>
      <CSSTransitionGroup
         transitionName="example"
         transitionEnterTimeout={500}
         transitionLeaveTimeout={300}>
         {this.renderplanets()}
      </CSSTransitionGroup>
   </ul>
</div>
)
}
}

}

function mapStateToProps(state){
return {planets:state.planets,loggedinuser:state.loggedinuser};
}

export default connect(mapStateToProps,{setplanets})(Planets)