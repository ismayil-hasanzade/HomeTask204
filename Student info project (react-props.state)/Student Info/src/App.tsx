import "./App.css";
import "./css/style.css";
import Form from "./components/Form";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";

export interface Student {
  id: string;
  name: string;
  email: string;
  gpa: number;
}

function App() {
  const [formData, setFormData] = useState<Student | null>(null);
  return (
    <>
      <h1>Add Stundent Info</h1>

      <Form formData={formData} setFormData={setFormData} />
      <Table formData={formData} setFormData={setFormData} />
    </>
  );
}

export default App;
