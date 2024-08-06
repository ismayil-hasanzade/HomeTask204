import { Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const BestSellers = () => {
  const [data, setData] = useState<any[]>([]);
  const URL: string = "http://localhost:3000/products";

  const getData = async () => {
    try {
      const res = await axios.get(URL);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="BestSellers" className="NewArrivals">
      <div className="container">
        <h2>Best Sellers</h2>
        <div className="line"></div>
        <div className="ant-tabs">
          <div className="ant-tabs-content-holder">
            <div className="tab-content">
              {data.slice(0, 5).map((item) => (
                <div id="box" key={item.id}>
                  <div className="imgcontainer">
                    <img src={item.image} alt="" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
