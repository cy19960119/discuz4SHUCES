/**
 * Created by lenovo on 2017/1/3.
 */
import React from 'react';
import fetch from 'isomorphic-fetch'

function getQuestion(that){
    fetch('ajax/list.json')
        .then(function (response) {
            if(response.ok){
                response.json().then(function (data) {
                    that.setState({nodeList:[]});
                    for(var i in data.questionList){
                        that.addNode(data.questionList[i])
                    }
                });
            }else {
                console.log('请求失败，状态码为', response.status);
            }
        }, function(err) {
            console.log('出错：', err);
        });
}

const FetchNode=React.createClass({
    render: function () {
        var qLabel=this.props.IsValid === 0 ? '抢题':'已被抢';
        var IsHide=this.props.IsValid === 0 ? {display:'none'}:{display:'inline-block'};
        return(
            <div>
                <h2>第{this.props.qID}题：{this.props.title}</h2>
                <h2 style={IsHide}>第{this.props.groupID}组已抢到该题</h2>
                <button type="button">{qLabel}</button>
            </div>
        );
    }
});

const FetchList=React.createClass({
    getInitialState:function () {
        return{
            nodeList:[],
        }
    },
    componentDidMount:function () {
        document.addEventListener('scroll',this.handleScroll);
    },
    componentWillUnmount(){
        document.removeEventListener('scroll',this.handleScroll);
    },
    addNode:function (node) {
        this.setState({nodeList:this.state.nodeList.concat(node)});
    },
    componentDidMount:function () {
        var that = this;
        //var scrollTop=document.body.scrollTop;
        //var scrollHeight=document.body.scrollHeight;
        //var scrollDistance =  scrollHeight-scrollTop;
        //console.log(scrollDistance);
        //if(scrollDistance<30){
            getQuestion(that);
            //
        //}
    },
    handleClick:function () {
        var that = this;
        getQuestion(that);
    },
    render:function(){
        var nodeList=this.state.nodeList.map(function(node){
            return<FetchNode qID={node.qID} title={node.qTitle} groupID={node.qState} IsValid={node.qState} />
        });

        return(
            <div>
                <div onClick={this.handleClick}>Click me to refresh questions</div>
                {nodeList}
            </div>
        );
    }
});

export default FetchList;

