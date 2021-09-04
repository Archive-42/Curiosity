class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.integer :server_id
      t.boolean :private, null: false, default: false

      t.timestamps
    end
    add_index :channels, [:server_id, :name], unique: true
  end
end
