
class Pawn < Piece

  def symbol
    " ♟ "
  end

  def moves 
    forward_steps + side_attacks
  end
  
  private
  def at_start_row?
    (self.pos[0] == 1 && self.color == :white) || (self.pos[0] == 6 && self.color == :green)
  end
  
  def forward_dir
    self.color == :white ? 1 : -1
  end
  
  def forward_steps
    possible_steps = []
    steps = [[forward_dir, 0], [2 * forward_dir, 0]]
    coord = steps.map { |step| step.map.with_index { |n, idx| n + @pos[idx] }}
    coord.select! {|co| @board.valid_pos?(co)}
    
    possible_steps << coord[0] if @board[coord[0]].empty?
    if at_start_row? && possible_steps.length == 1 && @board[coord[1]].empty?
      possible_steps << coord[1]
    end
    possible_steps
  end

  
  def side_attacks
    possible_steps = []
    steps = [[forward_dir, 1], [forward_dir, -1]]
    coord = steps.map { |step| step.map.with_index { |n, idx| n + @pos[idx] }}
    
    coord.each do |sub_coord|
      next if !@board.valid_pos?(sub_coord)
      if !@board[sub_coord].empty? && @board[sub_coord].color != self.color
        possible_steps << sub_coord
      end
    end
    possible_steps
  end


end