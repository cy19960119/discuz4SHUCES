/**
 * Created by lenovo on 2017/1/2.
 */
import React from 'react';
import './start.css'

const Start=React.createClass({
    render:function () {
        return(
            <div className="linkWrap">
                <span>
                    <a className="linkRef" href="#/signUp">Sign up</a>
                </span>
                <span>|</span>
                <span>
                    <a className="linkRef"  href="#/Login">Login</a>
                </span>
            </div>
        );
    }
});

export default Start;