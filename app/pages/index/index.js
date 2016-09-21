
let Tabs = React.createClass({
  getInitialState: function(){
  	return {
  	  currentIndex: 0,
      data: []
  	}
  },
  // 只调用一次，返回对象用于设置默认的props
  getDefaultProps: function(){
    return {
      props: 1
    }
  },
  getInfo: function(index){
    var me = this;
    console.log(index);
    // http://localhost:3000/app/json/index.json
    /*
    $.ajax({
      url: 'http://localhost:3000/app/json/index.json',
      type: 'get',
      dataType: 'json',
      success: function(d){
        me.setState({
          'data': d
        });
      }
    })
    */
  	//return index === this.state.currentIndex ? "tab-title-item active" : "tab-title-item";
  },
  getContent: function(index) {
  	return index === this.state.currentIndex ? "tab-content-item active" : 
  	"tab-content-item";
  },
  render: function(){
  	let me = this;
    console.log(this.props);
  	return(
  	  <div>
  	    <nav className="tab-title-items">
  	      {React.Children.map(me.props.children,(element,index) =>{
  	      	return(<div className={me.state.currentIndex === index ? "tab-title-item active" : "tab-title-item"}>
  	      		  {element.props.name2}
  	      		</div>)
  	      })}
  	    </nav>
  	    <div className="tab-content-items">
 		  {React.Children.map(me.state.catalogs,(element,index) => {
 		  	return (<div className={me.getContent(index)}>{element.description}</div>)
 		  })}
  	    </div>
  	  </div>
  	);
  }
});
let Tab = React.createClass({
  render: function(){
  	return(<div>{this.props.children}</div>);
  }
});
let App = React.createClass({
  render: function(){
  	return(
  	  <div className="container">
  	    <Tabs>
  	      <Tab name2="tab1">
  	      	<div className="red">我是红色的标签页</div>
  	      </Tab>
  	      <Tab name2="tab2">
    		<div className="blue">我是蓝色的标签页</div>
  	      </Tab>
  	      <Tab name2="tab3">
    		<div className="yellow">我是黄色的标签页</div>
  	      </Tab>
  	    </Tabs>
  	  </div>
  	)
  }
});
React.render(
  <App />,
  document.getElementById("container")
);