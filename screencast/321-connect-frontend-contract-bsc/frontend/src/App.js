import React, { useState } from 'react';
import getBlockchain from './ethereum.js';
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";

function App() {
  const [simpleStorage, setSimpleStorage] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  const connectLedger = async() => {
    const transport = await TransportWebHID.create();
    const eth = new Eth(transport);
    const {address} = await eth.getAddress("44'/60'/0'/0/0", false);
    console.log(address);
    setAddress(address);
  }

  const smartContractRead = async() => {
    const { simpleStorage } = await getBlockchain();
    const data = await simpleStorage.readData();
    setSimpleStorage(simpleStorage);
    setData(data);
  };

  const updateData = async e => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    const tx = await simpleStorage.updateData(data);
    await tx.wait();
    const newData = await simpleStorage.readData();
    setData(newData);
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4 mt-5'>
          <button onClick={connectLedger}>Connect Your Ledger</button>
        </div>

        <div className='col-sm-4'>
          <h2>Data:</h2>
          <p>{data ? data.toString() : "..." }</p>
          <button onClick={() => smartContractRead()}>Get Data</button>
        </div>

        <div className='col-sm-4'>
          <h2>Change data</h2>
          <form className="form-inline" onSubmit={e => updateData(e)}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="data"
            />
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
