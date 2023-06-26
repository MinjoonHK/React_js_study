import React, { useState } from 'react';
import {Button, Form, Input,} from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';


type SizeType = Parameters<typeof Form>[0]['size'];

const AddCompany: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const onFinish = async ({userName, email, phoneNumber, password, }) => {
    try{
      const res = await axios.post("/addcompany",{userName, email, phoneNumber, password});
      if(res.status === 200){
        Swal.fire(`Welcome ${userName}`, 'You have successfully Signed Up!', 'success')
      }
    }
    catch(err){
      console.log(err);
    }
  };
  
  const onFinishFailed = (errorInfo: never) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      >
      <Form.Item 
      label="Company"
      name="company"
      rules={[{ required: true, message: 'Please input your Company Name!' }]}
      >
        
        <Input />
      </Form.Item>
      <Form.Item 
      label="Owner"
      name="owner"
      >
        <Input />
      </Form.Item>
      <Form.Item 
      label="Phone Number"
      name="phoneNumber"
      rules={[{ required: true, message: 'Please input the Phone Number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
      label="Address"
      name="address"
      rules={[{ required: true, message: 'Please input the Address!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button>Submit</Button>
      </Form.Item>
    </Form>

  );
};

export default AddCompany;