import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const evaluators = props.interviewers.map((evaluator) => {
    console.log("check", props.interviewers);
    return (
      <InterviewerListItem
        key={evaluator.id}
        name={evaluator.name}
        avatar={evaluator.avatar}
        selected={evaluator.id === props.interviewer}
        setInterviewer={() => {props.setInterviewer(evaluator.id)}}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{evaluators}</ul>
    </section>
  )
}