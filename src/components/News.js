import React, { Component } from "react";
import NewsItems from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "in",
    category: "sports",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      pageSize: 10, // You can adjust the pageSize as needed
      totalResults: 0,
      loading: false,
    };
    document.title= props.category;
  }

  componentDidMount = async () => {
      await this.fetchData();
  };
  
  // async componentDidUpdate(prevProps) {
  //   if (this.props.category !== prevProps.category) {
  //     // Category has changed, fetch new data
  //     await this.fetchData();
  //   }
  // }

  fetchData = async () => {
    const { pageSize, country, category, setProgress, apiKey} = this.props;
    setProgress(0)
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    try {
      this.setState({ loading: true });
      setProgress(50)
      const response = await fetch(url);
      const parsedData = await response.json();
   

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
      setProgress(100)
    } catch (error) {
      setProgress(40)
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  // handlePreviousPage = async () => {
  //   if (this.state.page > 1) {
  //     this.setState({ page: this.state.page - 1 }, () => this.fetchData());
  //   }
  // };

  // handleNextPage = async () => {
  //   const { page, pageSize, totalResults } = this.state;
  //   const totalPages = Math.ceil(totalResults / pageSize);

  //   if (page < totalPages) {
  //     this.setState({ page: this.state.page + 1 }, () => this.fetchData());
  //   }
  // };
  handlePreviousPage = async () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
      this.fetchData()
    }
  };

  handleNextPage = async () => {
    const { page, pageSize, totalResults } = this.state;
    const totalPages = Math.ceil(totalResults / pageSize);

    if (page < totalPages) {
      this.setState({ page: this.state.page + 1 });
      this.fetchData()
    }
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="text-center" style={{ margin: "40px 0px" }}>
            Top Headlines - {this.props.category}
          </h2>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => (
                <div className="col-md-4 mb-3" key={element.url}>
                  <NewsItems
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    publishedDate={element.publishedAt}
                    source={element.source}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          {!this.state.loading && (
            <button
              type="button"
              disabled={this.state.page <= 1 || this.state.loading}
              className="btn btn-dark my-5"
              onClick={this.handlePreviousPage}
            >
              &larr; Previous
            </button>
          )}
          {!this.state.loading && (
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(
                  this.state.totalResults / this.state.pageSize ||
                    this.state.loading
                )
              }
              className="btn btn-dark my-5"
              onClick={this.handleNextPage}
            >
              &rarr; Next
            </button>
          )}
        </div>
      </>
    );
  }
}

export default News;
