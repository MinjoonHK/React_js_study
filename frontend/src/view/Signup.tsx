import { Button, Checkbox, Form, Input,Alert, Space, Select  } from 'antd';
import styles from '../css/Login.module.css';
import { useState  } from "react";
import axios from 'axios';
import { Link, Route, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const { Option } = Select;


function SignUp(){
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const onFinish = async ({userName, email, phoneNumber, password, }) => {
    try{
      const res = await axios.post("/signup",{userName, email, phoneNumber, password});
      if(res.status === 200){
        Swal.fire(`Welcome ${userName}`, 'You have successfully Signed Up!', 'success')
        navigate('/login');
      }
    }
    catch(err){
      console.log(err);
    }
  };
  
  const onFinishFailed = (errorInfo: never) => {
    console.log('Failed:', errorInfo);
  };


  
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
    name="SignUp"
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
      name="userName"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input 
      placeholder="John Doe"
      className = "inputValue"
      onChange={(e) => setUserName(e.target.value)}
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
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input
        placeholder="+852 1234 1234"
        className = "inputValue"
        onChange={(e) => setPhoneNumber(e.target.value)}
        />
        
      </Form.Item>

    <Form.Item
        label="Password"
        name="password"
        rules={[
          {required: true, message: 'Please input your password!'}]}
        hasFeedback
      >
        <Input.Password 
        type="password"
        placeholder="password"
        className = "inputValue"
        onChange={(e) => setPassword(e.target.value)}
        />
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