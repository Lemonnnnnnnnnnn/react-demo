//#region link
class Node {
    constructor(value) {
        this.value = value;
        this.next = null
    }

    addNext = (node) => { // 添加后续节点
        this.next = node
    }

    editNode = (value) => { // 用于setState
        this.value = value
    }
}
//#endregion link

//#region useState
const root = new Node(null) // 头节点为null
let currentNode = root // 指针动态指向当前节点
let init = false 

function useState(val) {
    if (!init) { // 初始化hooks
        currentNode.addNext(new Node(val)) // 添加一个新hooks节点
        currentNode = currentNode.next
        return [currentNode.value, currentNode.editNode]
    } else { // 后续渲染
        currentNode = currentNode.next // 调用一次就指向链表的下一个hooks节点
        return [currentNode.value, currentNode.editNode]
    }
}
//#endregion useState

// ----------------------------------
// 执行过程
//#region run
let mounted = false

function run() {
    function _setTitle() {
        if (!mounted) {
            const [title, setTitle] = useState('title')
            mounted = true
            return setTitle
        }
        return () => { } 
    }
    const setTitle = _setTitle()
    const [age, setAge] = useState(18)
    console.log(age); 

    setTitle('new title') 

    init = true; // hooks初始化完成
    currentNode = root // 回溯root链表节点
}

run() 
run() 

// 18
// new title
//#endregion run

