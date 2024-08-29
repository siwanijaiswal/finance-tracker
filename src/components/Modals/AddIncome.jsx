import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';
const AddIncome = ({ isIncomeModalVisible, handleIncomeCancel, onFinish }) => {
  const [form] = Form.useForm();
  const [isCustomTag, setIsCustomTag] = useState(false);
  const [customTag, setCustomTag] = useState('');

  const handleCustomTag = (value) => {
    if (value == 'custom-tag') {
      setIsCustomTag(true);
    } else {
      setIsCustomTag(false);
      form.setFieldsValue({ tag: value });
    }
  };

  return (
    <div>
      <Modal
        style={{ fontWeight: 600 }}
        title='Add Income'
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            if (isCustomTag) {
              values.tag = customTag;
            }
            onFinish(values, 'income');
            form.resetFields();
            setCustomTag('');
            setIsCustomTag(false);
            handleIncomeCancel();
          }}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label='Amount'
            name='amount'
            rules={[
              {
                required: true,
                message: 'Please input the income amount!',
              },
            ]}
          >
            <Input type='number' className='custom-input' />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label='Date'
            name='date'
            rules={[
              {
                required: true,
                message: 'Please select the income date!',
              },
            ]}
          >
            <DatePicker format='YYYY-MM-DD' className='custom-input' />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label='Tag'
            name='tag'
            rules={[
              {
                required: true,
                message: 'Please select a tag',
              },
            ]}
          >
            <Select className='select-input-2' onChange={handleCustomTag}>
              <Select.Option value='salary'> Salary </Select.Option>
              <Select.Option value='investment'>Investment</Select.Option>
              <Select.Option value='others'>Others</Select.Option>
              <Select.Option value='custom-tag'>
                Create Tag
                <span style={{ marginLeft: '240px' }}>
                  <i class='fa-solid fa-pen-to-square'></i>{' '}
                </span>
              </Select.Option>
            </Select>
          </Form.Item>
          {isCustomTag && (
            <Form.Item
              style={{ fontWeight: 600 }}
              label='Custom Tag Name'
              name='customTag'
              rules={[
                {
                  required: true,
                  message: 'Please input the custom tag!',
                },
              ]}
            >
              <Input
                type='text'
                className='custom-input'
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
              />
            </Form.Item>
          )}
          <Form.Item
            style={{ fontWeight: 600 }}
            label='Details'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input the details of income!',
              },
            ]}
          >
            <Input type='text' className='custom-input' />
          </Form.Item>
          <Form.Item>
            <Button className='btn btn-blue' type='primary' htmlType='submit'>
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddIncome;
