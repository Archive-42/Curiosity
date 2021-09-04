json.extract! channel, :name, :id, :private
json.serverId channel.server_id if channel.server_id