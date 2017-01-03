/**
 * Created by lenovo on 2016/12/28.
 */
import React from 'react';
import fetch from 'isomorphic-fetch'
import './startForm.css'

const LoginForm=React.createClass({
    getInitialState:function(){
        return {
            LoginState: 'Please login.'
        };
    },
    handleSubmit:function(){
        var IDForCheck=this.refs.LoginID.value;
        var PasswdForCheck=this.refs.LoginPasswd.value;
        var that=this;
        fetch('ajax/test.json')
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        for(var i in data.index){
                            if(data.index[i].ID===IDForCheck){
                                if(data.index[i].passwd===PasswdForCheck){
                                    that.setState({
                                        LoginState:'Login succeeded!'
                                    });
                                    var CheckedID = data.index[i].ID;
                                    var Tips = 'Choose your ideal question quickly.';
                                    that.props.changeItem(CheckedID);
                                    that.props.changeTIPS(Tips);
                                }
                                else{
                                    that.setState({
                                        LoginState:'Invalid ID or Password!'
                                    });
                                }
                                break;
                            }
                            else{
                                that.setState({
                                    LoginState:'Invalid ID or Password!'
                                });
                            }
                        }
                    });
                } else {
                    console.log('请求失败，状态码为', response.status);
                }
            }, function(err) {
                console.log('出错：', err);
            });
    },
    render:function () {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p className="Login-title">Login</p>
                    <h4>{this.state.LoginState}</h4>
                    <input type="text" ref="LoginID" placeholder="Enter your ID here"/>
                    <input type="password" ref="LoginPasswd" placeholder="Enter your password here"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
});

export default LoginForm;

