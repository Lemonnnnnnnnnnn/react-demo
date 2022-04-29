import React, { Component } from 'react';

@createRedux
@connect(mapStateToProps, mapDispatchToProps)
class Hoc extends Component {
    componentDidMount() {
        const { foo, hello } = this.props
        hello(`hello ${foo}`)
    }

    render() {
        return (
            <div>
                HOC
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        foo: state.foo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hello: (str) => dispatch(str)
    }
}

function createRedux(Component) { // 包装器，为子组件绑定初始状态和dispatch方法
    return class Wrapper extends React.Component { // 返回一个新组件
        constructor(props) {
            super(props)

            function dispatch(str) {
                console.log(str)
            }

            this.dispatch = dispatch

            this.state = {
                foo: 'foo',
            }

        }

        render() {
            return (
                <Component dispatch={this.dispatch} state={this.state}  {...this.props} />
            )
        }
    }
}

function connect(mapStateToProps, mapDispatchToProps) { // 接收一个组件
    return function (Component) {
        return class Wrapper extends React.Component { // 返回一个新组件

            render() {
                const {state , dispatch} = this.props  // 获取外层HOC传入的state和 dispatch
                const stateProps = mapStateToProps(state) // 将state 传入 mapStateToProps 
                const dispatchProps = mapDispatchToProps(dispatch) // 将dispatch 传入 mapDispatchToProps
                return (
                    <Component {...stateProps} {...dispatchProps}  {...this.props} /> // 作为props传入被包装的组件中
                )
            }
        }
    }
}




export default Hoc;