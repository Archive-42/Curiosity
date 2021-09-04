@pokemon.each do |poke|
  json.set! poke.id do
    json.extract! poke, :id, :name
    json.image_url image_url("pokemon_snaps/#{poke.image_url}")
    json.moves []
    json.item_ids []
  end
end
