
class Piece
  attr_reader :color, :pos
  attr_accessor :board

  def initialize(color, board, pos)
    @color = color
    @board = board
    @pos = pos   
  end

  def symbol
    " ♜ "
  end

  def to_s
    symbol
  end

  def empty?
    self.is_a?(NullPiece)
  end

  def valid_moves #take each of my pieces moves and look to see if any of them will avoid putting me in check
    self.moves.reject { |move| move_into_check?(move) }
  end

  def pos=(val)
    @pos = val
  end

  def move_into_check?(end_pos)
    @board.move_piece(color, pos, end_pos).in_check?(color)
  end
end