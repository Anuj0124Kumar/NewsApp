import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, desc, imageUrl, NewsUrl, author, date, name } = this.props;

    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              dis: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge rounded-pill bg-danger ">{name}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} {new Date(date).toTimeString()}{" "}
              </small>
            </p>
            <a href={NewsUrl} target="_blank" className="btn btn-dark">
              Read more...
            </a>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default NewsItem;
