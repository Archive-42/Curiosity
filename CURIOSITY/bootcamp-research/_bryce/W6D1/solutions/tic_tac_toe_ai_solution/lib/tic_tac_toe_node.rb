require_relative 'tic_tac_toe'

class TicTacToeNode
  attr_reader :board, :next_mover_mark, :prev_move_pos

  # checked_moves

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board, @next_mover_mark, @prev_move_pos =
      board, next_mover_mark, prev_move_pos
  end

  # def losing_node?(evaluator)
  #   if board.over?
  #     # Note that a loss in this case is explicitly the case where the
  #     # OTHER person wins: a draw is NOT a loss. Board#won? returns
  #     # false in the case of a draw.
  #     return board.won? && board.winner != evaluator
  #   end

  #   if self.next_mover_mark == evaluator
  #     # If it's the turn of the 'evaluator', and no matter where we
  #     # move the opponent can force a loss, then this is already a
  #     # lost node.
  #     self.children.all? { |node| node.losing_node?(evaluator) }
  #   else
  #     # If it's the opponent's turn, and they have any move where they
  #     # can eventually force a loss, we assume that the opponent play
  #     # perfectly and will take that move and eventually beat us.
  #     self.children.any? { |node| node.losing_node?(evaluator) }
  #   end
  # end

  def losing_node?(evaluator)
    if self.board.tied? || self.board.winner == evaluator
        return false
    elsif self.board.over? && self.board.winner != evaluator
      return true
    end

    kids = self.children
    # debugger
    if next_mover_mark == evaluator
      return kids.all? {|kid| kid.losing_node?(evaluator)}
    else
      return kids.any? {|kid| kid.losing_node?(evaluator)}
    end   
     
  end

  def winning_node?(evaluator)
    if board.over?
      # If the game is over and we've won, then this is a winning
      # node.
      return board.winner == evaluator
    end

    if self.next_mover_mark == evaluator
      # If we can place any mark and eventually proceed to force a
      # win, then this is a winning node.
      self.children.any? { |node| node.winning_node?(evaluator) }
    else
      # If it's the opponent's turn, and no matter where they move
      # we'll still be able to force a win, then this is a winning
      # node.
      self.children.all? { |node| node.winning_node?(evaluator) }
    end
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    children = []

    (0..2).each do |row_idx|
      (0..2).each do |col_idx|
        pos = [row_idx, col_idx]

        # Can't move here if it's not free
        next unless board.empty?(pos)

        new_board = board.dup
        new_board[pos] = self.next_mover_mark
        next_mover_mark = (self.next_mover_mark == :x ? :o : :x)

        children << TicTacToeNode.new(new_board, next_mover_mark, pos)
      end
    end

    children
  end
end


require_relative 'tic_tac_toe'
require 'byebug'
class TicTacToeNode
  attr_accessor :board, :next_mover_mark, :prev_move_pos, :checked_moves

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    self.board = board
    self.next_mover_mark = next_mover_mark
    self.prev_move_pos = prev_move_pos
    @checked_moves = [prev_move_pos]
  end

  def losing_node?(evaluator)
    if self.board.tied? || self.board.winner == evaluator
        return false
    elsif self.board.over? && self.board.winner != evaluator
      return true
    end

    kids = self.children
    # debugger
    if next_mover_mark == evaluator
      return kids.all? {|kid| kid.losing_node?(evaluator)}
    else
      return kids.any? {|kid| kid.losing_node?(evaluator)}
    end   
     
  end
   
  def winning_node?(evaluator)
    return true if self.board.over? && self.board.winner == evaluator  
    kids = self.children

    if next_mover_mark != evaluator
      kids.all? {|kid| kid.winning_node?(evaluator)}
    else
      kids.any? {|kid| kid.winning_node?(evaluator)}
    end   
  end

  

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    magic_board = board.dup
    current_moves = valid_moves(magic_board)
    children_arr = []
    magic_board = board.dup
    current_moves.each do |pos|
        magic_board[pos] = next_mover_mark
        n_node = TicTacToeNode.new(magic_board, change_mark(next_mover_mark), pos)
        children_arr << n_node
    end
    children_arr
  
  end

  def valid_moves(board)
    output = []

    board.rows.each_with_index do |row, i_1|
      row.each_with_index do |pos, i_2| 
        if !@checked_moves.include?([i_1, i_2]) && pos.nil?
          output << [i_1, i_2]
          @checked_moves << [i_1, i_2]
        end
      end
    end
    
    output
  end

  def change_mark(mark)
    if mark == :x
      mark = :o
    else
      mark = :x
    end
    mark
  end
  
end