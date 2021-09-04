
export class ColumnWinInspector {
  constructor(column) {
    this.column = column;
  }
  inspect() {
    let count = 1;
    for (let i = 0; i < this.column.columnTokens.length; i++) {
      let value = this.column.columnTokens;
      if ((value[i] !== '') && (value[i] === value[i + 1])) {
        count++
        if (count === 3) {
          // console.log(value[i], "winner inside inspector method", count);
          return value[i];
        }
      } else {
        count = 0;
      }
    }
    return 0;
  }
}