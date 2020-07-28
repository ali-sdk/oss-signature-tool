import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";
import HeadersInput from "../HeadersInput";
import Resource from "../Resource";
import Signture from "../Signture";
import DatePicker from "../DatePicker";
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};
const { Item } = Form;
const { Option } = Select;

const methods = ["GET", "POST", "PUT", "DELETE", "HEAD"];

const itemConfig = [
  {
    label: "AccessKeyId",
    name: "AccessKeyId",
    content: <Input autoComplete="off" placeholder="必填"></Input>,
    rules: [{ required: true }],
  },
  {
    label: "AccessKeySecret",
    name: "AccessKeySecret",
    rules: [{ required: true }],
    content: <Input autoComplete="off" placeholder="必填"></Input>,
  },
  {
    label: "VERB",
    name: "Method",
    rules: [{ required: true }],
    content: (
      <Select placeholder="请求的Method">
        {methods.map((_) => (
          <Option key={_} value={_}>
            {_}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    label: "Content-MD5",
    name: "ContentMD5",
    content: (
      <Input
        autoComplete="off"
        placeholder="请求内容数据的MD5值，例如: eB5eJF1ptWaXm4bijSPyxw==，也可以为空"
      ></Input>
    ),
  },
  {
    label: "Content-Type",
    name: "ContentType",
    initialValue: "",
    content: (
      <Input
        autoComplete="off"
        placeholder="请求内容的类型，例如: application/octet-stream，也可以为空"
      ></Input>
    ),
  },
  {
    label: "Date",
    name: "Date",
    rules: [{ required: true }],
    content: (
      <DatePicker
        autoComplete="off"
        placeholder="此次操作的时间，且必须为GMT格式，例如: Sun, 22 Nov 2015 08:16:38 GMT"
      ></DatePicker>
    ),
  },
  {
    label: "Canonicalized Headers",
    name: "headers",
    initialValue: [
      {
        key: "date",
        value: "",
      },
    ],
    content: <HeadersInput></HeadersInput>,
  },
  {
    label: "Canonicalized Resource",
    name: "resource",
    content: <Resource></Resource>,
  },
];

export default class extends Component {
  constructor(props) {
    super();
    this.state = {
      formValue: {},
      error: true,
    };
  }
  formRef = React.createRef();
  renderItems(conf) {
    const { content, ...rest } = conf;
    return (
      <Item key={conf.name} {...rest}>
        {content}
      </Item>
    );
  }

  async handleCalculate() {
    try {
      const formValue = await this.formRef.current.validateFields();
      this.setState({
        formValue,
        error: false,
      });
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  handleValueChange(v, all) {
    if (!all.AccessKeyId.trim() && localStorage.getItem('signformValue')) {
      this.formRef.current.setFieldsValue(JSON.parse(localStorage.getItem('signformValue')));
      return;
    }
    if (v.Date) {
      const headers = this.formRef.current.getFieldValue("headers");
      headers[0] = Object.assign(headers[0], { value: v.Date });
      this.formRef.current.setFieldsValue(Object.assign(all, { headers }));
    }
    this.setState({
      formValue: this.formRef.current.getFieldsValue(),
    });

    localStorage.setItem('signformValue', JSON.stringify(formValue))
  }

  resetError() {
    this.setState({
      error: true
    })
  }

  render() {
    return (
      <div>
        <Form
          {...formItemLayout}
          ref={this.formRef}
          onValuesChange={this.handleValueChange.bind(this)}
        >
          {itemConfig.map((_) => this.renderItems(_))}
          <Item label=" " colon={false}>
            <Button onClick={this.handleCalculate.bind(this)}>生成签名</Button>
          </Item>
        </Form>
        <Signture
          formValue={this.state.formValue}
          error={this.state.error}
          onCancel={this.resetError.bind(this)}
        ></Signture>
      </div>
    );
  }
}
