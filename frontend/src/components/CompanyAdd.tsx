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
  const onFinish = async ({company, owner, phoneNumber, address }) => {
    try{
      const res = await axios.post("/addcompany",{company, owner, phoneNumber, address});
      if(res.status === 200){
        Swal.fire(`Great Job!`, `You have successfully added new Compnay!`, 'success')
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
      onFinishFailed={onFinishFailed}
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
        <Button
      style={{marginLeft:'33%', marginRight:'3%'}} 
      type="primary" 
      htmlType="submit">
        Submit
      </Button>
      </Form.Item>
    </Form>

  );
};

export default AddCompany;