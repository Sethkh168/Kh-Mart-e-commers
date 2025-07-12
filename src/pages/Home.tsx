import React from 'react';
import HeroBanner from '../components/HeroBanner';
import PopularCategories from '../components/PopularCategories';
import BestOffers from '../components/BestOffers';
import NewGoods from '../components/NewGoods';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <PopularCategories />
      <BestOffers />
      <NewGoods />
    </div>
  );
};

export default Home;