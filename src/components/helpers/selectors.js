export function getAppointmentsForDay(state, day) {
  const appointmentInfo = [];
  for (const date of state.days) {
    if (date.name === day) {
      for (const appointment of date.appointments) {
        if (state.appointments[appointment]) {
          appointmentInfo.push(state.appointments[appointment]);
        }
      }
    }
  }

  return appointmentInfo;
}

export function getInterview(state, interview) {
  const interviewInfo = {};
  if (interview) {
    interviewInfo["student"] = interview.student;
    interviewInfo["interviewer"] = state.interviewers[interview.interviewer];
  } else {
    return null;
  }
  return interviewInfo;
}

export function getInterviewersForDay(state, day) {

  const currentDay = state.days.find((date) => date.name === day);
  if (currentDay) {
    return currentDay.interviewers.map((id) => state.interviewers[id]);
  }

  return [];
}
