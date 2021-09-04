class Simon
  COLORS = %w(red blue green yellow)

  attr_accessor :sequence_length, :game_over, :seq, :another_game

  def initialize
    @sequence_length = 1
    @game_over = false
    @seq = []
    @another_game = true
  end

  def play
    while self.another_game
      self.another_game = false
      until self.game_over
        self.take_turn
      end
      self.game_over_message
      self.reset_game if self.play_again?
    end
    puts "Thanks for playing!"
    sleep(2)
  end

  def take_turn
    self.show_sequence
    self.require_sequence
    unless self.game_over
      self.round_success_message
      self.sequence_length += 1
    end
  end

  def show_sequence
    self.add_random_color
    system("clear")
    puts "The current sequence is: #{self.seq}"
    sleep(2)
    system("clear")
  end

  def require_sequence
    num_guessed = 0
    until num_guessed == self.sequence_length
      print "Enter the next color: "
      input = gets.chomp
      unless input == self.seq[num_guessed]
        self.game_over = true
        return
      end
      num_guessed += 1
    end
  end

  def add_random_color
    self.seq << COLORS.sample
  end

  def round_success_message
    puts "Round complete. Nice job!"
    sleep(2)
  end

  def game_over_message
    puts "Game Over!"
    sleep(3)
  end

  def reset_game
    self.sequence_length = 1
    self.game_over = false
    self.seq = []
  end

  def play_again?
    begin
      puts "Would you like to play again? y/n"
      response = gets.chomp.downcase
      raise InvalidResponse.new("Please only input y or n") unless ["y", "n"].include?(response)
    rescue InvalidResponse => error
      system("clear")
      puts error.message
      retry
    end
    if response == "y"
      self.another_game = true
    else
      self.another_game = false
    end
    self.another_game
  end
end

class InvalidResponse < StandardError; end
