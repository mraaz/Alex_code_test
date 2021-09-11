"use strict";

// const data_set = await axios.post(
//   "https://2b198arbha.execute-api.us-east-1.amazonaws.com/add_trans/add_trans",
//   {
//     id: txn.id,
//     fromAccount: txn.fromAccount,
//     toAccount: txn.toAccount,
//     description: txn.description,
//     amount: txn.amount,
//     date: txn.date,
//     owner: { id: txn.owner.id, name: txn.owner.name },
//   }
// );

exports.handler = async (event) => {
  let responseCode = 200;
  let responseBody = "";
  let data_set = {};

  try {
    if (event.body) {
      let body = JSON.parse(event.body);
      if (body.id) {
        let updateTrans = {};

        updateTrans["id"] = body.id;
        updateTrans["fromAccount"] = body.fromAccount;
        updateTrans["toAccount"] = body.toAccount;
        updateTrans["description"] = body.description;
        updateTrans["amount"] = body.amount;
        updateTrans["date"] = body.date;

        let updateOwner = {};

        updateOwner["id"] = body.owner.id;
        updateOwner["name"] = body.owner.name;

        updateTrans["owner"] = updateOwner;

        data_set[body.id] = updateTrans;

        responseBody = "Transaction created";
      }
    }
  } catch (error) {
    responseCode = 400;
    responseBody = "Update Failed";
  }

  let response = {
    statusCode: responseCode,
    headers: {
      "x-custom-header": "my custom header value",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
    body: JSON.stringify(responseBody),
  };
  return response;
};
