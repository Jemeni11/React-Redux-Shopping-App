const CapitalizeString = (string = "") => {
  const stringInputArray = string.split(" ");
  const stringArray = stringInputArray.map(
    (string) => `${string[0].toLocaleUpperCase()}${string.slice(1)}`
  );
  return stringArray.join(" ");
};

export default CapitalizeString;
