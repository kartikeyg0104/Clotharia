import React from 'react'
import Trending from '../Components/Trending/Trending'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import FeaturedCollection from '../Components/FeaturedCollection/FeaturedCollection'

const Shop = () => {
  return (
    <div>
      <Trending/>
      <FeaturedCollection/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop