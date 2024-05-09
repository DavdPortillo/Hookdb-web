import React, { useContext } from 'react';

import { NewsCard } from './';

import style from '../css/latestNews.module.css';
import generalize from '../../../css/generalize.module.css';
import { UserContext } from '../../../context/UserContext';

export const LatestNews = ({ news }) => {
  const { language } = useContext(UserContext);
  const mainPage = language.mainPage;

  return (
    <section className={`${style.container}`}>
      <h2 className={`${style.title}`}>{mainPage.latestNewsH2}</h2>
      <hr className={`${style.hrPrimary}`} />

      {news.map(newsItem => (
        <React.Fragment key={newsItem.id}>
          {(news[0].id !== newsItem.id) && <hr className={`${style.hrSecondary} ${generalize.hrSecondaryStyle}`} />}
          <NewsCard data={newsItem} />
        </React.Fragment>
      ))
      }

    </section>
  )
}
