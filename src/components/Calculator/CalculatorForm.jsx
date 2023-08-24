import "./CalculatorForm.css";
import { useState } from "react";

const CalculatorForm = (props) => {
  const [userInput, setUserInput] = useState({
		enteredCurrentSavings:"",
		enteredYearlyContribution:"",
		enteredExpectedInterest: "",
    enteredInvestmentDuration: ""
	});

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
    const investmentData = {
			currentSavings: parseInt(userInput.enteredCurrentSavings),
			yearlyContribution: parseInt(userInput.enteredYearlyContribution),
			expectedInterest: (userInput.enteredExpectedInterest / 100),
      investmentDuration: parseInt(userInput.enteredInvestmentDuration)
		}
    console.log(investmentData);
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results
    let savingsEndofYear = 0;

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < investmentData.investmentDuration; i++) {
      const yearlyInterest = investmentData.currentSavings * investmentData.expectedInterest;
      savingsEndofYear += investmentData.currentSavings + yearlyInterest + investmentData.yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: savingsEndofYear,
        yearlyContribution: investmentData.yearlyContribution,
      });
    }
    console.log(yearlyData);
    // do something with yearlyData ...
  };

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
        <button type="reset" className="buttonAlt">
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