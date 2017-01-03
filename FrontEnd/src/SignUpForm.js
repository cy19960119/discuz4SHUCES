/**
 * Created by lenovo on 2016/12/28.
 */
import React from 'react';
import fetch from 'isomorphic-fetch'

const SignUpForm=React.createClass({
    getInitialState:function(){
        return {
            value: 'Enter your ID here.',
            hasID: 'Waiting to check your ID.'
        };
    },
    handleChange:function (event) {
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
    },
    handleSubmit:function(){
        var CheckedID = this.refs.userID.value;
        var FetchRoute = '#/logged';
        var Tips = 'Choose your ideal question quickly.';
        this.props.changeItem(CheckedID,FetchRoute);
        this.props.changeTIPS(Tips);
    },
    render:function () {
        var value=this.state.value;
        return(
            <form onSubmit={this.handleSubmit}>
                <p className="SignUp-title">Sign Up</p>
                <h4>{this.state.hasID}</h4>
                <input name="groupID" type="text" placeholder="Enter your group number"/>
                <input ref="userID" name="ID" type="text" value={value} onChange={this.handleChange}/>
                <input name="passwd" type="password" placeholder="Enter your password here"/>
                <button>Submit</button>
            </form>
        );
    }
});

export default SignUpForm;

