import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setData(response.data);
    };
    getdata();
  }, []);

  return (
    <div id="DetailPage">
      <div className="container">{data?.title}</div>
    </div>
  );
};

export default DetailPage;
