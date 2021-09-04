require_relative 'db_connection'
require 'active_support/inflector'
require 'byebug'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    
    @columns ||= DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        "#{table_name}"
      LIMIT 
        0
    SQL
    
    @columns.flatten.map(&:to_sym)
  end

  def self.finalize!
    columns.each do |col|
      define_method(col) do 
        self.attributes[col]
      end
      define_method("#{col}=") do |new_val|
        self.attributes[col] = new_val
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name || self.to_s.tableize
  end

  def self.all
    rows = DBConnection.execute(<<-SQL)
      SELECT 
        *
      FROM
        "#{table_name}"
    SQL
    parse_all(rows)
  end

  def self.parse_all(results)
    results.map do |row|
      self.new(row)
    end
  end

  def self.find(id)
    result = DBConnection.execute(<<-SQL, id: id)
      SELECT
        *
      FROM
        "#{table_name}"
      WHERE
        id = :id
    SQL
    return nil if result.empty?
    self.new(result.first)
  end

  def initialize(params = {})
    params.keys.each do |key|
      raise "unknown attribute '#{key}'" unless self.class.columns.include?(key.to_sym)
      self.send("#{key}=", params[key])
    end

  end

  def attributes
    @attributes ||= {}

  end

  def attribute_values
    self.class.columns.map do |col|
      attributes[col]
    end
  end

  def insert
    col_names = self.class.columns.join(", ")
    question_marks = []
    self.class.columns.length.times do 
      question_marks << "?"
    end
    question_marks = question_marks.join(", ")
    values = attribute_values
    #debugger
    DBConnection.execute(<<-SQL, *values)
    INSERT INTO 
      #{self.class.table_name} (#{col_names})
    VALUES
      (#{question_marks})
    SQL
    @attributes[:id] = DBConnection.last_insert_row_id
  end
  
  def update
    col_names = self.class.columns.join(" = ?, ").concat(" = ?")
    values = attribute_values
    DBConnection.execute(<<-SQL, *values)
      UPDATE
        #{self.class.table_name}
      SET
        #{col_names}
      WHERE
        id = #{self.id}
    SQL
    
  end

  def save
    if self.attributes[:id].nil?
      self.insert
    else
      self.update
    end
  end
end
