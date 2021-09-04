class AddTimestampsToPolls < ActiveRecord::Migration[5.2]
  def change
    change_table :polls do |t|
      t.timestamps
    end
  end
end
