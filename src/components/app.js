import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginfunction,setuser} from '../actions/index.js'
import axios from 'axios'

class Logincomponent extends Component{
constructor(props){
super(props);
this.state={username:'',password:''};
}

submithandler=(event)=>{
event.preventDefault();
const base_url = "https://swapi.co/api/";
const search_url = `${base_url}people/?search=${this.state.username}`;
const request = axios.get(search_url);

    request.then((response) => {
	
		if(response.data.results.length==0){
		alert("Unable to login. The username you entered might be wrong");
		this.setState({username:'',password:''});
		}
        for (let i = 0; i < response.data.results.length; i++) {
		console.log(i);
            if (response.data.results[i].name === this.state.username) {

                if (response.data.results[i].birth_year === this.state.password) {
					this.props.setuser(this.state.username);
                    this.props.loginfunction();
					this.props.history.push('/planets');
                }
				else{
				alert("Unable to login. The password you entered might be wrong");
				this.setState({password:''});
				}
            }
			if((i===(response.data.results.length-1)) && (response.data.results[i].name !== this.state.username)){
			alert("Unable to login. The username you entered might be wrong");
			this.setState({username:'',password:''});
			}
        }
    }).catch((err)=>{
	document.location.reload();
	})
  }

userchangehandler=event=>{
this.setState({username:event.target.value});
}

passwordchangehandler=event=>{
this.setState({password:event.target.value});
}

render(){
return(
<div className="login-page">
   <h1 className="header">STAR WARS PLANET SEARCH</h1>
   <img src="../../assets/imgs/lightsaber-2.gif"/>
   <form onSubmit={this.submithandler}>
      <div className="form-group">
         <label>Name(Case sensitive):</label>
         <input type="text" value={this.state.username} onChange={this.userchangehandler} />
         <br/>
         <div className="password-group">
            <label>Password:</label>
            <input type="password" value={this.state.password} onChange={this.passwordchangehandler} />
         </div>
         <br/>
         <button type="submit">Submit</button>
      </div>
   </form>
</div>
)
}
}

function mapStateToProps({loggedin}){
return {loggedin}
}

export default connect(mapStateToProps,{loginfunction,setuser})(Logincomponent);