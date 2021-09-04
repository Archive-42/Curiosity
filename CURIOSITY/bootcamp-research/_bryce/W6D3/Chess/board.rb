require_relative "nullpiece"
require_relative "kk_pieces"
class Board
  attr_reader :rows
  
  def self.create_board
    rows = Array.new(8) { Array.new(8) }
    (0..7).each do |row|
      (0..7).each do |col|
        pos = [row, col]

        case row
        when 0, 1
          new_piece = Piece.new(:white, self, pos)
        when 6, 7
          new_piece = Piece.new(:green, self, pos)
        else
          new_piece = NullPiece.instance 
        end
          
        rows[row][col] = new_piece
      end
    end
    rows
  end

  def initialize
    @rows = Board.create_board
    @sentinel = NullPiece.instance
  end

  def [](pos)
    row, col = pos
    @rows[row][col]
  end

  def []=(pos, val)
    row, col = pos
    @rows[row][col] = val
  end

  def move_piece(color, start_pos, end_pos)
    # dup board first
    raise "No piece at start position" if self[start_pos] == @sentinel
    raise "End position is not valid" unless self.valid_pos?(end_pos)
    self[end_pos] = self[start_pos]
    self[start_pos].pos = end_pos
    self[start_pos] = @sentinel
  end

  def valid_pos?(pos)
    row, col = pos
    return true if row.between?(0, 7) || col.between?(0, 7)
    false
  end

  def add_piece(piece, pos)
  end

  def checkmate?(color)
  end

  def in_check?(color)
  end

  def find_king(color)
  end

  def pieces
  end

  def dup
  end

  def move_piece!(color, start_pos, end_pos) #move piece on actual board
  end
  
end