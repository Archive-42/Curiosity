class CreateTagTopic < ActiveRecord::Migration[5.2]
  def change
    create_table :tag_topics do |t|
      t.string :tag, null: false
    end

  end
end
