import React from "react";

const LatestBlogs = () => {
  return (
    <div id="LatestBlogs" className="NewArrivals">
      <div className="container">
        <h2>Latest Blogs</h2>
        <div className="line"></div>
        <div className="boxcontainer">
          <div className="box box1">
            <div className="secretcontainer">
              <p>Here are the trends I see coming this fall</p>
              <span>by admin | dec 01, 2017</span>
              <a href="#">Read more</a>
            </div>
          </div>
          <div className="box box2">
            <div className="secretcontainer">
              <p>Here are the trends I see coming this fall</p>
              <span>by admin | dec 01, 2017</span>
              <a href="#">Read more</a>
            </div>
          </div>
          <div className="box box3">
            <div className="secretcontainer">
              <p>Here are the trends I see coming this fall</p>
              <span>by admin | dec 01, 2017</span>
              <a href="#">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogs;
