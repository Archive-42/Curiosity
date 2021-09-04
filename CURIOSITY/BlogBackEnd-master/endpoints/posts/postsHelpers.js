module.exports = {
  isTagsFieldArray,
  validateTag,
};

function isTagsFieldArray(tagsField) {
  const isArray = Array.isArray(tagsField);
  return isArray;
}

// validate that tags are or are not an array, are they all one of eight available tags
// tags are case insensitive
// available tags:  culture, design, health, history, politics, science, startups, tech
function validateTag(tagsField) {
  const isArray = isTagsFieldArray(tagsField);

  if (isArray === true) {
    for (let x = 0; x < tagsField.length; x++) {
      tagsField[x] = tagsField[x].toLowerCase();
      if (
        tagsField[x] !== "culture" &&
        tagsField[x] !== "design" &&
        tagsField[x] !== "health" &&
        tagsField[x] !== "history" &&
        tagsField[x] !== "politics" &&
        tagsField[x] !== "science" &&
        tagsField[x] !== "startups" &&
        tagsField[x] !== "tech"
      ) {
        // if invalid tag, return false
        return false;
      }
    }
    return true;
  } else if (isArray === false) {
    tagsField[x] = tagsField[x].toLowerCase();

    if (
      tagsField !== "culture" &&
      tagsField !== "design" &&
      tagsField !== "health" &&
      tagsField !== "history" &&
      tagsField !== "politics" &&
      tagsField !== "science" &&
      tagsField !== "startups" &&
      tagsField !== "tech"
    ) {
      // if invalid tag, return false
      return false;
    } else {
      // else return false
      return true;
    }
  }
}
