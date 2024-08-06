import { Table } from "antd";
import React, { useContext } from "react";
import { BasketContext } from "../BasketProvaider";
import { render } from "sass";

const Basket: React.FC = () => {
  const { basket, toggleBasket } = useContext(BasketContext);

  const columns = [
    {
      
      dataIndex: "image",
      render: (text) => <img src={text} width={50} height={50} alt="Product" />,
    },
    {
      
      dataIndex: "title",
    },
    {
      
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render:(text)=>(
        <span>${text}</span>
      )
    },
   
  ];
  return (
    <div id="boxcontainer">
      <Table rowKey={"id"} columns={columns} dataSource={basket} />
    </div>
  );
};

export default Basket;
