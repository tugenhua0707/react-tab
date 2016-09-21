var immutable = require('immutable');
/*
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

// 深度拷贝性能问题
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
*/
/*
var obj1 = {
  age: 5,
  list: [1,2,3,4,5]
};
var map1 = immutable.fromJS(obj1);
console.log(map1);
var map2 = map1.set('count',2);
console.log(map1.get('count')); // undefined
console.log(map2.get('count')); // 2
console.log(map1.list === map2.list); // true
*/
var arr = immutable.fromJS([1]);
var arr1 = arr.push(2);
console.log(arr.toJS(), arr1.toJS()); // => [1], [1,2] 


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