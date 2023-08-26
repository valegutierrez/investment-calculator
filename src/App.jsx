import { useState } from 'react';
import CalculatorForm from './components/Calculator/CalculatorForm';
import Header from './components/Header/Header';
import Result from './components/Result/Result';

function App() {
  const [data, setData] = useState(undefined);
  const [investment, setInvestment] = useState(undefined);

  const yearlyDataHandler = (enteredData) => {
    setData(enteredData);
  }

  const initialInvestmentHandler = (initialInvestment) => {
    setInvestment(initialInvestment);
  }

  const resetResult = () => {
    setInvestment(undefined);
    setData(undefined);
  }

  return (
    <div>
      <Header />

      <CalculatorForm onSaveYearlyData={yearlyDataHandler} onSaveInitialInvestment={initialInvestmentHandler} onReset={resetResult} />

      {data ? <Result yearlyData={data} initialInvestment={investment} /> : <p style={{textAlign: "center"}}>No investment calculated yet.</p>}
    </div>
  );
}

export default App;
