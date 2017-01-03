import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Start from './start.js';
import LoginForm from './LoginForm.js'
import SignUpForm from './SignUpForm.js'
import FetchList from './FetchList.js'
import './start.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            route: window.location.hash.substr(1),
            LABEL:false,
            stateID:null,
            TIPS:'To get started, please sign up or login',
        }
    }
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    }
    handleClick(){
        var StateID=this.state.stateID;
        if (StateID !== null) {
            this.setState({
                LABEL: false,
                StateID: null
            });
        }
        else {
            this.setState({
                LABEL: false
            });
        }
    }
    changeItem = (CheckedID) => {
        this.setState({
            stateID:CheckedID,
            route:'/logged'
        });
    }
    changeTIPS = (text) => {
        this.setState({
            TIPS:text
        });
    }
  render() {
      let Child;
      switch (this.state.route){
          case '/Login': Child = LoginForm; break;
          case '/signUp': Child = SignUpForm; break;
          case '/index': Child = Start; break;
          case '/logged':Child = FetchList;break;
          default:      Child = Start;
      }
      console.log(this.state.route);
      var LABEL = this.state.LABEL ? "Want to Logout? Click here.😶":"Index.(*^_^*)";
      return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Discuz4SHUCES</h2>
            <a className="indexRef"  href='#/index' onClick={this.handleClick}>{LABEL}</a>
        </div>
        <p className="App-intro">
            {this.state.TIPS}
        </p>
          <Child changeItem={this.changeItem} changeTIPS={this.changeTIPS}/>
      </div>
    );
  }
}

export default App;
