import React from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Details from './Details';


class FullResultsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            books:[]
        }
        this.scrollhandler=this.scrollhandler.bind(this);
        this.debounce = this.debounce.bind(this);
        this.scrollindex='';
        this.fetchData=this.fetchData.bind(this);
        this.timer = '';
    }
    scrollhandler()
    {
       console.log('scrolly',window.scrollY)
       console.log('scroller',this.scrollindex)
       if (window.scrollY>150)
       {
       this.debounce(this.fetchData,2000);
       }


    }
    debounce(func, wait) {
        // variable persisted here

        console.log('debouncecalled');

        clearTimeout(this.timer);
        this.timer = setTimeout(func, wait);
    }

    componentDidMount()
    {
        window.addEventListener('scroll',this.scrollhandler)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollhandler);
    }
    fetchData() {
        console.log('fetchdatacalled')
        const booksData = [
        ];
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://www.goodreads.com/search?&search%5Bfield%5D=title&format=xml&key=(LiKloD1VHanndFNZC48A)'
        fetch(proxyurl + url + '&q=' + this.props.value+'&page=' +this.scrollindex++).then(response => response.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(function (data) {
             
                var title = data.getElementsByTagName("title");
                var author = data.getElementsByTagName("name");
                var average_rating = data.getElementsByTagName("average_rating");
                var ratings_count = data.getElementsByTagName("ratings_count");
                var text_reviews_count = data.getElementsByTagName("text_reviews_count");
                var image_url=data.getElementsByTagName("image_url");
                var id = data.getElementsByTagName("id");
                var total_results=data.getElementsByTagName("total-results");
                
                for (var i = 0; i < title.length; i++) {

                    booksData.push({
                        id: id[i].childNodes[0].nodeValue,
                        title: title[i].childNodes[0].nodeValue,
                        author: author[i].childNodes[0].nodeValue,
                        average_rating: average_rating[i].childNodes[0].nodeValue,
                        ratings_count: ratings_count[i].childNodes[0].nodeValue,
                        text_reviews_count: text_reviews_count[i].childNodes[0].nodeValue,
                        image_url:image_url[i].childNodes[0].nodeValue,
                        total_results:total_results[0].childNodes[0].nodeValue
                      


                    });
                }
                
                return booksData;
            }

            ).then(function (books) {
                this.setState({

                    books: books

                });
                console.log('page',this.scrollindex)
            }
                .bind(this));



    }

    render(){
 
 if(this.state.books.length===0)
 {
 const options = this.props.books.slice(5).map((item, index) => (
    <Router>
    <div>
    <li key={index}><Link key={index} to={`/fullpage/${item.title}`} >{item.title} by {item.author}</Link>
    </li>
    <Route exact path='/fullpage/:id'  component={() =><Details book={item} />} />
    </div>
    </Router>
))

    return (
        <div>
            <ul>{options}</ul>
            
            
        </div>
    )

}
else
{
    const options = this.state.books.slice(5).map((item, index) => (
        <Router>
        <div>
        <li key={index}><Link key={index} to={`/fullpage/${item.title}`} >{item.title} by {item.author}</Link>
        </li>
        <Route exact path='/fullpage/:id'  component={() =><Details book={item} />} />
        </div>
        </Router>
    ))
    
        return (
            <div>
                <ul>{options}</ul>
                
                
            </div>
        )
    

}
    }
}




export default FullResultsPage;