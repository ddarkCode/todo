export const formatDate = (date) => {
  const newdate = new Date(date);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return {
    date: newdate.toLocaleDateString('en-US', options),
    time: newdate.toLocaleTimeString(),
  };
};
