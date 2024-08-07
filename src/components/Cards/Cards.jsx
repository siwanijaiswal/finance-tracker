import React from 'react';
import { Row, Card } from 'antd';
import './Cards.css';
import Button from '../Button/Button';

const Cards = () => {
  return (
    <div>
      <Row className='card-row'>
        <Card className='dashboard-card'>
          <h2> Current Balance </h2>
          <p>₹0 </p>
          <Button blue={true}> Reset Balance </Button>
        </Card>
        <Card className='dashboard-card'>
          <h2> Total Income </h2>
          <p>₹0 </p>
          <Button blue={true}> Add Income </Button>
        </Card>
        <Card className='dashboard-card'>
          <h2> Total Expense </h2>
          <p>₹0 </p>
          <Button blue={true}>Add Expense</Button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
