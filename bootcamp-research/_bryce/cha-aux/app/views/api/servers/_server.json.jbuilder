json.extract! server, :name, :id, :owner_id, :private
json.icon_image url_for(server.icon_image)
json.channelIds server.channels.pluck(:id)