
class Pawn < Piece

  def symbol
    
  end

  def move_dirs

  end

  private
  def at_start_row?
    (self.pos[0] == 1 && self.color == :white) || (self.pos[0] == 6 && self.color == :green)
  end

  def forward_dir
    self.color == :white ? 1 : -1
  end

  def forward_steps
    # check if end pos is empty
    # check if first move
    # 

  end

  def side_attacks

  end

end