import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';

//import MediaQuery from 'react-responsive';


class BookSearchApp extends React.Component {

    render() {

        return (

            
            <BrowserRouter >
    <Switch>
      <Route exact path="/" component={Home} />

    </Switch>
  </BrowserRouter>
            /* <div>
            <MediaQuery query="(max-width: 1224px)">
            <Home/>
            </MediaQuery>
            </div>
            */
          );


       
}
}

// ========================================

ReactDOM.render(
    <BookSearchApp />,
    document.getElementById('root')
);


