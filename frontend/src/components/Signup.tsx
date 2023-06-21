import { Button, Checkbox, Form, Input,Alert, Space  } from 'antd';
import styles from '../css/Login.module.css';
import { useState  } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





function SignUp(){
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
        <h1>Sign Up</h1>
        </div>
      <br />
  <Form
    name="Login"
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
      name="Username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input 
      placeholder="John Doe"
      className = "inputValue"
      onChange={(e) => setEmail(e.target.value)}
     />
     
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input valid Email address!', type:"email" }]}
    >
      <Input 
      placeholder="example@gmail.com"
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
      placeholder="Input Password"
      className = "inputValue"
      onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirmPassword"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      type="password"
      placeholder="Input Password Again"
      className = "inputValue"
      onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>
    <div style={{marginBottom:"2%"}}>
      <Button
      style={{marginLeft:'33%'}} 
      type="primary" 
      htmlType="submit">
        Submit
      </Button>
    </div>


      
  </Form>
  </div>
  </div>
  </div>
  )
};

export default SignUp;