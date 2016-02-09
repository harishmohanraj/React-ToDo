var React = require('react');
var rootURL = 'https://burning-heat-1250.firebaseio.com/';
var FireBase = require('firebase');

module.exports = React.createClass({
    getInitialState : function(){
        return{
            text : this.props.item.text,
            isDone : this.props.item.done,
            textChanged : false
        }
    },
    updateDoneStatus : function(event){
        var update = event.target.checked
        this.setState({
            isDone : update
        });
        this.fb.update({done : update});
    },
    componentWillMount : function(){
        this.fb= new FireBase(rootURL + "items/" + this.props.item.key);
    },
    handleClick : function(){
      this.fb.remove();
    },
    handleTextChange : function(event){
        this.setState({
            text : event.target.value,
            textChanged : true
        });
    },
    saveUpdatedText : function(event){
        this.fb.update({text : this.state.text});
        this.setState({
         textChanged : false
         });
    },
    undoUpdatedText : function(event){
        this.setState({
            text: this.props.item.text,
            textChanged : false
        });
    },
    changesButtons : function(){
        if(!this.state.textChanged){
            return null
        }else{
            return [
                    <button className="btn btn-default" onClick={this.saveUpdatedText}>Save</button>,
                    <button className="btn btn-default" onClick={this.undoUpdatedText}>Undo</button>
                ]
        }
    },
    render : function(){
        return <div className="input-group">
            <span className="input-group-addon">
                <input type="checkbox" checked={this.state.isDone} onChange={this.updateDoneStatus}/>
            </span>
            <input type="text"
                   className="form-control"
                   onChange = {this.handleTextChange}
                   value={this.state.text}
                    disabled={this.state.isDone}/>
            <span className="input-group-btn">
                {this.changesButtons()}
                <button
                    className="btn btn-default"
                    onClick = {this.handleClick}
                    >Delete
                </button>
            </span>
        </div>
    }
});