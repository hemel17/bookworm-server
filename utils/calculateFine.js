const calculateFine = (dueDate) => {
  const finePerHour = 0.1; // * 10 cents
  const currentDate = new Date(Date.now());

  if (currentDate > dueDate) {
    const lateHours = Math.ceil(currentDate - dueDate) / (1000 * 60 * 60);
    const fine = lateHours * finePerHour;
    return fine;
  }
  return 0;
};

export default calculateFine;
