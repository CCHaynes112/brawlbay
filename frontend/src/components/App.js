import React from "react";
import {
  Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../theme';
import Header from './Header';
import Footer from './Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import PlayerResult from './pages/PlayerResult';
import ClanResult from './pages/ClanResult';
import Ranked1v1Leaderboard from './pages/Ranked1v1Leaderboard';
import Ranked2v2Leaderboard from './pages/Ranked2v2Leaderboard';
import PageNotFound from './pages/PageNotFound';


const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page

  window._mfq.push(['newPageView', location.pathname]); // MouseFlow
});


export default function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/players/:id" component={PlayerResult} />
            <Route path="/clans/:id" component={ClanResult} />
            <Route path="/items" />
            <Route path="/legends" />
            <Route path="/legends/:id" />
            <Route path="/1v1leaderboard" component={Ranked1v1Leaderboard} />
            <Route path="/2v2leaderboard" component={Ranked2v2Leaderboard} />
            <Route path="/clanleaderboard" />
            <Route path="/ratings" />
            <Route path="/streams" />
            <Route path="/tournaments" />
            <Route path="/videos" />
            <Route path="/gifs" />
            <Route path="/contact" component={Contact} />
            <Route page="/404" component={PageNotFound} />
          </Switch>
        </Header>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}