const setTimeFormat = (date) => {
  const dateObject = new Date(date);
  const addLeadingZero = (dateObject) => dateObject.toString().padStart(2, "0");

  const year = dateObject.getFullYear();
  const month = addLeadingZero(dateObject.getMonth() + 1);
  const day = addLeadingZero(dateObject.getDate());
  const hours = addLeadingZero(dateObject.getHours());
  const minutes = addLeadingZero(dateObject.getMinutes());
  const seconds = addLeadingZero(dateObject.getSeconds());
  return { year, month, day, hours, minutes, seconds };
};

export default setTimeFormat;
