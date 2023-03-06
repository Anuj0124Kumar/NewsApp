import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NEWS`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2207ff9cf895434fb09ff4e9a8ec52cb&pageSize=${this.props.pageSize} &page=${this.state.page}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    
    this.updateNews();
  }

  // handelNext = async () => {
  //   console.log("next");
   
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handelPrevious = async () => {
   
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    setTimeout(async () => {
      this.setState({ page: this.state.page + 1 });
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2207ff9cf895434fb09ff4e9a8ec52cb&pageSize=${this.props.pageSize} &page=${this.state.page}`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
      });
    }, 1500);
   
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>
          Top - {`${this.capitalizeFirstLetter(this.props.category)}`} HeadLines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h3>Loading...</h3>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, idx) => {
                return (
                  <div key={`${element.url} ${idx}`} className="col-md-4">
                    <NewsItem
                      title={element.title ? element.title : ""}
                      desc={element.description ? element.description : ""}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "data:image/png;base64,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"
                      }
                      NewsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      name={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
