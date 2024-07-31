import { useFavorites } from "../../../assets/components/FavoritesProvider";
import React from "react";
import { Button, Table } from "antd";
import type { TableProps } from "antd";

const Favorites = () => {
  const { favorites, removeFavorite, removeAllFavorites } = useFavorites();

  const RemoveElement = (a) => {
    removeFavorite(a.id);
  };

  interface DataType {
    id: string;
    companyName: string;
    contactTitle: string;
    address: {
      street: string;
      city: string;
    };
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "companyName",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "contactTitle",
      dataIndex: "contactTitle",
      key: "contactTitle",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
      render: (obj) => `${obj.street} ${obj.city}`,
    },
    {
      title: "Remove from Favorites",
      key: "delete",
      render: (obj) => (
        <Button
          onClick={() => {
            RemoveElement(obj);
          }}
          danger
        >
          Delete
        </Button>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (pagination) => {
    console.log("params", pagination);
  };

  return (
    <>
      <Button
        danger
        onClick={() => {
          removeAllFavorites();
        }}
      >
        Remove All
      </Button>
      <Table
        columns={columns}
        dataSource={favorites}
        onChange={onChange}
        rowKey={"id"}
      />
    </>
  );
};

export default Favorites;
