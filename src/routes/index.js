import React from "react";
import Layout from "../components/layout";
import AccountLayout from "../components/accountLayout";
import {
  Login, Profile, Users
} from "../pages";
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/**" component={Profile} />
      </Switch>
    </Layout>
  );
};

const PublicRoute = () => {
  return (
    <AccountLayout>
      <Switch>
        <Route exact path="/**" component={Login} />
      </Switch>
    </AccountLayout>
  );
};

export default () => {
  const authToken = localStorage.getItem("token");
  return (
    <Router>
      <Switch>
        {authToken ? (
          <Route path="/" render={(props) => <PrivateRoutes {...props} />} />
        ) : (
          <Route path="/" render={(props) => <PublicRoute {...props} />} />
        )}
      </Switch>
    </Router>
  );
};
