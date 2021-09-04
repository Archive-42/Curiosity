class AddUniqueToShortUrl < ActiveRecord::Migration[5.2]
  def change
    change_column :shortened_urls, :short_url, :string, unique: true
  end
end
