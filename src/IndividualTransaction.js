import React from "react";

export const IndividualTransaction = ({ transaction }) => {
  if (transaction) {
    const utcDate = new Date(transaction.date);
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <ul className="list-transaction">
          <li>Amount: ${transaction.amount}</li>
          <li>Date: {utcDate.toLocaleDateString()}</li>
          <li>Desc: {transaction.description}</li>
          <li>From Acc: {transaction.fromAccount}</li>
          <li>Owner ID: {transaction.owner.id}</li>
          <li>Owner Name: {transaction.owner.name}</li>
          <li>To Acc: {transaction.toAccount}</li>
        </ul>
      </div>
    );
  } else {
    return <div style={{ textAlign: "center", marginTop: 50 }}> </div>;
  }
};
