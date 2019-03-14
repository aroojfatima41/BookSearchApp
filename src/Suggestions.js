import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Details from './Details';
import FullResultsPage from './fullResultsPage';


class Suggestions extends React.Component {

   
render(){
    var obj = [...this.props.books];
    //var total_results=props.books[0].total_results;
    obj.sort((a, b) => b.average_rating - a.average_rating);
    console.log('sorted', obj,this.props.value);
    const options = obj.slice(0, 5).map((item, index) => (
        <Router>
        <div>
        <li key={index}><Link key={index} to={`/details/${item.title}`} >{item.title} by {item.author}</Link>
        </li>
        <Route exact path='/details/:id'  component={() =><Details book={item} />} />
        </div>
        </Router>
  ))
    if (obj.length > 0) {
        return (
            <div>
                
                <Router>
                <div>
                <ul>{options}</ul>
                <Link to='/fullpage' >{obj[0]['total_results']-5} more results</Link>
               
                <Route exact path='/fullpage'  component={() =><FullResultsPage books={obj} value={this.props.value}/>} />
                </div>
                
                </Router>



                
            </div>
        )
    }

    else {
        return null
    }
}
}
export default Suggestions