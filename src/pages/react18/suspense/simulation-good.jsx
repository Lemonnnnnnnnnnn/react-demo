import React from "react";

class MySuspense extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(err) {
        console.log('捕获错误！');
        this.setState({ hasError: true })

        const promise = err.promise
        // Promise.resolve(value)，如果value是一个thenable对象，那么会跟随这个对象，其返回值会作为Promise.resolve的返回值。
        // 说简单点，Promise.resolve会把在执行的请求执行完
        Promise.resolve(promise).then(() => { 
            this.setState({ hasError: false })
        })
    }


    render() {
        const { fallback } = this.props;
        if (this.state.hasError) {
            return fallback;
        }
        return <div>{this.props.children}</div>;
    }
}

function createResource(url) {
    const suspender = {
        status: 'loading',
        result: null,
        promise: null
    }

    const promise = fetch(url)
        .then((res) => res.json())
        .then((res) => {
            suspender.status = "success";
            suspender.result = res;
        })
        .catch((error) => {
            suspender.status = "error";
            suspender.result = error;
        });

    return {
        read() {
            if (suspender.status === "loading") {
                suspender.promise = promise
                throw suspender
            } else if (suspender.status === "error") {
                throw new Error(suspender.result); // 抛出错误
            } else {
                return suspender.result; // 返回结果
            }
        },
    };
}

const resource = createResource("https://api.waifu.im/random");

const Content = () => {
    console.log('进入Content渲染');
    const data = resource.read();
    console.log('请求完成')
    return <img src={data.images[0].url} alt="" />;
};

function App() {
    return (
        <MySuspense fallback={<div>loading...</div>}>
            <Content />
        </MySuspense>
    );
}

export default App;
