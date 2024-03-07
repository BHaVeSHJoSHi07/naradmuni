import React, { Component } from "react";

export class NewsItems extends Component {
  badgeStyle = {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    right: "0",
  };

  render() {
    let {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      publishedDate,
      source,
    } = this.props;

    return (
      <div className="container my-3">
        <div className="card">
          <div className="badgeItem" style={this.badgeStyle}>
            <span className="badge rounded-pill bg-danger">{source.name}</span>
          </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://assets1.cbsnewsstatic.com/hub/i/r/2024/01/16/f0877287-51cb-4e77-a8af-de5e40869d9d/thumbnail/1200x630/04e07c322d94f5455e1f034ebd37d2d3/cbsn-fusion-what-iowa-caucus-results-say-about-gop-voters-thumbnail.jpg?v=50926e3bde2e7c9caafa13eb3f9693b5"
            }
            className="card-img-top"
            alt="..."
          />

          <div className="card-body">
            <h5 className="card-title">{title ? title.slice(0, 40) : ""}...</h5>
            <p className="card-text">
              {description ? description.slice(0, 85) : ""}...
            </p>
            <a
              href={newsUrl}
              className="btn btn-sm btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
            <p className="card-text mt-3">
              <small className="text-danger">
                {!author ? "unknown" : author}{" "}
                <span style={{ color: "black" }}>published on</span>{" "}
                {new Date(publishedDate).toUTCString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
