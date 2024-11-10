import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  TimePicker,
} from 'antd';
import dayjs from 'dayjs';

const AddExpense = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [form] = Form.useForm();
  const [isCustomTag, setIsCustomTag] = useState(false);
  const [customTag, setCustomTag] = useState('');

  const handleDateChange = (date) => {
    setCurrentDate(date);
    form.setFieldsValue({ date: date });
  };

  const handleTimeChange = (time) => {
    setCurrentTime(time);
    form.setFieldsValue({ time: time });
  };

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
        title='Add Expense'
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            if (isCustomTag) {
              values.tag = customTag;
            }
            onFinish(values, 'expense');
            form.resetFields();
            setCustomTag('');
            setIsCustomTag(false);
            handleExpenseCancel();
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Form.Item
              style={{ fontWeight: 600 }}
              name='date'
              rules={[
                {
                  required: true,
                  message: 'Please select the income date!',
                },
              ]}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <DatePicker
                  value={currentDate}
                  format='YYYY-MM-DD'
                  onChange={handleDateChange}
                  className='custom-date-input'
                  allowClear={false}
                />
                <span className='date-time-input'>
                  {currentDate.format('DD-MM-YYYY')}
                </span>
              </div>
            </Form.Item>

            <Form.Item
              name='time'
              rules={[
                {
                  required: true,
                  message: 'Please select the income time!',
                },
              ]}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TimePicker
                  value={currentTime}
                  format='hh:mm A'
                  onChange={handleTimeChange}
                  use12Hours
                  className='custom-time-input'
                  allowClear={false}
                />
                <span className='date-time-input'>
                  {currentTime.format('hh:mm A')}
                </span>
              </div>
            </Form.Item>
          </div>
          <Form.Item
            style={{ fontWeight: 600 }}
            label='Amount'
            name='amount'
            rules={[
              {
                required: true,
                message: 'Please input the expense amount!',
              },
            ]}
          >
            <Input type='number' className='custom-input' />
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
              <Select.Option value='food'> Food </Select.Option>
              <Select.Option value='shopping'> Shopping</Select.Option>
              <Select.Option value='others'>Others</Select.Option>
              <Select.Option value='custom-tag'>
                Create Tag
                <span style={{ marginLeft: '240px' }}>
                  <i className='fa-solid fa-pen-to-square'></i>{' '}
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
                message: 'Please input the details of transaction!',
              },
            ]}
          >
            <Input type='text' className='custom-input' />
          </Form.Item>
          <Form.Item>
            <Button className='btn btn-blue' type='primary' htmlType='submit'>
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddExpense;
