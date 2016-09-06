
let Tabs = React.createClass({
  getInitialState: function(){
  	return {
  	  currentIndex: 0
  	}
  },
  getTitle: function(index){
  	return index === this.state.currentIndex ? "tab-title-item active" : "tab-title-item";
  },
  getContent: function(index) {
  	return index === this.state.currentIndex ? "tab-content-item active" : 
  	"tab-content-item";
  },
  render: function(){
  	let me = this;
  	return(
  	  <div>
  	    <nav className="tab-title-items">
  	      {React.Children.map(me.props.children,(element,index) =>{
  	      	return(<div onClick={() => {this.setState({currentIndex:index})}} className={me.getTitle(index)}>
  	      		  {element.props.name2}
  	      		</div>)
  	      })}
  	    </nav>
  	    <div className="tab-content-items">
 		  {React.Children.map(me.props.children,(element,index) => {
 		  	return (<div className={me.getContent(index)}>{element}</div>)
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