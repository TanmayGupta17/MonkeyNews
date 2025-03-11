import React from 'react';

export default function NewsItem(props) {
  let { title, description, imageUrl, url } = props;
  return (
    <div className="news-item">
      <div className="news-item-image-container">
        <img className="news-item-image" src={imageUrl} alt={title} />
      </div>
      <div className="news-item-body">
        <h2 className="news-item-title">{title}</h2>
        <p className="news-item-description">{description}</p>
        <a className="news-item-button" href={url} target="_blank" rel="noopener noreferrer">Read More</a>
      </div>
    </div>
  );
}