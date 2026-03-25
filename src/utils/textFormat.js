export const toCamelCase = (str) => {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
<<<<<<< HEAD
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
=======
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
