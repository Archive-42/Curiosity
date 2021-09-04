import Question from './Question';
import { useState, useEffect } from "react";
import { useResults } from '../../context/ResultsContext';
import { useHistory } from 'react-router-dom';

import "./SurveyPage.css";

function SurveyPage({ survey }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [redirectTime, setRedirectTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { setResults } = useResults();
  const history = useHistory();

  const onChange = (idx) => (e) => {
    setValues({
      ...values,
      [idx]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setRedirectTime(5);
    let time = 0;
    const interval = setInterval(() => {
      console.log(time);
      if (time === 5) {
        clearInterval(interval);
        setResults({
          survey,
          values
        });
        history.push('/report');
      } else {
        time++;
        setRedirectTime(5 - time);
      }
    }, 1000);
  };

  useEffect(() => {
    const errors = {};
    survey.questions.forEach((question, id) => {
      const value = values[id];
      switch (question.type) {
        case "cr":
          if (value && value.length > question.charlimit) {
            errors[id] = `Must be less than ${question.charlimit} characters.`;
          } else if (!value && !question.optional) {
            errors[id] = `Required field`;
          }
          break;
        case "mcq":
          if (!value) {
            errors[id] = `Required field`;
          }
          break;
        case "likert":
          if (!value) {
            errors[id] = `Required field`;
          }
          break;
        default:
          break;
      }
    });
    setErrors(errors);
  }, [values, survey.questions, survey.code]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>{survey.name}</h2>
        <p className="description">{survey.description}</p>
        <p className="instructions">{survey.instructions}</p>
        <p
          className="copyright"
          dangerouslySetInnerHTML={{ __html: survey.copyright }}
        ></p>
        {survey.questions.map((question, idx) => (
          <Question
            key={idx}
            question={question}
            id={idx}
            onChange={onChange}
            value={values[idx]}
            error={errors[idx]}
          />
        ))}
        <button
          disabled={!!Object.values(errors).length || submitted}
          type="submit"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <div className="alert-box">
          <div className="thank-you">
            {survey.thankyou} 
            <div>
              Redirecting you to the results summary in {redirectTime} seconds
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SurveyPage;
