import axios from "axios";
import React, { useEffect, useState } from "react";
import { Student } from "../App";

interface TableProps {
  formData: Student;
  setFormData: React.Dispatch<React.SetStateAction<Student>>;
}

const Table: React.FC<TableProps> = ({ formData, setFormData }) => {
  const URL: string = "http://localhost:3000/students";
  const [data, setData] = useState<Student[]>([]);
  const [sortdata, setSortdata] = useState<string>("");

  const CreateTable = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const RemoveData = async (id: string) => {
    try {
      const res = await axios.delete(`${URL}/${id}`);
      console.log(res);
      CreateTable();
    } catch (err) {
      console.log(err);
    }
  };

  const sorted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortdata(e.target.value);
  };

  useEffect(() => {
    CreateTable();
  }, []);

  const getSortedData = () => {
    if (sortdata == "") {      
      setData(data);
      CreateTable()
    } else {
      const filteredData = data.filter((item) => {
        return item.name.includes(sortdata) || item.email.includes(sortdata);
      });
      setData(filteredData);
    }
  };

  const handleEdit = (id: string) => {
    try {
      const editedStudent = data.find((q) => q.id === id);
      if (editedStudent) {
        setFormData({ ...editedStudent });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <hr />
      <div className="sortbox">
        <input
          value={sortdata}
          onChange={sorted}
          className="input-group-text"
          type="text"
        />
        <button onClick={getSortedData} className="btn">
          Sort asc
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th className="col">Student Name</th>
            <th className="col">Email</th>
            <th className="col">GPA</th>
            <th className="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="scope=row">{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.gpa}</td>
              <td>
                <button
                  onClick={() => {
                    RemoveData(item.id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash "></i>
                </button>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="btn btn-success"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </>
  );
};

export default Table;
