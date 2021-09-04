class Array

  def pick_stock
    profit = 0
    dates = nil

    (0...self.length-1).each do |buy_date|
      (buy_date+1...self.length).each do |sell_date|
        potential_profit = self[sell_date] - self[buy_date]
        if potential_profit > profit
          profit = potential_profit
          dates = [buy_date, sell_date]
        end
      end
    end

    dates
  end

end