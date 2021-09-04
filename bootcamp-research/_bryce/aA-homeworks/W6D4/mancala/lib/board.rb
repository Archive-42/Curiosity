require 'byebug'

class Board
  attr_accessor :cups

  def initialize(name1, name2)
    @cups = Array.new(14) {Array.new}
    self.place_stones
    @name1 = name1
    @name2 = name2
  end

  def place_stones
    # helper method to #initialize every non-store cup with four stones each
    (0..13).each { |idx| self.cups[idx] = [:stone, :stone, :stone, :stone]unless [6, 13].include?(idx)}  
  end

  def valid_move?(start_pos)
    valid_range = (0..5).to_a + (7..12).to_a
    raise "Invalid starting cup" unless valid_range.include?(start_pos)
    raise "Starting cup is empty" if self.cups[start_pos].empty?
    true
  end

  def make_move(start_pos, current_player_name)
    current_stones, cups[start_pos] = cups[start_pos], []
    idx = start_pos
    current_player_name == @name1 ? side = 1 : side = 2
    until current_stones.empty?
      idx = (idx + 1) % 14
      if ((side == 1 && idx != 13) || (side == 2 && idx != 6))
        self.cups[idx] << current_stones.shift
      end
    end
    render
    next_turn(idx)
  end

  def next_turn(ending_cup_idx)
    # helper method to determine whether #make_move returns :switch, :prompt, or ending_cup_idx
    return :prompt if [6, 13].include?(ending_cup_idx)
    return :switch if self.cups[ending_cup_idx].length == 1
    ending_cup_idx
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    side1 = (0..5).to_a
    side2 = (7..12).to_a
    side1.all? {|idx| self.cups[idx].empty?} || side2.all? {|idx| self.cups[idx].empty?}
  end

  def winner
    case self.cups[6].length <=> self.cups[13].length
    when -1
      @name2
    when 0
      :draw
    when 1
      @name1
    end
  end
end
