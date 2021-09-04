require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    class_name.constantize
  end

  def table_name
    model_class.table_name 
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    @foreign_key = options[:foreign_key] || (name.to_s + "Id").underscore.to_sym
    @primary_key = options[:primary_key] || :id
    @class_name = options[:class_name] || name.to_s.singularize.camelcase
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    @foreign_key = options[:foreign_key] || self_class_name.to_s.concat("Id").underscore.to_sym
    @primary_key = options[:primary_key] || :id
    @class_name = options[:class_name] || name.to_s.singularize.camelcase
  end
end

module Associatable
  #attr_accessor :options
  # Phase IIIb
  def belongs_to(name, options = {})
    options = BelongsToOptions.new(name, options)
    define_method(name) do 
      fk = options.foreign_key.to_s
      model = options.model_class
      fk_val = self.send(fk)
      model.where({options.primary_key => fk_val}).first
    end
    assoc_options[name] = options 
end

  def has_many(name, options = {})
    options = HasManyOptions.new(name, table_name.singularize.camelcase, options)
    define_method(name) do 
      pk = options.primary_key.to_s
      model = options.model_class
      primary_val = self.send(pk)
      model.where({options.foreign_key => primary_val})
    end
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
    @options ||= {}
    return @options 
  end
end

class SQLObject
  extend Associatable 
end
