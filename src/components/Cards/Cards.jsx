import React from 'react';
import { Row, Card } from 'antd';
import './Cards.css';
import Button from '../Button/Button';

const Cards = ({
  income,
  expense,
  totalBalance,
  showExpenseModel,
  showIncomeModel,
}) => {
  return (
    <div>
      <Row className='card-row'>
        <Card className='dashboard-card'>
          <h2> Current Balance </h2>
          <p>₹{parseFloat(totalBalance).toFixed(2)} </p>
        </Card>
        <Card className='dashboard-card'>
          <h2> Total Income </h2>
          <p>₹{parseFloat(income).toFixed(2)} </p>
          <Button blue={true} onClick={showIncomeModel}>
            {' '}
            Add Income{' '}
          </Button>
        </Card>
        <Card className='dashboard-card'>
          <h2> Total Expense </h2>
          <p>₹{parseFloat(expense).toFixed(2)} </p>
          <Button blue={true} onClick={showExpenseModel}>
            Add Expense
          </Button>
        </Card>
      </Row>
    </div>
  );
};
export default Cards;
