
import React from 'react';

function Wrapper(Component) {
    return class WrapperComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                loaded: false
            }
        }

        componentDidMount() {
            setTimeout(() => {
                this.setState({ loaded: true })
                console.log('数据加载完成');
            }, 1000)
        }

        render() {
            const {loaded} = this.state
            if(!loaded) return <div>loading...</div>
            return ( 
                <div>
                    <header>{this.props.title}</header>
                    <Component {...this.props} />
                    <footer>footer</footer>
                </div>
            )
        }
    }
}


class Content extends React.Component {
    render() {
        return (<div>content</div>);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.Page = Wrapper(Content)
    }

    render() {
        const { Page } = this
        return (
            <Page title='title' />
        );
    }
}

export default App;

