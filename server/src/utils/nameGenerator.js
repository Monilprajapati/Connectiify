import {
    uniqueUsernameGenerator,
    adjectives,
    nouns,
  } from "unique-username-generator";
  
  const config = {
    dictionaries: [adjectives, nouns],
    separator: "",
    length: 12,
    numbers: false,
    letters: true,
    transform: "lowercase",
  };
  
  export const nameGenerator = () => {
    return uniqueUsernameGenerator(config);
  };
  