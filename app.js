var Todo = React.createClass({displayName: "Todo",
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
            React.createElement("li", {className: "item"}, 
                React.createElement("div", {className: "fl"}, 
                    React.createElement("a", {href: "#"}, React.createElement("img", {src: "http://tp3.sinaimg.cn/1820553510/50/40005020635/0", alt: "", className: "avatar"}))
                ), 
                React.createElement("div", {className: "item-r"}, 
                    React.createElement("div", {className: "msg"}, 
                        React.createElement("strong", null, React.createElement("a", {href: "#"}, name)), 
                        React.createElement("span", null, t)
                    ), 
                    React.createElement("div", {className: "content"}, content)
                )
            )
        )
    }
})

var TodoForm = React.createClass({displayName: "TodoForm",
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
            React.createElement("form", {className: "clearfix", onSubmit: this.handlerSubmit}, 
                React.createElement("textarea", {name: "content", className: "textarea", ref: "content"}), 
                React.createElement("button", {className: "btn btn-1 fr mr10"}, "发布")
            )
        )
    }
})

var TodoList = React.createClass({displayName: "TodoList",
    render: function(){
        var todoNodes = this.props.data.map(function(t){
            return (
                React.createElement(Todo, null, t.content)
            )
        })
        return (
            React.createElement("ul", {className: "list clearfix"}, todoNodes)
        )
    }
})

var TodoBox = React.createClass({displayName: "TodoBox",
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
            React.createElement("div", null, 
            React.createElement(TodoForm, {onTodoSubmit: this.handlerTodoSubmit}), 
            React.createElement(TodoList, {data: this.state.data})
            )
        )
    }
})

//render app
React.render(
    React.createElement(TodoBox, null),
    document.getElementById('content')
)
