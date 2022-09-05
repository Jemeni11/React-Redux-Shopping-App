const NormalizeURL = (string = "") => {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export default NormalizeURL;
