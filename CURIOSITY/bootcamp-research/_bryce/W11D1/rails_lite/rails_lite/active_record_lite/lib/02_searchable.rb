require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    criteria = params.keys.join(" = ? AND ").concat(" = ?")
    values = params.values 
    matches = DBConnection.execute(<<-SQL, *values)
      SELECT 
        *
      FROM
        #{table_name}
      WHERE
        #{criteria}
    SQL
    parse_all(matches)
  end
end

class SQLObject
  extend Searchable
end
