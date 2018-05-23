//when a list of cards are read, the data of those cards are individually displayed through this.
import React, { Component } from 'react';


class Card extends Component {
    render(){
        return(
             <div className="Book">
                 <div className="col-md-6 text-left">Title: </div>
                 <div className="col-md-6 text-left">Author: </div>
                 <div className="col-md-6 text-left">Price: </div>
                 <div className="col-md-6 text-left">Shipping Weight (lbs): </div>
                 <div className="col-md-6 text-left">ISBN-10: </div>
            </div>
        );
    }
}

export default Card;