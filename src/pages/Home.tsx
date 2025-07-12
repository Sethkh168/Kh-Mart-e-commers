import React from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import PopularCategories from '../components/PopularCategories';
import BestOffers from '../components/BestOffers';
import NewGoods from '../components/NewGoods';
import BrandSlideshow from '../components/BrandSlideshow';

const Home = () => {
  return (
    <div>
      <HeroSlideshow />
      <PopularCategories />
      <BestOffers />
      <NewGoods />
      <BrandSlideshow />
    </div>
  );
};

export default Home;