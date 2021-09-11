import React, { useEffect, useState } from "react";
import axios from "axios";
import { NoDataView } from "./NoDataView";
import { IndividualTransaction } from "./IndividualTransaction";

import { CustomModal } from "./CustomModal";

import "./App.css";

function App() {
  const [transactions = {}, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [curTrans, setcurTrans] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data_set = await axios.get(
          "https://alex-code-test.azurewebsites.net/api/transactions"
        );
        if (data_set.data) setData(data_set.data);
      } catch (error) {
        console.log("Opps! ", error);
      }
    }
    fetchData();
  }, []);

  const clickedEdit = async (txn) => {
    setcurTrans(txn);
    setOpenModal(true);
  };

  const clickedDelete = async (id) => {
    try {
      const results = await axios.delete(
        `https://alex-code-test.azurewebsites.net/api/transactions/${id}`
      );
      if ((results.data = "Transaction deleted")) console.log("Success");
      else console.log("Failed");
    } catch (error) {
      console.log("Opps! ", error);
    }
  };

  const clickedAdd = () => {
    setcurTrans(null);
    setOpenModal(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => clickedAdd()}>Add Transaction</button>
        {openModal && (
          <CustomModal payload={curTrans} setOpenModal={setOpenModal} />
        )}
        <NoDataView haveData={transactions.length}>
          {transactions.map((txn) => (
            <div className="transaction">
              <IndividualTransaction transaction={txn} key={txn.id} />
              <button
                type="button-edit"
                onClick={() => clickedEdit(txn)}
                className="btn btn-edit"
              >
                Edit
              </button>
              &nbsp;
              <button
                type="button-delete"
                onClick={() => {
                  if (window.confirm("Delete this transaction?")) {
                    clickedDelete(txn.id);
                  }
                }}
                className="btn btn-delete"
              >
                Delete
              </button>
              <hr style={{ width: "100%" }}></hr>
            </div>
          ))}
        </NoDataView>
      </header>
    </div>
  );
}

export default App;
