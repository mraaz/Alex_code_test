"use strict";

// const results = await axios.put(
//     `https://uqh0otp71g.execute-api.us-east-1.amazonaws.com/transactions/transactions/${txn.id}`,
//     {
//       id: txn.id,
//       fromAccount: txn.fromAccount,
//       toAccount: txn.toAccount,
//       description: txn.description,
//       amount: txn.amount,
//       date: txn.date,
//       owner: { id: txn.owner.id, name: txn.owner.name },
//     }
//   );

exports.handler = async (event) => {
  let responseCode = 200;
  let responseBody = "";

  //const data = JSON.stringify(event);

  let data_set = {};

  data_set["05c17cad-9279-423c-b32b-cdb9e0e26d36"] = {
    id: "05c17cad-9279-423c-b32b-cdb9e0e26d36",
    fromAccount: "135790",
    toAccount: "789123",
    description: "Raaz Second transaction description",
    amount: 45678.33,
    date: "2021-09-11T04:01:22.7223957Z",
    owner: {
      id: "3eb148e5-14de-4177-a3c5-e357be474712",
      name: "Malik Raaz",
    },
  };

  data_set["05c17cad-9279-423c-b32b-cdb9e0e26d36"] = {
    id: "6976fe63-c665-445b-835c-42dabe9fa3b7",
    fromAccount: "123456",
    toAccount: "789123",
    description: "Raaz First transaction description",
    amount: 123456.78,
    date: "2021-09-11T04:01:22.7223954Z",
    owner: {
      id: "78cf59a3-3e43-4897-9bab-bfdf30b41e84",
      name: "Marc Raaz",
    },
  };

  data_set["05c17cad-9279-423c-b32b-cdb9e0e26d36"] = {
    id: "221142e2-8240-4196-80df-fce8a711c462",
    fromAccount: "123456",
    toAccount: "789123",
    description: "Third transaction description",
    amount: 98765,
    date: "2021-09-11T04:01:22.7223958Z",
    owner: {
      id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
      name: "Maia Raaz",
    },
  };

  try {
    if (event.body) {
      //ToDo: Get ID from URL
      const tmpID = "05c17cad-9279-423c-b32b-cdb9e0e26d36";

      let body = JSON.parse(event.body);
      if (body.id) {
        let updateTrans = data_set[tmpID];

        updateTrans["id"] = body.id;
        updateTrans["fromAccount"] = body.fromAccount;
        updateTrans["toAccount"] = body.toAccount;
        updateTrans["description"] = body.description;
        updateTrans["amount"] = body.amount;
        updateTrans["date"] = body.date;

        let updateOwner = updateTrans["owner"];
        updateOwner["id"] = body.owner.id;
        updateOwner["name"] = body.owner.name;

        updateTrans["owner"] = updateOwner;

        data_set[tmpID] = updateTrans;
        responseBody = "Record Updated";
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
      "Access-Control-Allow-Methods": "GET,PUT",
    },
    body: JSON.stringify(responseBody),
  };
  return response;
};
