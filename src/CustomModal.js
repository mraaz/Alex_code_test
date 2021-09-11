import React from "react";
import Modal from "react-modal";
import { useEffect, useState } from "react";

import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
};

export const CustomModal = (props) => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [newTrans, setnewTrans] = useState(true);

  const [amount = 0, setAmount] = useState();
  const [date = "", setDate] = useState();
  const [description = "", setDescription] = useState();
  const [fromAcc = "", setFromAcc] = useState();
  const [ownerID = "", setOwnerID] = useState();
  const [ownerName = "", setOwnerName] = useState();
  const [toAcc = "", setToAcc] = useState();

  useEffect(() => {
    if (props.payload != null) {
      setAmount(props.payload.amount);
      setDate(props.payload.date);
      setDescription(props.payload.description);
      setFromAcc(props.payload.fromAccount);
      setOwnerID(props.payload.owner.id);
      setOwnerName(props.payload.owner.name);
      setToAcc(props.payload.toAccount);
      setnewTrans(false);
    }
  }, []);

  function closeModal() {
    props.setOpenModal(false);
  }

  async function saveTrans() {
    try {
      if (newTrans) {
        await axios.post(
          "https://alex-code-test.azurewebsites.net/api/transactions",
          {
            id: "6976fe63-c665-445b-835c-42dabe9fa3b7",
            fromAccount: fromAcc,
            toAccount: toAcc,
            description: description,
            amount: amount,
            date: date,
            owner: {
              id: ownerID,
              name: ownerName,
            },
          }
        );
      } else {
        const data = await axios.put(
          `https://alex-code-test.azurewebsites.net/api/transactions/${props.payload.id}`,
          {
            id: props.payload.id,
            fromAccount: fromAcc,
            toAccount: toAcc,
            description: description,
            amount: amount,
            date: date,
            owner: {
              id: ownerID,
              name: ownerName,
            },
          }
        );
        console.log(data);
      }

      alert("Record saved!");
      props.setOpenModal(false);
    } catch (error) {
      console.log("Opps! ", error);
      alert("Record unsucessfull, ensure all fields are filled in");
    }
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Tans Modal"
        shouldCloseOnOverlayClick={false}
      >
        <h2>Transaction</h2>
        <form classname="form" onSubmit={(event) => event.preventDefault()}>
          <div className="label">Amount</div>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/, ""))}
            placeholder="Enter Amount"
          />

          <div className="label">Date</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter Date"
          />

          <div className="label">Description</div>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write description..."
            maxLength="254"
          ></textarea>

          <div className="label">From Account</div>
          <input
            type="text"
            value={fromAcc}
            onChange={(e) => setFromAcc(e.target.value)}
            placeholder="Enter From Amount"
          />

          <div className="label">Owner ID</div>
          <input
            type="text"
            value={ownerID}
            onChange={(e) => setOwnerID(e.target.value)}
            placeholder="Enter Owner ID"
          />

          <div className="label">Owner Name</div>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Enter Owner Name"
          />

          <div className="label">To Account</div>
          <input
            type="text"
            value={toAcc}
            onChange={(e) => setToAcc(e.target.value)}
            placeholder="Enter Owner Name"
          />
        </form>
        <button onClick={saveTrans}> {newTrans ? "Create" : "Update"} </button>
        &nbsp;
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};
