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
        var Num = this.refs.Num.value;
        var passwd = this.refs.passwd.value;
        var that=this;
        fetch("logincheck.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "number=" + Num + "&passwd=" + passwd
        }).then(function(res) {
            if (res.ok) {
                var FetchRoute = '#/logged';
                var Tips = 'Choose your ideal question quickly.';
                that.props.changeItem(Num,FetchRoute);
                that.props.changeTIPS(Tips);
            } else if (res.status === 401) {
                console.log("Oops! You are not authorized.");
            }
        }, function(e) {
            console.log("Error submitting form!");
        });
    },
    render:function () {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p className="Login-title">Login</p>
                    <h4>{this.state.LoginState}</h4>
                    <input name="number" type="text" ref="Num" placeholder="请输入学号"/>
                    <input name="passwd" type="password" ref="passwd" placeholder="请输入密码"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
});

export default LoginForm;

