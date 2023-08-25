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

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {data ? <Result yearlyData={data} initialInvestment={investment} /> : <p>No investment calculated yet.</p>}
    </div>
  );
}

export default App;
