class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.references    :joinable, polymorphic: true, index: true
      t.integer       :user_id, null: false
      t.timestamps
    end
    add_index :memberships, :user_id
    add_index :memberships, [:joinable_id, :user_id, :joinable_type], unique: true
  end
end
