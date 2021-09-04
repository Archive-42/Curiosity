require 'colorize'
require_relative 'cursor.rb'
require_relative 'board.rb'
require_relative 'piece.rb'

class Display
  attr_accessor :cursor ###testing purposes
  attr_reader :board

  def initialize(board)
    @cursor = Cursor.new([0,0], board)
    @board = board
  end

  def render
    system("clear")
    (0..7).each do |row|
      (0..7).each do |col|
        pos = [row, col]
        if (row + col).even?
          background_color = :black
        else
          background_color = :light_black
        end
        if pos == @cursor.cursor_pos ##render the square at @cursor_pos in a different color
            if @cursor.selected
                background_color = :magenta ### cursor over tile and selected
            else
                background_color = :cyan ### cursor over tile, not selected
            end
        end
        piece = @board[pos]
        print piece.symbol.colorize(:color => piece.color, :background => background_color)
      end
      print "\n" ###start next row
    end
  end
end

############Testing
# test_board = Board.new
# test_display = Display.new(test_board)
# until false
#     test_display.render
#     test_display.cursor.get_input
# end
# test_board = Board.new
# test_display = Display.new(test_board)
# until false
#     test_display.render
# end