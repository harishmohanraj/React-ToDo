var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var rootURL = 'https://burning-heat-1250.firebaseio.com/';
var Header = require('./header');
var List = require('./list');


var Hello = React.createClass({
    getInitialState : function(){
        return {
            items : {},
            loaded : false
        }
    },
    mixins : [ReactFire],
    componentWillMount(){
        this.fb = new FireBase(rootURL + 'items/');
        this.bindAsObject(this.fb,'items');
        this.fb.on('value',this.handleDataLoaded);
    },
    handleDataLoaded : function(){
        this.setState({loaded : true});
    },
    deleteButton : function(){
        if(!this.state.loaded || !this.state.items){
            return
        }else{
            return <div className="text-center clear-complete">
                <hr />
                <button
                    type="button"
                    onClick={this.onDeleteDoneClick}
                    className="btn btn-default">Clear Complete
                </button>
                </div>
        }
    },
    onDeleteDoneClick : function(){
        for(var key in this.state.items){
            if(this.state.items[key].done === true) {
                this.fb.child(key).remove();
            }
        }
    },
    render: function() {
        return <div className="row panel panel-default">
                    <div className="col-md-8 col-md-offset-2">
                        <h2 className="text-center">
                            TO-DO List
                        </h2>
                        <Header itemsStore={this.firebaseRefs.items} />
                        <hr/>
                        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
                            <List items={this.state.items}/>
                            {this.deleteButton()}
                        </div>
                    </div>
                </div>
    }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
