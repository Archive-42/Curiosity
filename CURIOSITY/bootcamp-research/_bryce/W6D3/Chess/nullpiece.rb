require_relative 'piece'
require 'singleton'

class NullPiece < Piece
  include Singleton
  
  attr_reader :symbol, :color
  
  def initialize
    @symbol = "   "
    @color = :default
  end

  def moves
  end

end