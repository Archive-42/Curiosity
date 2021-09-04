## Level 1
 - comment out `sudoku.rb` line 15

## Level 2
 - swap variable names pos and val in `sudoku.rb` lines 51 and 52

 ## Level 3
 - swap references to pos and val in get_pos and get_val methods in `sudoku.rb` lines 13-39

 ## Level 4
 - change filename in `sudoku.rb` line 82 to `sudoku1.txt`

 ## Level 5
 - remove leading newlines from `sudoku1.txt`

 ## Level 6
 - add `game.run` to `sudoku.rb` line 83

 ## Level 7
 - board class is missing

 ## Level 8
 - remove extra `end` from `board.rb` line 58

 ## Level 9
 - add `board.render` to `sudoku.rb` line 54 (and change terrible names)

 ## Level 10
 - `require "colorize"`
 - add an `end` to the `Tile` class
 (ideally break apart into three files)

 ## Level 11
 - change `split(" ")` to `split("")` in `board.rb` line 13

 ## Final Level
 - `@board = board` in `initialize` of `sudoku.rb` line 13
 - remove `method_missing` from `sudoku.rb`
 - `raise` error in `sudoku.rb` `get_pos` if not valid pos
 - remove `alias_method` from `board.rb`
 - add `rows` method to `board.rb`

 ## Super Evil Level
 #### sudoku.rb
 - remove `puts` at beginning
 - change `self.from_file` to `Board.from_file` in `self.from_file` method
 - change `[[]]` to `board` in `initialize`
 - remove `method_missing`
 - add `.chomp` to `gets` in `get_pos`
 - `raise` error in `get_pos` if not valid pos
 - remove "TODO" from `get_pos`
 - create `parse_pos` and `parse_val` methods
 - add `.chomp` to `gets` in `get_val`
 - remove `*` from `board[*pos]` in `play_turn`
 - remove conditional from `valid_pos?`, keeping content of `if` portion, removing `else` and content
 - change `:Array` to `Array`, `=` to `==`, and `.in?` to `.between?` in `valid_pos?`
 - change `||` to `&&` in `valid_val?`
 - add `game.run` to end
 #### board.rb
 - make `attr_reader :grid` `private`
 - remove `@grid = ` from `self.empty_grid`
 - change `"filename"` to `filename`, `:chomp` to `&:chomp`, `parseInt` to `Integer`, and `Tle` to `Tile` in `self.from_file`
 - change `pos = x,y` to `x, y = pos` in `[](pos)`
 - change `new_value` to `value` in `[]=(pos, value)`
 - change `transpose!` to `transpose` in `columns`
 - interpolate contents of puts in `render` : `puts " #{(0..8).to_a.join(" ")}"`
 - create `rows` method that returns `grid`
 - remove `alias_method`
 - add `.to_a` to range in `solved_set?`
 - swap `i` and `j` in enumerators of `square` and change `self[i, j]` to `self[[i, j]]`
 - change `.each` to `.map` in `squares`
 #### sudoku1.txt
 - remove leading newlines