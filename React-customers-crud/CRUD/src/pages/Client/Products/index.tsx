import { Button, Table } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Flex, Spin, message, Popconfirm, Input, Space } from "antd";
import type { PopconfirmProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useFavorites } from "../../../assets/components/FavoritesProvider";

interface DataType {
  id: string;
  companyName: string;
  contactTitle: string;
  address: {
    street: string;
    city: string;
  };
}

type DataIndex = keyof DataType;

const Products: React.FC = () => {
  const { favorites, addFavorite } = useFavorites();
  const [addedFavorites, setAddedFavorites] = useState<Set<string>>(new Set());
  const [buttonTypes, setButtonTypes] = useState<Record<string, "default" | "primary">>({});

  const handleAddToFavorites = (item: DataType) => {
    if (addedFavorites.has(item.id)) {
      alert("Favorilere elave olunub");
    } else {
      addFavorite(item);
      setAddedFavorites(new Set(addedFavorites).add(item.id));
      setButtonTypes({ ...buttonTypes, [item.id]: "primary" });
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    message.success("Remove Element");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    message.error("Click on No");
  };

  const URL: string = "https://northwind.vercel.app/api/customers";

  const [loading, setLoading] = useState(true);

  const RemoveElement = async (id: string) => {
    await axios.delete(`${URL}/${id}`);
    getProducts();
  };

  const [products, setProducts] = useState<DataType[]>([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(URL);
      setProducts(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "companyName",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: "contactTitle",
      dataIndex: "contactTitle",
      key: "contactTitle",
      ...getColumnSearchProps("contactTitle"),
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
      render: (obj) => `${obj.street} ${obj.city}`,
    },
    {
      title: "Delete",
      key: "delete",
      render: (obj) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => {
            RemoveElement(obj.id);
            confirm();
          }}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Danger</Button>
        </Popconfirm>
      ),
    },
    {
      title: "Add to Favorites",
      key: "add",
      render: (obj) => (
        <Button
          type={buttonTypes[obj.id] || "default"}
          onClick={() => {
            handleAddToFavorites(obj);
          }}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" gap="large">
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
        </Flex>
      ) : (
        <Table columns={columns} dataSource={products} rowKey={"id"} />
      )}
    </>
  );
};

export default Products;
