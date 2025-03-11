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
  
    let url = `http://api.mediastack.com/v1/news?access_key=df85ce661a31a9fa8891956d026b230c&languages=en&limit=10&offset=${(page - 1) * 10}`;
    if (query) {
      url += `&keywords=${query}`;
    }
    if (category) {
      url += `&categories=${category}`;
    }
  
    console.log(`Fetching data from URL: ${url}`);
    let response = await fetch(url);
    let parsedData = await response.json();
    console.log(parsedData);
  
    if (!parsedData.data) {
      console.error('API response does not contain data property:', parsedData);
      setState((prevState) => ({
        ...prevState,
        loading: false
      }));
      return;
    }
  
    // Filter only articles with images
    const newArticles = parsedData.data.filter(article => article.image);
  
    setState((prevState) => {
      const seen = new Set();
      const uniqueArticles = [];
  
      // Combine existing articles with new ones and remove duplicates
      [...prevState.articles, ...newArticles].forEach(article => {
        const uniqueKey = `${article.title}-${article.url}`; // Unique combination
  
        if (!seen.has(uniqueKey)) {
          seen.add(uniqueKey);
          uniqueArticles.push(article);
        }
      });
  
      return {
        ...prevState,
        articles: uniqueArticles,
        loading: false,
        totalResults: parsedData.pagination.total
      };
    });
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
                imageUrl={element.image}
                url={element.url}
              />
            )
          })}
        </div>
      </InfiniteScroll>
      {state.loading && <Spinner />}
    </div>
  );
}