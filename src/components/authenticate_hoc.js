import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import {connect} from 'react-redux';


export default function(ComposedComponent){

class Authenticate extends Component {

componentWillMount(){
if(!this.props.loggedin){
this.props.history.push('/');
}
}

  render() {  
	 return (
      <ComposedComponent {...this.props} />
    );  
  }
 }


function mapStateToProps(state){
	return {loggedin:state.loggedin}
}

return connect(mapStateToProps)(Authenticate);
}
