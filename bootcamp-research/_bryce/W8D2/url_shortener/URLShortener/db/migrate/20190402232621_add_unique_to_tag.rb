class AddUniqueToTag < ActiveRecord::Migration[5.2]
  def change
    add_index :tag_topics, :tag, unique: true
  end
  
end
