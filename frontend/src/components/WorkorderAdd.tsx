import React, { useState } from "react";
import { Button, Form, Input, Card, DatePicker } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

type SizeType = Parameters<typeof Form>[0]["size"];

const AddWorkOrder: React.FC = () => {
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const onFinish = async ({ company, phoneNumber, address }) => {
    try {
      const res = await axios.post("/dashboard/companylist/addworkorder", {
        company,
        phoneNumber,
        address,
      });
      if (res.status === 200) {
        Swal.fire(
          `Great Job!`,
          `You have successfully added new Compnay!`,
          "success"
        );
        navigate("/workorder");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: never) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          flexWrap: "wrap",
        }}
      >
        <Card
          title={
            <div style={{ fontWeight: "bold", fontSize: "25px" }}>
              Add New Work Order
            </div>
          }
          bordered={false}
          style={{ width: "100%", border: "solid rgb(226, 226, 226) 1.5px" }}
        >
          <Form
            layout="vertical"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Company"
              name="company"
              rules={[
                { required: true, message: "Please input your Company Name!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input the Phone Number!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input the Address!" }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Order Summary"
              name="ordersummary"
              rules={[
                { required: true, message: "Please input your order summary!" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Start Date"
              name="DatePicker"
              rules={[
                { required: true, message: "Please pick the Starting Date!" },
              ]}
            >
              <div
                style={{
                  textAlign: "left",
                }}
              >
                <DatePicker size="large" />
              </div>
            </Form.Item>

            <Form.Item>
              <div style={{ width: "100%", justifyContent: "center" }}>
                <Button
                  style={{
                    width: "300px",
                    height: "50px",
                    color: "white",
                    backgroundColor: "rgb(45,68,134)",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddWorkOrder;
