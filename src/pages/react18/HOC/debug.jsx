import React, { Component } from 'react';

@testWrapper
@LogWrapper
class Hoc extends Component {
    render() {
        return (
            <div>
                HOC
            </div>
        );
    }
}

function LogWrapper(Component) { // 接收一个组件
    class LogWrapper extends React.Component { // 返回一个新组件
        render() {
            return (
                <Component {...this.props} />
            )
        }
    }
    LogWrapper.displayName = `LogWrapper(${getDisplayName(Component)})`
    return LogWrapper
}

function testWrapper(Component) { // 接收一个组件
    class testWrapper extends React.Component { // 返回一个新组件
        render() {
            return (
                <Component {...this.props} />
            )
        }
    }
    testWrapper.displayName = `testWrapper(${getDisplayName(Component)})`
    return testWrapper
}

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

export default Hoc;