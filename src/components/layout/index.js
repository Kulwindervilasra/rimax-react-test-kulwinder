import React from "react";
import Header from "./header";
import classes from "./styles.module.scss";
import cx from "classnames";

export default ({ children }) => (
  <div >
    <Header />
    <main className={cx("bg-primary-light", classes.main)}>{children}</main>

  </div>
);
