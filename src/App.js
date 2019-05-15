import React from "react";
import "../src/App.css";
import Link from "@material-ui/core/Link";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevVal: "",
      curVal: "0"
    };
    this.clear = this.clear.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEval = this.handleEval.bind(this);
  }

  //storing current number
  handleNumber(e) {
    if (this.state.curVal === "0") {
      this.setState({
        curVal: e.target.value
      });
    } else {
      this.setState({
        curVal: this.state.curVal + e.target.value
      });
    }
  }

  //if u click on operator symbol it will
  //store curVal in prevVal
  //add the operator you pressed
  //and return 0 for curVal
  handleOperator(e) {
    let prevVal = this.state.prevVal;

    if (prevVal === "") {
      this.setState({
        prevVal: this.state.curVal + e.target.value,
        curVal: "0"
      });
    } else if (this.state.curVal === "0" && /[+\-*/]$/.test(prevVal)) {
      this.setState({
        prevVal: prevVal.replace(/[+\-*/]$/, e.target.value),
        curVal: "0"
      });
    } else if (prevVal.includes("=")) {
      this.setState({
        prevVal: this.state.curVal + e.target.value,
        curVal: "0"
      });
    } else {
      this.setState({
        prevVal: prevVal + this.state.curVal + e.target.value,
        curVal: "0"
      });
    }
  }

  //handling decimal
  // if current value includes decimal ignore since there can only be one decimal in a number
  handleDecimal(e) {
    if (!this.state.curVal.includes(".")) {
      this.setState({
        curVal: this.state.curVal + "."
      });
    }
  }

  //evaluate prevVal and putting the output to curVal
  //since we store all number and operator in order in prevVal
  // i use eval to add them together and put the value to curVal
  handleEval(e) {
    let value = this.state.prevVal + this.state.curVal;
    this.setState({
      prevVal: value + "=",
      curVal: eval(value)
    });
  }

  //clear calculator
  clear() {
    this.setState({
      prevVal: "",
      curVal: "0"
    });
  }

  render() {
    return (
      <div id="main">
        <p id="previous">{this.state.prevVal}</p>
        <p id="display">{this.state.curVal}</p>
        <Buttons
          clear={this.clear}
          numbers={this.handleNumber}
          operator={this.handleOperator}
          decimal={this.handleDecimal}
          eval={this.handleEval}
        />
        <p>
          <Link href="https://github.com/uwaifo" variant="body1">
            Designed by OverstandApps
          </Link>
        </p>
      </div>
    );
  }
}

const Buttons = props => {
  return (
    <div id="button">
      <button id="clear" value="AC" onClick={props.clear}>
        AC
      </button>
      <button id="multiply" value="*" onClick={props.operator}>
        *
      </button>
      <button id="divide" value="/" onClick={props.operator}>
        /
      </button>
      <button id="one" value="1" onClick={props.numbers}>
        1
      </button>
      <button id="two" value="2" onClick={props.numbers}>
        2
      </button>
      <button id="three" value="3" onClick={props.numbers}>
        3
      </button>
      <button id="add" value="+" onClick={props.operator}>
        +
      </button>
      <button id="four" value="4" onClick={props.numbers}>
        4
      </button>
      <button id="five" value="5" onClick={props.numbers}>
        5
      </button>
      <button id="six" value="6" onClick={props.numbers}>
        6
      </button>
      <button id="subtract" value="-" onClick={props.operator}>
        -
      </button>
      <button id="seven" value="7" onClick={props.numbers}>
        7
      </button>
      <button id="eight" value="8" onClick={props.numbers}>
        8
      </button>
      <button id="nine" value="9" onClick={props.numbers}>
        9
      </button>
      <button id="zero" value="0" onClick={props.numbers}>
        0
      </button>
      <button id="decimal" value="." onClick={props.decimal}>
        .
      </button>
      <button id="equals" value="=" onClick={props.eval}>
        =
      </button>
    </div>
  );
};

export default App;
