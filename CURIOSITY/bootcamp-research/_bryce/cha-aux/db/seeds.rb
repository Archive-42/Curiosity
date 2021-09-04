# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
require 'faker'
# require 'database_cleaner'

# DatabaseCleaner.clean_with(:truncation)

Membership.destroy_all
Server.destroy_all
User.destroy_all

bryce = User.create({username: 'Bryce', email: 'bryce@gmail.com', password: 'notpassword'})
bryce.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/bryce_headshot.jpg'), filename:'bryce_icon.jpg')
gaben = User.create({username: 'GabeN', email: 'GabeN@gmail.com', password: 'password'})
gaben.icon_image.attach(io: open(Faker::Avatar.image(nil,"50x50")), filename:"#{gaben.username}_icon.jpg")
zegyr = User.create({username: 'Zegyr', email: 'ryon@gmail.com', password: 'password'})
zegyr.icon_image.attach(io: open(Faker::Avatar.image(nil,"50x50")), filename:"#{zegyr.username}_icon.jpg")
chaos = User.create({username: 'Chaos', email: 'chaos@gmail.com', password: 'password'})
chaos.icon_image.attach(io: open(Faker::Avatar.image(nil,"50x50")), filename:"#{chaos.username}_icon.jpg")
durango = User.create({username: 'Durango', email: 'durango@gmail.com', password: 'password'})
durango.icon_image.attach(io: open(Faker::Avatar.image(nil,"50x50")), filename:"#{durango.username}_icon.jpg")
jason = User.create({username: 'Jason', email: 'citronator@gmail.com', password: 'password'})
jason.icon_image.attach(io: open(Faker::Avatar.image(nil,"50x50")), filename:"#{jason.username}_icon.jpg")
justin = User.create({username: 'Justin', email: 'kanman@twitch.tv', password: 'password'})
justin.icon_image.attach(io: open(Faker::Avatar.image(nil,"50x50")), filename:"#{justin.username}_icon.jpg")
emmett = User.create({username: 'Emmett', email: 'shearbear@twitch.tv', password: 'password'})
emmett.icon_image.attach(io: open(Faker::Avatar.image(nil,"50x50")), filename:"#{emmett.username}_icon.jpg")

User.all.each do |user|
  user.owned_servers.create({name: 'Home', private: true})
  user.owned_servers.first.memberships.create({user_id: user.id})
  user.owned_servers.first.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/default_icon.png'), filename:'default_icon.png')
end

aa = Server.create({name: 'App Academy', owner_id: bryce.id, private: false})
aa.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/aa_icon.png'), filename:'aa_icon.png')
albion_online = Server.create({name: 'Albion Online', owner_id: gaben.id, private: false})
albion_online.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/albion_online_icon.png'), filename:'albion_online_icon.png')
assassins_creed = Server.create({name: "Assassin's Creed", owner_id: gaben.id, private: false})
assassins_creed.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/assassins_creed_icon.png'), filename:'assassins_creed_icon.png')
darkest_dungeon = Server.create({name: "Darkest Dungeon", owner_id: gaben.id, private: false})
darkest_dungeon.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/darkest_dungeon_icon.png'), filename:'darkest_dungeon_icon.png')
everyday = Server.create({name: 'Everyday Room', owner_id: zegyr.id, private: true})
everyday.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/everyday_icon.jpg'), filename:'everyday_icon.jpg')
for_honor = Server.create({name: "For Honor", owner_id: gaben.id, private: false})
for_honor.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/for_honor_icon.png'), filename:'for_honor_icon.png')
fortnite = Server.create({name: "Fortnite", owner_id: gaben.id, private: false})
fortnite.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/fortnite_icon.png'), filename:'fortnite_icon.png')
got = Server.create({name: 'Game of Thrones', owner_id: zegyr.id, private: false})
got.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/got_icon.jpg'), filename:'got_icon.jpg')
hearthstone = Server.create({name: "Hearthstone", owner_id: gaben.id, private: false})
hearthstone.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/hearthstone_icon.png'), filename:'hearthstone_icon.png')
maplestory_2 = Server.create({name: "MapleStory 2", owner_id: gaben.id, private: false})
maplestory_2.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/maplestory_2_icon.png'), filename:'maplestory_2_icon.png')
mortal_kombat = Server.create({name: "Mortal Kombat", owner_id: gaben.id, private: false})
mortal_kombat.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/mortal_kombat_icon.png'), filename:'mortal_kombat_icon.png')
mtga = Server.create({name: 'Magic the Gathering: Arena', owner_id: chaos.id, private: false})
mtga.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/mtga_icon.png'), filename:'mtga_icon.png')
overwatch = Server.create({name: "Overwatch", owner_id: gaben.id, private: false})
overwatch.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/overwatch_icon.png'), filename:'overwatch_icon.png')
poe = Server.create({name: "Path of Exile", owner_id: gaben.id, private: false})
poe.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/poe_icon.png'), filename:'poe_icon.png')
runescape = Server.create({name: "Runescape", owner_id: gaben.id, private: false})
runescape.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/runescape_icon.png'), filename:'runescape_icon.png')
rust = Server.create({name: "Rust", owner_id: gaben.id, private: false})
rust.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/rust_icon.png'), filename:'rust_icon.png')
wow = Server.create({name: "World of Warcraft", owner_id: gaben.id, private: false})
wow.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/wow_icon.png'), filename:'wow_icon.png')

# Server.all.each {|server| server.memberships.create({user_id: gaben.id})}
Server.all.each {|server| server.channels.create({name: 'general'})}

[bryce, zegyr, chaos, durango, jason, justin, emmett].each do |user|
  aa.memberships.create({user_id: user.id})
  aa.channels.each do |channel|
    channel.memberships.create({user_id: user.id})
  end
  mtga.memberships.create({user_id: user.id})
  mtga.channels.each do |channel|
    channel.memberships.create({user_id: user.id})
  end
end

[bryce, zegyr, chaos].each do |user|
  everyday.memberships.create({user_id: user.id})
  everyday.channels.each do |channel|
    channel.memberships.create({user_id: user.id})
  end
end

[bryce, zegyr, durango, jason].each do |user|
  got.memberships.create({user_id: user.id})
  got.channels.each do |channel|
    channel.memberships.create({user_id: user.id})
  end
end