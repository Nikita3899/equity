import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal, Row, Col, Upload, message } from 'antd';
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const MyForm = ({ visible, onCancel }:{visible:boolean, onCancel:any}) => {
  const [form] = Form.useForm();


  const onFinish = (values:any) => {
    console.log('Received values:', values);
    message.success('Form submitted successfully!!')
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="New Sales Invoice"
      onCancel={onCancel}
      footer={null}
    >
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Customer Name" name="customerName" rules={[{ required: true, message: 'Please enter customer name' }]}>
            <Input placeholder="Enter customer name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Invoice Date" name="invoiceDate" rules={[{ required: true, message: 'Please enter invoice date' }]}>
            <Input type="date" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Customer Email" name="customerEmail" rules={[{ required: true, message: 'Please enter customer email' }]}>
        <Input type="email" placeholder="Enter customer email" />
      </Form.Item>

      <Form.Item label="Invoice File" name="invoiceFile" valuePropName="fileList" getValueFromEvent={(e) => e.fileList} rules={[{ required: true, message: 'Please upload an invoice file' }]}>
        <Upload 
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload Invoice File</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Modal>
  );
};

export default MyForm;
