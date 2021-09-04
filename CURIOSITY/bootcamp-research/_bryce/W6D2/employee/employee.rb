require "byebug"

class Employee
  attr_accessor :name, :title, :salary, :boss

  def initialize(name, title, salary, boss)
    @name = name
    @title = title
    @salary = salary
    @boss = boss
  end
  
  def bonus(multiplier)
    multiplier * @salary
  end
  
  def subordinate_salaries
    # debugger
    return 0 unless self.is_a?(Manager)
    subs_salaries = 0
    self.employees.each do |emp|
      subs_salaries += (emp.salary + emp.subordinate_salaries)
    end
    subs_salaries
  end
  
end


class Manager < Employee
  attr_reader :employees

  def initialize(name, title, salary, boss, employees)
    super(name, title, salary, boss)
    @employees = employees 
  end

  def bonus(multiplier)
    self.subordinate_salaries * multiplier
  end

end

if $PROGRAM_NAME == __FILE__
  david = Employee.new("David", "TA", 10000, nil)
  shawna = Employee.new("Shawna", "TA", 12000, nil)
  darren = Manager.new("Darren", "TA Manager", 78000, nil, [david, shawna])
  ned = Manager.new("Ned", "Founder", 1000000, nil, [darren])
  david.boss = darren
  shawna.boss = darren
  darren.boss = ned

  p ned.bonus(5) # => 500_000
  p darren.bonus(4) # => 88_000
  p david.bonus(3) # => 30_000
end
