import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from '../src/css/Login.module.css';
import {useEffect, useState} from "react";
import axios from 'axios';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


function Login(){
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:4000/login/success", //Port number should equal to the server
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const login = () => {
    axios({
      url: "http://localhost:4000/login",
      method: "POST",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    }).then((result) => {
      if (result.status === 200) {
        window.open('/', '_self')
      }
    });
  };
  const logout = () => {
    axios({
      url: "http://localhost:4000/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  const accessToken = () => {
    axios({
      url: "http://localhost:8123/accesstoken",
      method: "GET",
      withCredentials: true,
    });
  };

  const refreshToken = () => {
    axios({
      url: "http://localhost:8123/refreshtoken",
      method: "GET",
      withCredentials: true,
    });
  };



  return(
  <div className={styles.Login}>
  <div className={styles.LoginWrapper}>
    <div className={styles.LoginContent}>
      <div className={styles.LoginTitle}>
        <h1>Electricity Tracker</h1>
        </div>
      <br />
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input 
      type="email"
      placeholder="email"
      className = "inputValue"
      onChange={(e) => setEmail(e.target.value)}
     />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      type="password"
      placeholder="password"
      className = "inputValue"
      onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
      <a className={styles.login_form_forgot} href="">
          Forgot password?
        </a>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" onClick={login}>
        Login
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="primary" htmlType="submit">
        Sign Up
      </Button>
    </Form.Item>
  </Form>
  </div>
  </div>
  </div>
  )
};

export default Login;