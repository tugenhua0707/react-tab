
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