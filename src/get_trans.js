"use strict";

// const data_set = await axios.get(
//   "https://fu6xiyueua.execute-api.us-east-1.amazonaws.com/transactions/test"
// );

exports.handler = async (event) => {
  let responseCode = 200;

  let data_set = [];

  const clientData_1 = {
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
  data_set.push(clientData_1);

  const clientData_2 = {
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
  data_set.push(clientData_2);

  const clientData_3 = {
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
  data_set.push(clientData_3);

  let responseBody = data_set;

  let response = {
    statusCode: responseCode,
    headers: {
      "x-custom-header": "my custom header value",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
    body: JSON.stringify(responseBody),
  };
  return response;
};
