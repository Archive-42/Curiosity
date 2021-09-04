
module Stepable
  def moves #populate an array with actual coordinates of possible positions
    coordinates = []
    move_diffs.each do |diff|
      current_x, current_y = self.pos
      dx, dy = diff
      new_x, new_y = current_x + dx, current_y + dy
      
      possible_pos = [new_x, new_y]
      if @board.valid_pos?(possible_pos) && @board[possible_pos].color != self.color
        coordinates << possible_pos 
      end
    end
    coordinates
  end

  private
  def move_diffs # overwritten by specific piece
    # do we need to return an empty array here?
  end
end

class Knight < Piece
  include Stepable

  def symbol
    " ♞ "
  end

  protected
  def move_diffs
    [
      [1, 2],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [2, 1],
      [-2, -1],
      [-2, 1],
      [2, -1],
    ]
  end
end

class King < Piece
  include Stepable
  
  def symbol
    " ♚ "
  end

  protected
  def move_diffs
    [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]
  end
end