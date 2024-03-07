import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import NewsWithInfiniteScrollar from "./components/NewsWithInfiniteScrollar";
import LoadingBar from "react-top-loading-bar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
    };
  }

  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  setProgress=(progress)=> {
    this.setState({
      progress: progress,
    });
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route
              path="/general"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={10}
                  category="general"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              path="/"
              // Infinte scroll for general page
              // element={<NewsWithInfiniteScrollar key="general" pageSize={10} category="general" country="in" />}
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={10}
                  category="general"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              path="/business"
              element={
                <NewsWithInfiniteScrollar
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={10}
                  category="business"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
              // element={
              //   <News
              //     key="business"
              //     pageSize={10}
              //     category="business"
              //     country="in"
              //   />
              // }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={10}
                  category="entertainment"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={10}
                  category="health"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={10}
                  category="science"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={10}
                  category="sports"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={10}
                  category="technology"
                  country="in"
                  apiKey = {this.apiKey}
                />
              }
            />
          </Routes>
        </Router>
        );
      </>
    );
  }
}

export default App;
