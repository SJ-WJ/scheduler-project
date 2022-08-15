export default function getAppointmentsForDay(state, day) {
  const appointmentInfo = [];
  for (const date of state.day) {
    if (date.name === day) {
      for (const appointment of date.appointments) {
        if (state.appointments[appointment]) {
          appointmentInfo.push(state.appointments[appointment])
        }
      }
    }
  }

  return appointmentInfo;

}