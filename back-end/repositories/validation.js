function isValidName(name) {
  const nameRegex = /^[A-Z][a-z]+$/;
  return nameRegex.test(name);
}

function isValidGrade(grade) {
  return grade >= 1 && grade <= 6;
}

module.exports = {
  isValidName,
  isValidGrade,
};
