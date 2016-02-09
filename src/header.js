var React = require('react');

module.exports = React.createClass({
    getInitialState : function(){
        return {
            text : ''
        }
    },
    render : function(){
        return <div className="input-group">
                <input type="text"
                       className="form-control"
                        value={this.state.text}
                        onChange={this.updateText}/>
                <span className="input-group-btn">
                    <button
                        className="btn btn-default"
                        onClick={this.handleClick}
                        type="button">Add
                    </button>
                </span>
            </div>
    },
    handleClick : function(){
        this.props.itemsStore.push({
            text : this.state.text,
            done : false
        });
        this.setState({
            text : ''
        })
    },
    updateText : function(e){
        this.setState({text : e.target.value})
    }
});