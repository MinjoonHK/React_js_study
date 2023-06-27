import { Button, Checkbox, Form, Input, Card, Row, Col } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface LoginForm {
  email: any;
  password: any;
}
function Login() {
  const [form] = Form.useForm<LoginForm>();
  const navigate = useNavigate();
  const onFinish = async ({ email, password, remember }) => {
    try {
      const res = await axios.post("/login", { email, password });
      localStorage.setItem("jwt", res.data.accessToken);
      if (remember) {
        setCookie("rememberEmail", email, { path: "/" });
      } else {
        removeCookie("rememberEmail");
      }
      navigate("/");
    } catch (err) {
      if (err.response.status === 400) {
        alert("please enter the correct ID and Password");
      } else {
        alert("Erorr");
      }
    }
  };

  const onFinishFailed = (errorInfo: never) => {
    console.log("Failed:", errorInfo);
  };

  const [email, setEmail] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);

  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail);
      setTimeout(() => form.resetFields(), 300);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexWrap: "wrap",
        }}
      >
        <Card
          title={
            <div style={{ fontSize: "35px", margin: "5%" }}>
              Electric Tracker
            </div>
          }
          style={{
            width: "500px",
            textAlign: "center",
            border: "2px solid gray",
          }}
        >
          <Form
            form={form}
            name="Login"
            layout="vertical"
            style={{ maxWidth: 600, margin: "15px" }}
            initialValues={{ email: email, remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={<div style={{ fontSize: "16px" }}>Email</div>}
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                size="large"
                type="email"
                placeholder="email"
                autoComplete={"email"}
                className="inputValue"
              />
            </Form.Item>

            <Form.Item
              label={<div style={{ fontSize: "16px" }}>Password</div>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                type="password"
                size="large"
                placeholder="password"
                className="inputValue"
              />
            </Form.Item>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Link
                  to="/forgotpassword"
                  style={{ color: "black", lineHeight: "32px" }}
                >
                  Find ID / PW
                </Link>
              </Col>
            </Row>

            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                Login
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/SignUp">
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(45,68,134)",
                    color: "white",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
