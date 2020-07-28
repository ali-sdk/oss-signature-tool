import React, { Component } from "react";
import styles from "./index.less";
export default class RuleBox extends Component {
  render() {
    return (
      <div className={styles.preBox}>
        <pre className={styles.pre}>{`
Signature = base64(hmac-sha1(AccessKeySecret,
            VERB + "\\n"
            + Content-MD5 + "\\n" 
            + Content-Type + "\\n" 
            + Date + "\\n" 
            + CanonicalizedOSSHeaders
            + CanonicalizedResource))
            
Authorization = "OSS " + AccessKeyId + ":" + Signature
                `}</pre>
      </div>
    );
  }
}
