import React, { useState } from "react";
import { Modal, Button } from "antd";
import { authorization as getAuth } from "./assitant";
import styles from './index.less'

function formatHeaders(headersArr) {
  return headersArr
    .sort((a, b) => {
      if (a.key > b.key) return 1;
      else if (a.key < b.key) return -1;
      return 0;
    })
    .map((_) => `x-oss-${_.key.toLowerCase()}:${_.value}`);
}

function formatResource(resourceArr) {
  let resource = "/";
  const bucket = resourceArr.find((_) => _.key === "bucket").value;
  const object = resourceArr.find((_) => _.key === "object").value;
  const rest = resourceArr
    .filter((_) => !["bucket", "object"].includes(_.key) && _.key.trim())
    .map((_) => `${_.key}${_.value.trim() ? `=${_.value.trim()}` : ''}`)
    .join("&");

  if (bucket || object) {
    resource = `${resource}${bucket}/${object || ""}${rest ? `?${rest}` : ""}`;
  }
  return resource;
}

function formatForm(obj) {
  const {
    Method,
    ContentMD5,
    ContentType,
    Date,
    headers = [],
    resource = [],
  } = obj;
  const canonicalizArr = [
    Method,
    ContentMD5,
    ContentType,
    Date,
    ...formatHeaders(headers),
    formatResource(resource),
  ];

  return canonicalizArr.join("\n");
}

export default function Signture(props) {
  const { formValue, error, onCancel } = props;

  function content() {
    const { AccessKeyId, AccessKeySecret } = formValue;
    const canonicalString = formatForm(formValue);
    const authorization = getAuth(
      AccessKeyId,
      AccessKeySecret,
      canonicalString
    );
    return (
      <>
        canonicalString:
        <pre className={styles.codeBox}>{canonicalString}</pre>
        authorization:
        <pre className={styles.codeBox}>{authorization}</pre>
      </>
    );
  }
  return (
    <Modal
      title={null}
      visible={!error}
      onCancel={onCancel}
      footer={null}
      closable={false}
      width={700}
      footer={<Button onClick={onCancel}>Close</Button>}
    >
      {error ? null : content()}
    </Modal>
  );
}
