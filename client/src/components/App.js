import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import NewReviewForm from "./NewReviewForm";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MoviesList from "./MoviesList";
import NewMovieForm from "./NewMovieForm";
import MovieShow from "./MovieShow";
import UserProfile from "./UserProfile";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import EditReviewForm from "./EditReviewForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/movies/new" component={NewMovieForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route
          exact
          path="/movies/:id/reviews/:id/edit"
          render={(props) => <EditReviewForm user={currentUser} {...props} />}
        />
        <Route
          exact
          path="/profile"
          render={(props) => {
            return <UserProfile userData={currentUser} {...props} />;
          }}
        />
        <Route
          exact
          path="/movies/:id"
          render={(props) => {
            return <MovieShow user={currentUser} {...props} />;
          }}
        />
        <AuthenticatedRoute
          exact={true}
          path="/movies/:id/reviewForm"
          component={NewReviewForm}
          user={currentUser}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);
