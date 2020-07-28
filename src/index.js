import React, { Component } from "react";
import ReactDom from "react-dom";
import Rule from './Rule'
import RuleForm from './RuleForm'
class App extends Component {
  render() {
    return <div><Rule></Rule> <RuleForm></RuleForm></div>
  }
}

ReactDom.render(<App />, document.getElementById("app"));
