import React, { Component } from 'react';

@connect(console1 , console2)
class Hoc extends Component {
    render() {
        return (
            <div>
                HOC
            </div>
        );
    }
}

function console1(){
    console.log(111);
}

function console2(){
    console.log(222);
}

function connect(console1, console2){ 
    return function (Component){  // 放回一个包装器
        return class Wrapper extends React.Component { // 返回一个新组件
            componentDidMount(){
                console.log('init')
                console1()
                console2()
            }

            render() {
                return (
                    <Component {...this.props} /> 
                )
            }
        }
    }
}



export default Hoc