'use strict';

const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    return atmMode ? (
      <div className="form-group">
        <h3 className="text-primary">{choice[Number(!isDeposit)]}</h3>
        <input className="form-control" id="number-input" type="number" onChange={onChange} />
        <input className="btn btn-primary mt-3" type="submit" value="Submit" id="submit-input" disabled={!isValid} />
      </div>
    ) : null;
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  const status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    const amount = Number(event.target.value);
    setDeposit(amount);
    if (amount <= 0) {
      setValidTransaction(false);
      return;
    }
    if (!isDeposit && amount > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
  };

  const handleModeSelect = (event) => {
    const mode = event.target.value;
    setAtmMode(mode);
    mode === "Deposit"
      ? setIsDeposit(true)
      : mode === "Cash Back"
      ? setIsDeposit(false)
      : setIsDeposit(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validTransaction) {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setDeposit(0);
      setValidTransaction(false);
    } else {
      alert("Invalid transaction");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 bg-light p-5 rounded shadow">
          <form onSubmit={handleSubmit}>
            <h2 id="total" className="text-center mb-4 text-primary">{status}</h2>
            <div className="form-group">
              <label>Select an action below to continue</label>
              <select className="form-control" onChange={handleModeSelect} name="mode" id="mode-select">
                <option id="no-selection" value="" />
                <option id="deposit-selection" value="Deposit">Deposit</option>
                <option id="cashback-selection" value="Cash Back">Cash Back</option>
              </select>
            </div>
            <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} isValid={validTransaction} />
          </form>
        </div>
      </div>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
