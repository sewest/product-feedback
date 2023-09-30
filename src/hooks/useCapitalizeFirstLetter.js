// Capitalize the first letter of a string
export default function useCapitalizeFirstLetter() {
  const capitalizeFirstLetter = (str) => {
    if (str === "ux" || str === "ui") {
      return str.toUpperCase();
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return capitalizeFirstLetter;
}
