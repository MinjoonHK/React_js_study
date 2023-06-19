import { Button, Checkbox, Form, Input,Alert, Space  } from 'antd';
import styles from '../css/Login.module.css';
import { useState  } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





function Login(){
  const navigate = useNavigate();
  const onFinish = async ({email, password}) => {
    try{
      const res = await axios.post("/login",{email, password}); 
      localStorage.setItem("jwt",res.data.accessToken);
      navigate("/")
    }
    catch(err){
      if(err.response.status === 400){
        alert('please enter the correct ID and Password')
      }
      else{
        alert('Erorr')
      }
    }
  };
  
  const onFinishFailed = (errorInfo: never) => {
    console.log('Failed:', errorInfo);
  };
  
  


  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


  
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
      name="email"
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
      <Checkbox style={{marginRight:'10%'}}>Remember me</Checkbox>
      <a href="">
          Forgot password?
        </a>
    </Form.Item> 
    

      <Button style={{marginLeft:'33%', marginRight:'1%'}}type="primary" htmlType="submit">
        Login 
      </Button>
    
      <Button type="primary" htmlType="submit">
        Sign Up
      </Button>

      
  </Form>
  </div>
  </div>
  </div>
  )
};

export default Login;