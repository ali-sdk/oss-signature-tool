import React, { Component } from "react";
import styles from "./index.less";
import { Input, Button } from "antd";

export default class Resource extends Component {
  constructor(props) {
    super();
    this.state = {
      value: [
        {
          key: "bucket",
          value: "",
        },
        {
          key: "object",
          value: "",
        },
        {
          key: "",
          value: "",
        },
      ],
    };
  }
  static getDerivedStateFromProps(nextProps, preState) {
    const { value } = nextProps;
    if (preState.value && value && value[0].value !== preState.value[0].value) {
      return {
        value,
      };
    }
    return null;
  }

  handleChange(index, v, type) {
    const cloneValue = [...this.state.value];
    const current = this.state.value[index] || {};
    current[type] = v;
    cloneValue[index] = current;
    this.setState({
      value: cloneValue,
    });
    if (this.props.onChange) {
      this.props.onChange(cloneValue);
    }
  }

  add() {
    this.setState({
      value: [
        ...this.state.value,
        {
          key: "",
          value: "",
        },
      ],
    });
  }

  del(index) {
    if (this.state.value.length < 2) return;
    const cloneValue = [...this.state.value];
    cloneValue.splice(index, 1);
    this.setState({
      value: cloneValue,
    });
    if (this.props.onChange) {
      this.props.onChange(cloneValue);
    }
  }

  subRes(_index, _) {
    return (
      <div key={_index} className={styles.headersBox}>
        <Input
          disabled={_index < 2}
          value={_.key}
          onChange={(v) => {
            this.handleChange(_index, v.target.value, "key");
          }}
        />
        <Input
          value={_.value}
          onChange={(v) => {
            this.handleChange(_index, v.target.value, "value");
          }}
        />
        <Button disabled={_index < 2} onClick={this.add.bind(this)}>
          +
        </Button>
        <Button
          disabled={_index < 2}
          onClick={() => {
            this.del(_index);
          }}
        >
          -
        </Button>
      </div>
    );
  }
  render() {
    const { value } = this.state;
    return <div>{value.map((_, i) => this.subRes(i, _))}</div>;
  }
}
