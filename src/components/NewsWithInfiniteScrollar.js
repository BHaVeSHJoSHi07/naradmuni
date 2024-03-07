import React, { Component } from "react";
import NewsItems from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


  export class NewsWithInfiniteScrollar extends Component {
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
    document.title = props.category;
  }

  componentDidMount = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    const { pageSize, country, category, setProgress } = this.props;
    setProgress(0)
    const apiKey = "911e4ef0918c426cba9e301e109fa995";
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
        setProgress(50)
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = async () => {
    const { pageSize, country, category, apiKey, setProgress } = this.props;
    setProgress(0)
    this.setState({  page: this.state.page + 1});
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    try {
      this.setState({ loading: true });
      setProgress(50)
      const response = await fetch(url);
      const parsedData = await response.json();

      this.setState((prevState)=>({
        articles: [...prevState.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults,
        loading: false,
      }));
      setProgress(100)
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container my-3">
            <h2 className="text-center" style={{ margin: "40px 0px" }}>
              Top News - {this.props.category} Headlines
            </h2>
            {this.state.loading && <Spinner />}
            <div className="row">
              {this.state.articles.map((element) => (
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
        </InfiniteScroll>
      </>
    );
  }
}

export default NewsWithInfiniteScrollar;
