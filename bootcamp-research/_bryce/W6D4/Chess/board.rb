require_relative "nullpiece"
require_relative "kk_pieces"
require_relative "rbq_pieces"
require_relative "pawn.rb"

class Board
  attr_reader :rows
  FIRST_ROW = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

  def create_back_row(color, row)
    FIRST_ROW.each_with_index do |type, i|
      pos = [row, i]
      self[pos] = type.new(color, self, pos)
    end
  end

  def fill_rows
    create_back_row(:white, 0)
    create_back_row(:green, 7)
    (0..7).each do |row|
      (0..7).each do |col|
        pos = [row, col]
        
        case row
        when 1
          self[pos] = Pawn.new(:white, self, pos)
        when 6
          self[pos] = Pawn.new(:green, self, pos)
        end
      end
    end
  end

  
  def initialize
    @sentinel = NullPiece.instance
    @rows = Array.new(8) { Array.new(8, @sentinel) }
    fill_rows
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
    self.dup.move_piece!(color, start_pos, end_pos)
  end
  
  def valid_pos?(pos)
    row, col = pos
    return true if row.between?(0, 7) && col.between?(0, 7)
    false
  end
  
  def add_piece(piece, pos)

  end
  
  def checkmate?(color)
    my_pieces = pieces.select { |piece| piece.color == color }
    in_check?(color) && my_pieces.all? { |piece| piece.valid_moves.empty? }
  end
  
  def in_check?(color) #can any of opponents pieces take your king?
    pieces.each do |piece|
      if piece.color != color
        piece.moves.any? { |move| move == find_king(color) }
      end
    end
  end
  
  def find_king(color)
    pieces.each { |piece| return piece.pos if piece.is_a?(King) && piece.color == color}
  end
  
  def pieces
    @rows.flatten.uniq - [@sentinel]
  end
  
  def dup
    duplicated = Board.new
    (0..7).each do |row|
      (0..7).each do |col|
        pos = [row, col]
        unless self[pos].empty?
          duplicated[pos] = self[pos].dup 
          duplicated[pos].board = duplicated
        end
      end
    end
    duplicated
  end
  
  def move_piece!(color, start_pos, end_pos) #move piece on actual board
    raise "No piece at start position" if self[start_pos] == @sentinel
    raise "End position is not valid" unless self.valid_pos?(end_pos)
    self[end_pos] = self[start_pos]
    self[start_pos].pos = end_pos
    self[start_pos] = @sentinel
    self
  end
  
end