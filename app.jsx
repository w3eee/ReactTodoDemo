var Todo = React.createClass({
    render: function(){
        var content = this.props.children;
        var t = new Date();
        t = t.toLocaleString();
        var oi = content.indexOf(' ');
        var name = '';
        if(oi !== -1){
            name = content.slice(0, oi);
            content = content.slice(oi+1, content.length);
        }
        name = name || 'Anonymous';
        return (
            <li className="item">
                <div className="fl">
                    <a href="#"><img src="http://tp3.sinaimg.cn/1820553510/50/40005020635/0" alt="" className="avatar" /></a>
                </div>
                <div className="item-r">
                    <div className="msg">
                        <strong><a href="#">{name}</a></strong>
                        <span>{t}</span>
                    </div>
                    <div className="content">{content}</div>
                </div>
            </li>
        )
    }
})

var TodoForm = React.createClass({
    handlerSubmit: function(e){
        e.preventDefault();
        var content = this.refs.content.getDOMNode().value.trim();
        if(!content){
            alert('不要发空的信息啦!');
            return;
        }
        //post and callback
        this.props.onTodoSubmit({content: content});
        this.refs.content.getDOMNode().value = '';
        return;
    },
    render: function(){
        return (
            <form className="clearfix" onSubmit={this.handlerSubmit}>
                <textarea name="content" className="textarea" ref="content"></textarea>
                <button className="btn btn-1 fr mr10">发布</button>
            </form>
        )
    }
})

var TodoList = React.createClass({
    render: function(){
        var todoNodes = this.props.data.map(function(t){
            return (
                <Todo>{t.content}</Todo>
            )
        })
        return (
            <ul className="list clearfix">{todoNodes}</ul>
        )
    }
})

var TodoBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handlerTodoSubmit: function(t){
        var todos = this.state.data;
        var newTodos = todos.concat([t]);
        this.setState({data: newTodos});
        return;
    },
    render: function(){
        return (
            <div>
            <TodoForm onTodoSubmit={this.handlerTodoSubmit} />
            <TodoList data={this.state.data} />
            </div>
        )
    }
})

//render app
React.render(
    <TodoBox />,
    document.getElementById('content')
)