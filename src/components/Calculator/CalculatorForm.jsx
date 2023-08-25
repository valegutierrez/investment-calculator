import "./CalculatorForm.css";
import { useState } from "react";

const CalculatorForm = (props) => {
  const initialUserInput = {
		enteredCurrentSavings: "",
		enteredYearlyContribution: "",
		enteredExpectedInterest: "",
    enteredInvestmentDuration: ""
  }
  const [userInput, setUserInput] = useState(initialUserInput);

  const currentSavingsHandler = (event) => {
		setUserInput({
			...userInput,
			enteredCurrentSavings: event.target.value
		})
	};

  const yearlyContributionHandler = (event) => {
		setUserInput({
			...userInput,
			enteredYearlyContribution: event.target.value
		})
	};

  const expectedInterestHandler = (event) => {
		setUserInput({
			...userInput,
			enteredExpectedInterest: event.target.value
		})
	};

  const investmentDurationHandler = (event) => {
		setUserInput({
			...userInput,
			enteredInvestmentDuration: event.target.value
		})
	};

  const calculateHandler = event => {
    event.preventDefault();
			let currentSavings = +userInput.enteredCurrentSavings;
			const yearlyContribution = +userInput.enteredYearlyContribution;
			const expectedInterest = +userInput.enteredExpectedInterest / 100;
      const investmentDuration = +userInput.enteredInvestmentDuration;

    if (
      isNaN(currentSavings) ||
      isNaN(yearlyContribution) ||
      isNaN(expectedInterest) ||
      isNaN(investmentDuration)
    ) { return };

    const initialInvestment = +userInput.enteredCurrentSavings;
    const yearlyData = []; // per-year results

    for (let i = 0; i < investmentDuration; i++) {
      const yearlyInterest = currentSavings * expectedInterest;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
    props.onSaveYearlyData(yearlyData);
    props.onSaveInitialInvestment(initialInvestment);
  };

  const resetHandler = () => {
    setUserInput(initialUserInput);
    props.onReset();
  }

  return (
      <form className="form" onSubmit={calculateHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input type="number" value={userInput.enteredCurrentSavings} onChange={currentSavingsHandler} id="current-savings" />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input type="number" value={userInput.enteredYearlyContribution} onChange={yearlyContributionHandler} id="yearly-contribution" />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input type="number" value={userInput.enteredExpectedInterest} onChange={expectedInterestHandler} id="expected-return" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input type="number" value={userInput.enteredInvestmentDuration} onChange={investmentDurationHandler} id="duration" />
        </p>
      </div>
      <p className="actions">
        <button type="reset" onClick={resetHandler} className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  )
}

export default CalculatorForm;