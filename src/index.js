import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

const reducer = (state, action) => {
    switch (action.type) {
        case "+":
            return { ...state, counter: state.counter + +action.value };
        case "-":
            return { ...state, counter: state.counter - +action.value };
        case "*":
            return { ...state, counter: state.counter * +action.value };
        case "/":
            return { ...state, counter: state.counter / +action.value };

        default:
            return state;
    }
};
const store = createStore(reducer, { counter: 1 });

const changeCounter = ({ type, value }) => ({
    type,
    value
});

class Button extends React.Component {
    handleClick = () => {
        this.props.changeCounter({
            type: this.props.operation,
            value: this.props.value
        });
    };
    render() {
        return (
            <button onClick={this.handleClick}>
                {this.props.operation}
                {this.props.value}
            </button>
        );
    }
}

Button = connect(
    null,
    { changeCounter }
)(Button);

let CounterDisplay = ({ counter }) => <div>{counter}</div>;
CounterDisplay = connect(state => ({ counter: state.counter }))(CounterDisplay);

class App extends React.Component {
    render() {
        return (
            <div>
                <Button value="1" operation="+" />
                <Button value="5" operation="-" />
                <Button value="2" operation="*" />
                <Button value="3" operation="/" />
                <CounterDisplay />
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
