//Buttons to RUN the scraper, view book details, view boxes
import React, { Component } from 'react';
import BookList from '../container/home/bookList';
import Boxes from '../container/home/boxes';


class Home extends Component {
    constructor() {
        super();
        this.showHidden = this.showHidden.bind(this);
        this.state = {
          bookList: true,
          cardMaker: true,
          boxes: true
        };
    }

    runScraper(){
            $.ajax({
                method:"GET",
            })
    }

    showHidden(e) {
          const toBeVisible = e.target.id;
          const States = ["bookList", "cardMaker", "boxes"];
          States.forEach(x => ((x===toBeVisible)? this.setState({ [x]: false }) : this.setState({ [x]: true })));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className="col-md-12 text-center">Datafiniti Book Scraper</h1>
                </div>
                <div className="row btn-group d-flex">
                    <button
                        id="cardMaker"
                        className="btn btn-primary col-md-4"
                        onClick={this.showHidden}
                    >
                    Run
                    </button>
                    <button
                        id="bookList"
                        className="btn btn-primary col-md-4"
                        onClick={this.showHidden}
                    >
                    Book Details
                    </button>
                    <button
                        id="boxes"
                        className="btn btn-primary col-md-4"
                        onClick={this.showHidden}
                    >
                    Boxes
                    </button>
                    
                    <div>
                        {!this.state.cardMaker && <BookList />}
                        {!this.state.bookList && <BookList />}
                        {!this.state.boxes && <Boxes />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
