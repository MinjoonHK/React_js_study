import { Button, Checkbox, Form, Input,Alert, Space, Select  } from 'antd';
import styles from '../css/Login.module.css';
import { useState  } from "react";
import axios from 'axios';
import { Link, Route, useNavigate } from 'react-router-dom';

const { Option } = Select;




function SignUp(){
  const navigate = useNavigate();
  const onFinish = async ({userName, email, phoneNumber, password, }) => {
    try{
      const res = await axios.post("/signup",{email, password}); 
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="852">+852</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input 
        placeholder="+852 1234 1234"/>
        
      </Form.Item>

    <Form.Item
        label="Password"
        name="password"
        rules={[
          {required: true, message: 'Please input your password!'}]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Password does not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    <div style={{marginBottom:"2%"}}>
      <Button
      style={{marginLeft:'33%', marginRight:'3%'}} 
      type="primary" 
      htmlType="submit">
        Submit
      </Button>
      <Link to="/login">
      <Button>
        Back to Login
      </Button>
      </Link>
    </div>


      
  </Form>
  </div>
  </div>
  </div>
  )
};

export default SignUp;