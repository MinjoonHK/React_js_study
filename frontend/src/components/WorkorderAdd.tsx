import React, { useRef, useState } from "react";
import { Button, Form, Input, Card, DatePicker } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import jwtDecode from "jwt-decode";
import { decodedToken } from "../view/dashboard/Dashboard";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";
type SizeType = Parameters<typeof Form>[0]["size"];

const AddWorkOrder: React.FC = () => {
  const navigate = useNavigate();

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const onFinish = async ({ ordersummary, DatePicker }) => {
    try {
      const decoded: decodedToken = jwtDecode(localStorage.getItem("jwt"));
      const ID: number = decoded.ID;
      const res = await axios.post("/dashboard/workorder/addworkorder", {
        ordersummary,
        DatePicker,
        ID,
      });
      if (res.status === 200) {
        Swal.fire(
          `Great Job!`,
          `You have successfully added new Work Order!`,
          "success"
        );
        navigate("/workorder");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const defaultDate = dayjs(new Date()).format("YYYY-MM-DD");
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
              label="Order Summary"
              name="ordersummary"
              rules={[
                { required: true, message: "Please input your order summary!" },
              ]}
            >
              <Form.Item>
                <TextArea rows={4} />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="Start Date"
              name="DatePicker"
              style={{ textAlign: "left" }}
              rules={[
                { required: true, message: "Please pick the Starting Date!" },
              ]}
            >
              <DatePicker format={dateFormat} size="large" />
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
