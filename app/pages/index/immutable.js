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