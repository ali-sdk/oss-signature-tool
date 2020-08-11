import React, { Component } from 'react';
import styles from './index.less';
import { Input, Button } from 'antd';

export default class HeadersInput extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value || [
        {
          key: 'date',
          value: '',
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
          key: '',
          value: '',
        },
      ],
    });
  }

  del(index) {
    if (this.state.value.length < 2) {
      this.setState({
        value: [
          {
            key: '',
            value: '',
          },
        ],
      });
      if (this.props.onChange) {
        this.props.onChange([
          {
            key: '',
            value: '',
          },
        ]);
      }
      return;
    }
    const cloneValue = [...this.state.value];
    cloneValue.splice(index, 1);
    this.setState({
      value: cloneValue,
    });
    if (this.props.onChange) {
      this.props.onChange(cloneValue);
    }
  }

  xossHeader(_index, _) {
    return (
      <div key={_index} className={styles.headersBox}>
        <Input
          addonBefore="x-oss-"
          value={_.key}
          disabled={_.key === 'date'}
          onChange={(v) => {
            this.handleChange(_index, v.target.value, 'key');
          }}
          placeholder="请求头，去除x-oss-后的部分"
        />
        <Input
          value={_.value}
          disabled={_.key === 'date'}
          onChange={(v) => {
            this.handleChange(_index, v.target.value, 'value');
          }}
          placeholder={_.key === 'date' ? '' : '值'}
        />
        <Button onClick={this.add.bind(this)}>+</Button>
        <Button
          // disabled={_.key === "date"}
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
    return <div>{value.map((_, i) => this.xossHeader(i, _))}</div>;
  }
}
