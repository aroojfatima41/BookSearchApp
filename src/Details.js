import React from "react";



function Details(props) {
 
  return (
    <div>
      <h4 style={{color:'purple'}}>BOOK DETAIL</h4>
      <p>
        <b>Title:</b> {props.book.title}<br />
        <b>Author:</b> {props.book.author}<br />
        <b>Average_rating:</b> {props.book.average_rating}<br />
        <b>Ratings_count:</b> {props.book.ratings_count}<br />
        <b>Text_reviews_count:</b> {props.book.text_reviews_count}<br /><br/>
        
        <img src={props.book.image_url} alt={props.book.title}/>


      </p>
    </div>
  );
}
export default Details;