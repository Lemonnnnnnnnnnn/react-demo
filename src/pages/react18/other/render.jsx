const list = []

const App = () => {
    return ( 
    <div>
        {list.length && <List />}
    </div> );
}

const List = () =>{
    return (<div>list</div>)
}
 
export default App;