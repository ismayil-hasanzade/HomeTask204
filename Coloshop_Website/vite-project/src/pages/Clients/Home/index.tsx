import { Button } from "antd";
import React, { useContext } from "react";
import NewArrival from "../New-Arrivals";
import { FavoritesContext } from "../FavoritesProvaider";
import BestSellers from "../Best_Sellers";
import LatestBlogs from "../Latest-Blogs";
import NewsLetter from "../News-Letter";

const Home = () => {
  

  return (
    <div id="Home">
      <div id="GetUp">
        <div className="container">
          <div className="collectionname">
            <p>Spring / Summer Collection 2017</p>
          </div>
          <h1>Get up to 30% Off New Arrivals</h1>
          <Button>Shop Now</Button>
        </div>
      </div>
      <div id="Cards">
        <div className="container">
            <div className="box box1">
                <Button>Women's</Button>
            </div>
            <div className="box box2">
                <Button>Accessories's</Button>
            </div> <div className="box box3">
                <Button>Men`S</Button>
            </div>
        </div>
      </div>
      <NewArrival />
      <BestSellers/>
      <LatestBlogs/>
      <NewsLetter/>
    </div>
  );
};

export default Home;
