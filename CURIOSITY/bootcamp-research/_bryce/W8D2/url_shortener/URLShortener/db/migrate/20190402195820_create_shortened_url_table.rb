class CreateShortenedUrlTable < ActiveRecord::Migration[5.2]
  def change
    create_table :shortened_urls do |t|
      t.string :short_url, null: false
      t.string :long_url, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :shortened_urls, :user_id

  end
end
