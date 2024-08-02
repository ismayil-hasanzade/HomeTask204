import { Table } from "antd";
import { Button, TableColumnsType } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

type DataType = {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
};

const AdminProduct = () => {
  const URL: string = "https://fakestoreapi.com/products/";

  const [data, setData] = useState<DataType[]>([]);

  const RemoveElement = async (id: number) => {
    try {
      console.log(data);

      const res = await axios.delete(`${URL}${id}`);
      console.log(res);

      if (res.status === 200) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      } else {
        console.log("Failed to delete the item from the server.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      showSorterTooltip: { title: "ID" },
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => <img src={text} width={50} height={50} />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <p>{text.slice(0, 80)}...</p>,
    },
    {
      title: "Actions",
      render: (obj) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              RemoveElement(obj.id);
            }}
          >
            Delete
          </Button>
          <Button type="primary" style={{ backgroundColor: "green" }}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey={"id"}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ title: "Sorter" }}
    />
  );
};

export default AdminProduct;
