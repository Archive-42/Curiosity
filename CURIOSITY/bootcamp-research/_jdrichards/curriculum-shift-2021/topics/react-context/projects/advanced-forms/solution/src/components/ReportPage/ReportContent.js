import Answer from "./Answer";

function sensoryResults(answers) {
  let sum = 0;
  answers.forEach(answer => {
    sum += 4 - answer;
  });
  return Math.round(sum / (answers.length * 4) * 100);
};

function ReportContent({ survey, values }) {
  survey.questions.forEach((question, idx) => {
    question.value = values[idx];
  });

  switch (survey.code) {
    case "sample":
    case "aa-bonus":
      return (
        <ul className="answers">
          {survey.questions.map((question, id) => {
            if (question.type === "section") return null;
            return (
              <li key={id}>
                <Answer question={question} value={values[id]} />
              </li>
            );
          })}
        </ul>
      );
    case "inventory":
      const visualQuestions = [];
      const auditoryQuestions =[];
      const kinestheticQuestions =[];
      survey.questions.forEach((question, idx) => {
        if (question.type === "section") return;
        const answer = values[idx];
        switch (idx % 3) {
          case 1:
            visualQuestions.push(answer);
            break;
          case 2:
            auditoryQuestions.push(answer);
            break;
          case 0:
            kinestheticQuestions.push(answer);
            break;
          default:
            break;
        }
      });
      return (
        <>
          <div className="sensory-result">
            <div>Visual:</div><div>{sensoryResults(visualQuestions)}%</div>
          </div>
          <div className="sensory-result">
            <div>Auditory:</div><div>{sensoryResults(auditoryQuestions)}%</div>
          </div>
          <div className="sensory-result">
            <div>Kinesthetic:</div><div>{sensoryResults(kinestheticQuestions)}%</div>
          </div>
        </>
      );
    default:
      return null;
  }
}

export default ReportContent;