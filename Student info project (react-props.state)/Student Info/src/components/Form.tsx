import axios from "axios";

const Form = ({ formData, setFormData }) => {
  const URL: string = "https://northwind.vercel.app/api/customers";
  const PostData = async (params: object) => {
    try {
      const res = await axios.post(URL, params);

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateData = async (id: object) => {
    try {
      const res = await axios.patch(`${URL}/${id}`, formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PostData(formData);
    setFormData({
      name: "",
      email: "",
      gpa: 0,
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    UpdateData(formData.id);
    setFormData({
      name: "",
      email: "",
      gpa: 0,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={formData?.id ? handleUpdate : handleSubmit}>
        <input
          required
          type="text"
          placeholder="Name"
          name="name"
          value={formData?.name}
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
        />
        <input
          required
          type="number"
          placeholder="0"
          name="gpa"
          value={formData?.gpa}
          onChange={handleChange}
        />
        {formData?.id ? (
          <button onClick={handleUpdate} type="submit">
            Edit
          </button>
        ) : (
          <button type="submit">Add</button>
        )}
      </form>
    </>
  );
};

export default Form;
