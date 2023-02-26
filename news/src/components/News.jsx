import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false
        }
    }

   async componentDidMount (){

        let url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=2207ff9cf895434fb09ff4e9a8ec52cb";
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles:parseData.articles});
    }
    
    render() {
        return (
            <div className='container my-4'>
                <h1>Top HeadLines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title?element.title:""} desc={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://ichef.bbci.co.uk/news/1024/branded_news/149EF/production/_128736448_06b3a75cee41e9738153dd22e68623b1646fe13d0_368_4368_24574368x2457.jpg"} NewsUrl={element.url} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default News