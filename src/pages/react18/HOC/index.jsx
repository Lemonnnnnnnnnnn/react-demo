import React, { Component } from 'react';

// @LogWrapper
class Hoc extends Component {
    render() {
        console.log(this.props , '组件')
        return (
            <div>
                HOC
            </div>
        );
    }
}

function LogWrapper(Component) { // 接收一个组件
    return class LogWrapper extends React.Component { // 返回一个新组件
        componentDidMount(){
            console.log('init')
        }
        render() {
            console.log(this.props , '包装器')
            return (
                <Component {...this.props} /> 
            )
        }
    }
}

export default LogWrapper(Hoc);