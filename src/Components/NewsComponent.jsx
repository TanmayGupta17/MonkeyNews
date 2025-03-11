import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function NewsComponent({ query, category }) {
  document.title = `NewsMonkey - ${category ? category : 'Latest News'}`;
  const [state, setState] = useState({
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0
  });

  NewsComponent.defaultProps = {
    category: 'general',
    page: 1
  };

  NewsComponent.propTypes = {
    category: PropTypes.string,
    page: PropTypes.number
  };

  const fetchData = async (page, query, category) => {
    setState((prevState) => ({
      ...prevState,
      loading: true
    }));
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=48f6bedfe2454586a6342cf580c36ab9&page=${page}&pageSize=21`;
    if (query) {
      url += `&q=${query}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    console.log(`Fetching data from URL: ${url}`);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    const filteredArticles = parsedData.articles.filter(article => article.urlToImage);
    setState((prevState) => ({
      ...prevState,
      articles: page === 1 ? filteredArticles : prevState.articles.concat(filteredArticles),
      loading: false,
      totalResults: parsedData.totalResults
    }));
  };

  useEffect(() => {
    fetchData(state.page, query, category);
  }, [state.page, query, category]);

  const fetchMoreData = () => {
    setState((prevState) => ({
      ...prevState,
      page: prevState.page + 1
    }));
  };

  return (
    <div>
      <h1>NewsMonkey - Top Headlines {category ? category : ""}</h1>
      {state.loading && <Spinner />}
      <InfiniteScroll
        dataLength={state.articles.length}
        next={fetchMoreData}
        hasMore={state.articles.length < state.totalResults}
        loader={<Spinner />}
      >
        <div className="news-container">
          {state.articles.map((element, index) => {
            return (
              <NewsItem 
                key={index}
                title={element.title ? element.title.slice(0, 45) : "No Title"}
                description={element.description ? element.description.slice(0, 100) : "No Description"}
                imageUrl={element.urlToImage}
                url={element.url}
              />
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}