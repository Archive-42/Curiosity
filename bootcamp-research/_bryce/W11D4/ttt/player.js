class Player {
  constructor(reader) {
    this.name = reader.question("Whats ya name gurl?", res => {
      return res;
    });
  }
}

module.exports = Player;