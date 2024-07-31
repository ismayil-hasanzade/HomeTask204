import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

const MyForm = () => {
  const [form] = Form.useForm();
  type FieldType = {
    companyName?: string;
    contactTitle?: string;
    address?: {
      city?: string;
      country?: string;
    };
  };

  const URL = "https://northwind.vercel.app/api/customers";

  const [data, setData] = useState<FieldType>({});

  const postData = async (param: FieldType) => {
    try {
      const response = await axios.post(`${URL}`, param);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    postData(values);
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label="Company name"
          name="companyName"
          rules={[
            { required: true, message: "Please input your company name!" },
          ]}
        >
          <Input
            name="companyName"
            value={data?.companyName}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Contact title"
          name="contactTitle"
          rules={[
            { required: true, message: "Please input your contact title!" },
          ]}
        >
          <Input
            name="contactTitle"
            value={data?.contactTitle}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input
            name="city"
            value={data?.address?.city}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please input your country!" }]}
        >
          <Input
            name="country"
            value={data?.address?.country}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MyForm;
