import { Table, Button, Modal } from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const [data, setData] = useState<DataType[]>([]);

  const URL: string = "http://localhost:3000/products/";

  const showModal = async (id: number) => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(`${URL}${id}`);
      setSelectedProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    updateData;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const removeElement = async (id: number) => {
    try {
      const res = await axios.delete(`${URL}${id}`);
      if (res.status === 200) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (selectedProduct) {
      const { name, value } = e.target;
      setSelectedProduct({ ...selectedProduct, [name]: value });
    }
  };

  const updateData = async (id: number) => {
    try {
      const response = await axios.put(`${URL}${id}`, selectedProduct);
      if (response.status === 200) {
        setData((prevData) => {
          prevData.map((item) => (item.id === id ? selectedProduct : item));
        });
        handleOk();
      } else {
        console.log("Failed to update the item on the server.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => <img src={text} width={50} height={50} alt="Product" />,
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
      title: "Actions",
      render: (record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => removeElement(record.id)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => showModal(record.id)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <f>
      <Table rowKey="id" columns={columns} dataSource={data} />
      <Modal
        title="Product Details"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedProduct && (
          <form>
            <label>Id</label>
            <input
              required
              disabled
              type="text"
              name="id"
              value={selectedProduct.id}
            />
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              name="title"
              value={selectedProduct.title}
              onChange={handleFormChange}
            />
            <label htmlFor="price">Price</label>
            <input
              required
              type="number"
              name="price"
              value={selectedProduct.price}
              onChange={handleFormChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              required
              name="description"
              value={selectedProduct.description}
              onChange={handleFormChange}
            />
            <button type="submit">OK</button>
          </form>
        )}
      </Modal>
    </f>
  );
};

export default AdminProduct;
