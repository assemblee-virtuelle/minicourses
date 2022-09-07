const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const removeTime = dateTime => new Date(dateTime.toDateString());

module.exports = {
  addDays,
  removeTime
};
