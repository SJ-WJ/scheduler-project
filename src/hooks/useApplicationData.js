import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const openSpots = (state) => {
    const today = state.days.find((day) => day.name === state.day);
    const appointmentId = today.appointments;
    const spots = appointmentId.filter(
      (id) => state.appointments[id].interview === null
    ).length;

    return spots;
  };

  const updateOpenSpots = (state) => {
    const today = state.days.find((day) => day.name === state.day);
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    const updateSpots = { ...today };
    updateSpots.spots = openSpots(state);

    const updatedDayArr = [...state.days];
    updatedDayArr[dayIndex] = updateSpots;

    const updateState = { ...state };
    updateState.days = updatedDayArr;

    setState({
      ...state,
      appointments: updateState.appointments,
      days: updatedDayArr,
    });

    return state;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
      });
      updateOpenSpots({ ...state, appointments });
    });
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
      });
      updateOpenSpots({ ...state, appointments });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysDataURL = `/api/days`;
    const appDataURL = `/api/appointments`;
    const interviewersDataURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysDataURL),
      axios.get(appDataURL),
      axios.get(interviewersDataURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
