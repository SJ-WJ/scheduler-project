export default function getAppointmentsForDay(state, day) {
  const appointmentInfo = [];
  console.log("state", state);
  for (const date of state.days) {
    if (date.name === day) {
      console.log("date", date);
      for (const appointment of date.appointments) {
        if (state.appointments[appointment]) {
          appointmentInfo.push(state.appointments[appointment]);
        }
      }
    }
  }

  return appointmentInfo;
}
