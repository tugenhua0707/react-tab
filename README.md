# Immutable 与 React中实践~ 
## React原理
#### 在React中，UI以组件的形式搭建的，组件之间可以嵌套组合，组件之间的通信的数据流是单向的，顶层组件可以通过props
属性向下层组件传递数据，而下层组件不能向上层组件传递数据。兄弟组件之间也不能传递，这样简单的单向数据流支撑了React数据
的可控性。
## React的生命周期
### React初始化生命周期调用顺序如下：

 getInitialState（初始化实例） -> componentWillMount(在完成首次渲染之前调用,比如做些操作，调用getInfo方法)
  
 -> getInfo（调用相对应的方法，改变state的值）-> render（调用render方法）-> 

 componentDidMount（真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素).


 ### 点击元素操作（调用 getInfo方法） 重新渲染页面 的生命周期顺序如下 ->
 
 shouldComponentUpdate(在调用render方法之前调用,默认返回true，重新调用render方法进行页面渲染，返回false的
  话，就不会调用 render 方法。) 

 -> componentWillUpdate(接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state) 

 -> render（调用render方法） -> 

 -> componentWillReceiveProps（方法被调用）

 componentDidUpdate（每次调用render方法之后会调用componentDidUpdate方法，该方法可以访问新的dom元素）
 #### 详细请看 immutable -> app -> pages -> index -> react.js（及访问对应的页面 react.html）
 代码如下：
    let App2 = React.createClass({

      componentWillReceiveProps: function(nextProps){
        console.log(nextProps);
        console.log("componentWillReceiveProps方法被调用");
      },
      render: function(){
        return(
          <div></div>
        )
      }
    });

    let App = React.createClass({

      // 作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state
      getInitialState: function() {
        return {
          count   : 0
        }
      },
      // 该方法来获取默认props值，这个方法会且只会在声明组件类时调用一次，返回的默认props由所有实例共享。
      getDefaultProps: function() {
        return {
          isFlag   : false
        }
      },
      // 在完成首次渲染之前调用 
      componentWillMount: function() {
        this.getInfo();
      },
      // 真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。
      componentDidMount: function() {
        var dom = $(this.refs.dom.getDOMNode());
        console.log(dom);
        this.dom = dom;
      },
      // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。 
      componentWillReceiveProps: function() {
        console.log("!!!!!!!!!!!!!!!");
      },
      // 组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法  默认为true，重新渲染
      shouldComponentUpdate: function() {
        console.log("在调用render方法之前调用");
        return true;
      },
      // 接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state.
      componentWillUpdate: function() {
        console.log("接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state");
        this.state.count = 8;
      },
      // 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素. 
      componentDidUpdate: function() {
        console.log("每次调用render方法之后会调用componentDidUpdate方法，该方法可以访问新的dom元素");
        console.log(this.dom.find('.newDOM').length)
      },
      // 组件被移除之前被调用，可以用于做一些清理工作
      componentWillUnmount: function() {

      },
      getInfo: function() {
        this.state.count++;
        this.setState({
          "count"  : this.state.count
        });
      },
      // 创建虚拟dom 
      render: function() {
        console.log("调用render方法");
        console.log(this.props.isFlag);

        return(
          <div className="" ref = "dom">
            <p onClick={this.getInfo} >click点击事件</p>
            <p>click点击的值为{this.state.count}</p>
            {this.state.count > 2 ? <div className="newDOM">122211</div> : ''}
            <App2 count = {this.state.count} />
          </div>
        )
      }
    });
    React.render(
      <App />,
      document.getElementById("root")
    );
## React性能
#### react-demo实例(优化之前)
    var App = React.createClass({
      getInitialState: function() {
        return {
          list: this.props.dataArr  
        }
      },
      toggleChecked: function(e) {
        var checked = e.target.checked;
        var index = e.target.getAttribute("data-index");

        var list = this.state.list;
        list[index].checked = checked;
        
        this.setState({
          list: list
        });
      },
      render: function(){
        var me = this;
        return(
          <ul>
            {this.state.list.map(function(data,index){
              return (
                <ListItem data = {data} index = {index} key = {data.name} toggleChecked = {me.toggleChecked} />
              )
            })}
          </ul>
        )
      }
    });
    var ListItem = React.createClass({

      shouldComponentUpdate: function(nextProps, nextState){
        /*
        console.log(this.props.data.checked);
        console.log("----------------------");
        console.log(nextProps.data.checked);
        */
        /*
        if(this.props.data.checked !== nextProps.data.checked){
          return true;
        }
        return false;
        */
        return true;
      },
      render: function(){
        var data = this.props.data;
        var index = this.props.index;
        return(
          <li>
            <input type="checkbox" data-index={index}  checked={data.checked} onChange={this.props.toggleChecked} />
            <span> {data.name} </span>
          </li>
        )
      }
    });
    // 构造一个10000个数据的数组
    var dataArr = [];
    for(var i = 0; i < 10000; i++) {
      var checked = Math.random() < 0.5;
      dataArr.push({
        name: i,
        checked
      })
    };
    React.render(<App dataArr={dataArr} />, document.getElementById("root"));
#### 代码如上，页面上有10000个复选框按钮，每次点击一下会选中或者清空选中操作，可以访问 
app -> html -> demo.html 页面，可以查看效果，每次点击的时候，需要1-2秒时间等待的操作，因为会重新渲染整个页面，
所以存在性能问题。
#### React 使用了diff算法实现了高性能，每当state发生改变的时候，会调用render()方法，它会生成虚拟的dom与之前的
虚拟dom进行对比，如果相同的话，就不进行重新渲染，否则的话，重新渲染页面，这是它的优点，同时也是它的缺点，当某一个父节点下的子节点发生改变的时候，react会重新对比，渲染整个页面，而不是只渲染改动的那块，由上面的react生命周期，我们明白在调用render渲染之前，会调用shouldComponentUpdate方法判断需不需要重新渲染页面，而该方法默认返回true；即 重新渲染页面。因此上面的复选框实例我们可以在 shouldComponentUpdate 方法内做操作，只要判断该元素的checked是否
发生改变，如果没有改变该值，就不重新渲染，如果有值改变的话，只改变的那块及对应的父节点元素。因此在该方法内肯定会想到
如下写代码：
    shouldComponentUpdate: function(nextProps, nextState){
      /*
      console.log(this.props.data.checked);
      console.log("----------------------");
      console.log(nextProps.data.checked);
      */
      if(this.props.data.checked !== nextProps.data.checked){
        return true;
      }
      return false;
    }
### 但是上面的代码 不管我如何操作都不会有效果，原因是 this.props.data.checked 与 nextProps.data.checked
值是相同的，具体的demo实例操作可以看 immutable -> app -> html -> demo.html
### 为什么值会相同的呢，我代码上使用了setState 操作呢？这就需要理解javascript对象中的引用类型了~
### 理解js对象引用类型的demo，代码如下：
    var obj = {
      count: 1
    };
    var clone = obj;
    clone.count = 2;
    console.log(clone.count); // 2
    console.log(obj.count);  // 2

    var a = [{checked: false}, {checked: true}];
    var b = a;
    a[0].checked = true;
    console.log(b) // => [{checked: true}, {checked: true}]
### 可以看到 当我改变其中一个对象的时候，其他的复制它的对象也会跟着改变，因为js对象比较的是内存地址，而不是
基本类型的值比较，所以引用类型的地址更改了的话，其他的复制它的对象也会跟着更改。
## 深度拷贝的性能问题
### 针对上面的js对象引用问题，可能会想到使用深度拷贝；代码代码：
    function isObject(obj) {
      return typeof obj === 'object';
    }
    function isArray(arr) {
      return Array.isArray(arr);
    }
    function deepClone(obj) {
      if(!isObject(obj)) {
        return obj;
      }
      var cloneObj = isArray(obj) ? [] : {};
      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          var value = obj[key];
          if(isObject(value)) {
            cloneObj[key] = deepClone(value);
          }else {
            cloneObj[key] = value;
          }
        }
      }
      return cloneObj;
    }

    var obj1 = {
      age: 5,
      list: [1,2,3,4,5]
    };

    var obj2 = deepClone(obj1);
    console.log(obj1 === obj2);  // false
    console.log(obj1.list === obj2.list); // false

    console.log(obj2.age);  // 5
    console.log(obj2.list); // [1,2,3,4,5]
### 如上拷贝一个对象以后，拷贝的对象与原来的对象不相同，因此可以解决 js引用对象的问题，深度拷贝使用递归的方式，但是
当一个数据结构非常复杂的时候，我只需要拷贝其中一个属性的时候，深度拷贝会循环对象中的所有属性，所以这也是会影响性能的。
在js中实现数据不可变，有两个方法: const(es6)、Object.freeze(es5)。但是这两种方法都是shallow处理，遇到嵌套多深的结构就需要递归处理，又会存在性能上的问题。
### immutable.js 
Immutable.js提供了7种不可变的数据类型: List、Map Stack OrderedMap Set OrderedSet Record。对Immutable对象的操作均会返回新的对象。
mmutable Data(不可变数据)的思想就是，不存在指向同一地址的变量，所有对Immutable Data的改变，
最终都会返回一份新复制的数据，各自的数据并不会互相影响。比如如下代码：
    var immutable = require('immutable');
    var arr = immutable.fromJS([1]);
    var arr1 = arr.push(2);
    console.log(arr.toJS(), arr1.toJS()); // => [1], [1,2]
### 我们执行后，确实原有的数据已经不可变了，又新生成了一个新的不可变数据，不用再担心引用类型数据的变化，因为一切数据都被你把控了。
我们是否也可以每一次操作数据时都deepClone一下，也可以达到这种效果呀，这里的实现有什么不一样吗？deepClone是通过递归对象进行数据的拷贝，而Immutable数据的实现则是仅仅拷贝父节点，而其他不受影响的数据节点都是共享的用同一份数据，以大大提升性能。我们需要做的仅仅是将原生的数据转化成Immutable数据。
可以看如下图演示一下：
### <img src="https://raw.githubusercontent.com/tugenhua0707/immutable-react/master/change.gif"/>
### 当我们在shouldComponentUpdate里判断是否更新时，变化的数据是新的引用，而不变的数据是原来的引用，这样我们就可以非常轻松的判断新旧数据的差异，从而大大提升性能。我们该如何使用到我们的实际项目中呢？其实很简单的，就是数据初始化时，就让它变成Immutable数据.
### 具体可以看 immutable-react -> app -> html -> immutable.html 演示效果
### JS代码如下：
    var immutable = require('immutable');

    var App = React.createClass({
      getInitialState: function() {
        return {  
          // 这里将传入的数据转化成Immutable数据
          list: immutable.fromJS(this.props.dataArr)  
        }
      },
      toggleChecked: function(e) {
        var checked = e.target.checked;
        var index = e.target.getAttribute("data-index");
        // 这里不再是直接修改对象的checked的值了，而是通过setIn，从而获得一个新的list数据
        var list = this.state.list.setIn([index, "checked"], checked);

        this.setState({
          list: list
        });
      },
      render: function(){
        var me = this;
        return(
          <ul>
            {this.state.list.map(function(data,index){
              return (
                <ListItem data = {data} index = {index} key = {data.name} toggleChecked = {me.toggleChecked} />
              )
            })}
          </ul>
        )
      }
    });
    var ListItem = React.createClass({

      shouldComponentUpdate: function(nextProps, nextState){
        // 这里直接对传入的data进行检测，因为只需要检测它们的引用是否一致即可，所以并不影响性能。
        return this.props.data !== nextProps.data;
      },
      render: function(){
        var data = this.props.data;
        var index = this.props.index;
        // 取值也不再是直接.出来，而是通过get或者getIn
        return(
          <li>
            <input type="checkbox" data-index={index}  checked = {data.get("checked")} onChange={this.props.toggleChecked} />
            <span> {data.get("name")}</span>
          </li>
        )
      }
    });
    // 构造一个10000个数据的数组
    var dataArr = [];
    for(var i = 0; i < 10000; i++) {
      var checked = Math.random() < 0.5;
      dataArr.push({
        name: i,
        checked
      })
    };

    React.render(<App dataArr={dataArr} />, document.getElementById("root"));















