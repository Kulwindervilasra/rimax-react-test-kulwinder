import React from "react";
import { Grid } from "@material-ui/core";

const AccountLayout = ({ children }) => (
  <Grid container xs={12} className="py-5 d-flex align-items-center">
    <div className="w-100">{children}</div>
  </Grid>
);

export default AccountLayout;
