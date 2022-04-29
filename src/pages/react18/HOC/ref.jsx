import React, { Component, createRef } from 'react';

class Hoc extends Component {
    btnRef = createRef(null)

    handleClick = () => {
        console.log(this.btnRef)
    }

    render() {
        return (
            <div>
                <Button ref={this.btnRef } />
                <button onClick={this.handleClick}>get ref</button>
            </div>
        );
    }
}


function LogWrapper(Component) { // 接收一个组件
    class LogWrapper extends React.Component {
        componentDidMount() {
            console.log('init')
        }

        render() {
            const { myRef, ...rest } = this.props  // 获取上层传递的 myRef 对象， 并作为ref属性传递给真正的组件
            return (
                <Component ref={myRef}  {...rest} />
            )

        }
    }

    return React.forwardRef((props, ref) => <LogWrapper {...props} myRef={ref} />) // 用forwardRef包装一层，获取到ref并传递给下层
}

@LogWrapper
class Button extends React.Component {
    render() {
        return (
            <button>my button</button>
        )
    }
}


export default Hoc;