import React, { Component } from "react";
import styles from "./index.less";
import { Input, DatePicker, Radio } from "antd";
import moment from "moment";

const { Group, Button } = Radio;

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dateValue: "",
      type: "input",
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    const { value } = nextProps;
    if (value && value !== preState.value) {
      return {
        value,
      };
    }
    return null;
  }

  handleChange(value) {
    value = value.trim();
    let state = {
      value,
    };
    const dateValue = moment(value);
    if (dateValue._isValid) {
      state = {
        value,
        dateValue,
      };
    }
    this.setState(state);
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleDateChange(dateValue, dateStr) {
    const value = new Date(dateStr).toGMTString();
    this.setState({
      dateValue,
      value,
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleTypeChange(type) {
    this.setState({
      type,
    });
  }

  render() {
    const { value, dateValue, type } = this.state;
    const { value: propsValue, ...rest } = this.props;
    return (
      <>
        <Group
          className={styles.right}
          value={type}
          onChange={(e) => {
            this.handleTypeChange(e.target.value);
          }}
        >
          <Button value="input">输入</Button>
          <Button value="select">选择</Button>
        </Group>
        {type === "input" ? (
          <Input
            className={styles.inputValue}
            value={value}
            {...rest}
            onChange={(v) => {
              this.handleChange(v.target.value);
            }}
          ></Input>
        ) : (
          <DatePicker
            value={dateValue}
            showTime
            onChange={this.handleDateChange.bind(this)}
          ></DatePicker>
        )}
      </>
    );
  }
}
