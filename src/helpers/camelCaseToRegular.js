function camelCaseToRegular(input) {
  if (typeof input === "string")
    return input
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

export default camelCaseToRegular;
