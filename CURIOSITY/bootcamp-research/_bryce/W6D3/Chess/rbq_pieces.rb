module Slideable
  HORIZONTAL_DIRS = [ 
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ]
  DIAGONAL_DIRS = [
    [1, 1], [-1, 1], [1, -1], [-1, -1]
  ]
  
  def horizontal_dirs  
    HORIZONTAL_DIRS
  end
  
  def diagonal_dirs 
    DIAGONAL_DIRS
  end

  def moves 
    all_moves = []
    move_dirs.each {|dir| all_moves += grow_unblocked_moves_in_dir(dir[0], dir[1])}
    all_moves
  end
  
  private
  def move_dirs
    
  end
  
  def grow_unblocked_moves_in_dir(dx, dy) #helper method used by moves
    coordinates = [self.pos]
    
    7.times do
      current_x, current_y = coordinates.last
      new_x, new_y = current_x + dx, current_y + dy
      possible_pos = [new_x, new_y]
      
      case possible_pos
      when !@board.valid_pos?(possible_pos), @board[possible_pos].color == self.color
        return coordinates.drop(1)
      when @board[possible_pos].is_a?(NullPiece)
        coordinates << possible_pos
      else
        coordinates << possible_pos
        return coordinates.drop(1)
      end

    end
    coordinates 
  end
end

class Rook < Piece
  include Slideable
  def symbol
    " ♜ "
  end

  def move_dirs
    horizontal_dirs
  end

end

class Bishop < Piece
  include Slideable
  def symbol
    " ♝ "
  end

  def move_dirs
    diagonal_dirs
  end

end

class Queen < Piece
  include Slideable
  def symbol
    " ♚ "
  end

  def move_dirs
    horizontal_dirs + diagonal_dirs
  end

end