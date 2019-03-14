import React from "react";
import { DebounceInput } from 'react-debounce-input';
import Suggestions from './Suggestions';
import onClickOutside from 'react-onclickoutside';



class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            books: [],

        }
        this.onChange = this.onChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleClickOutside=this.handleClickOutside.bind(this);
        //this.onChange_persist = this.onChange_persist.bind(this);

    }


    fetchData(newValue) {
        const booksData = [
        ];
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://www.goodreads.com/search?&search%5Bfield%5D=title&format=xml&key=(LiKloD1VHanndFNZC48A)'
        fetch(proxyurl + url + '&q=' + newValue+'&page=' + 1).then(response => response.text())
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
            }
                .bind(this));



    }

    onChange(event) {
        this.setState(
            { value: event.target.value }
        )

        this.fetchData(event.target.value);

    }

    /* onChange_persist = (e) => {
        e.persist();
        this.onChange(e);
    } */

    onClick() {
        this.setState(
            {
                toggle: !this.state.toggle,
            }
        )
    }
    handleClickOutside = () => {
        console.log('onClickOutside() method called');
        this.setState(
            { value: '',
        books:[] }
        )
        

      }
    render() {
        return (
            <div align='center' >
            <form id='suggestion'>
                <h1 style={{ color: 'purple' }}>Search your favourite books</h1>
                <DebounceInput
                    minLength={1}
                    debounceTimeout={200}
                    value={this.state.value}
                    onChange={this.onChange} />
                <input type='submit' />
                <Suggestions books={this.state.books} 
                value={this.state.value}/>
               
                </form>


            </div>
        );
    }
}

export default onClickOutside(Home);