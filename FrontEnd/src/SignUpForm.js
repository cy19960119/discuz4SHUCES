/**
 * Created by lenovo on 2016/12/28.
 */
import React from 'react';
import fetch from 'isomorphic-fetch'

const SignUpForm=React.createClass({
    getInitialState:function(){
        return {
            hasID: 'Waiting to check your ID.'
        };
    },
    /*handleChange:function (event) {
        var valueForCheck=event.target.value;
        var that=this;
        fetch('ajax/test.json')
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        for(var i in data.index){
                            if(data.index[i].ID===valueForCheck){
                                that.setState({
                                    value:valueForCheck,
                                    hasID:'ID exist!Choose another one please.'
                                });
                                break;
                            }
                            else{
                                that.setState({
                                    value:valueForCheck,
                                    hasID:'Valid ID!'
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
    },*/
    handleSubmit:function(){
        var Num = this.refs.Num.value;
        var Name = this.refs.Name.value;
        var grp = this.refs.grp.value;
        var passwd = this.refs.passwd.value;
        var Confirm = this.refs.Confirm.value;
        var that=this;
        fetch("regcheck.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "number=" + Num + "&username=" + Name + "&grp=" + grp + "&passwd=" + passwd + "&confirm=" + Confirm
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
            <form onSubmit={this.handleSubmit}>
                <p className="SignUp-title">Sign Up</p>
                <h4>{this.state.hasID}</h4>
                <input name="number" ref="Num" type="text" placeholder="请输入学号"/>
                <br/>
                <input name="username" ref="Name"  type="text" placeholder="请输入姓名"/>
                <br/>
                <input name="grp" ref="grp"  type="text" placeholder="请输入小组名"/>
                <br/>
                <input name="passwd" ref="passwd"  type="password" placeholder="请输入密码"/>
                <br/>
                <input name="confirm" ref="Confirm"  type="password" placeholder="再输入一次密码"/>
                <button>Submit</button>
            </form>
        );
    }
});

export default SignUpForm;

