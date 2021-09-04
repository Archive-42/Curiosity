#require_relative "nullpiece"
class Piece
  attr_reader :color, :board, :pos

  def initialize(color, board, pos)
    @color = color
    @board = board
    @pos = pos   
  end

  def symbol
    return " ♜ "
  end

  def to_s

  end

  def empty?

  end

  def valid_moves

  end

  def pos=(val)

  end

  def move_into_check?(end_pos)

  end
end