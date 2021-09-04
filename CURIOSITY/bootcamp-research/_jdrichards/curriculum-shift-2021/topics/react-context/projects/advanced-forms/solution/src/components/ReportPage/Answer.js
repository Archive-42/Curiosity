import { LIKERT_SCALE } from "../SurveyPage/Question";

function Answer({ question, value }) {
  switch (question.type) {
    case "mcq":
      let answer = question.options.find((option) => option.value === Number(value));
      return (
        <>
          <div className="answer-header">{question.stem}</div>
          <div className="answer-response">
            {value === "other" ? "Other" : answer.text}
          </div>
        </>
      );
    case "spi":
      return (
        <>
          <div>{question.stem}</div>
          <div>
            {LIKERT_SCALE[question.scale][value]}
          </div>
        </>
      );
    case "likert":
      return (
        <>
          <div className="answer-header">
            {question.stimulus && question.stimulus.text} {question.stem}
          </div>
          <div className="answer-response">
            {value === "N/A" ? "N/A" : LIKERT_SCALE[question.scale][value]}
          </div>
        </>
      );
    case "cr":
    default:
      return (
        <>
          <div className="answer-header">{question.stem}</div>
          <div className="answer-response">{value}</div>
        </>
      );
  }
}

export default Answer;