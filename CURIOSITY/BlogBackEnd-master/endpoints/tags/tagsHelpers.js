module.exports = {
  compare1,
};

// authorsid sorting function
function compare1(a, b) {
  const authorsIDA = a.authorsid;
  const authorsIDB = b.authorsid;
  let comparison = 0;

  if (authorsIDA > authorsIDB) {
    comparison = 1;
  } else if (authorsIDA < authorsIDB) {
    comparison = -1;
  }

  return comparison;
}
