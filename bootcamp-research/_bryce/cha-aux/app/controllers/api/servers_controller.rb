require 'open-uri'

class Api::ServersController < ApplicationController
  def index
    if params[:joined]
      @servers = current_user.joined_servers
    else
      @servers = Server.where(private: false) + (current_user.joined_servers)
    end
    render :index
  end

  def show
    @server = Server.find(params[:id])
    render :show
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    if @server.save {
      @server.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/default_icon.png'), filename:'default_icon.png') unless @server.icon_image.attached?
      @server.memberships.create({user_id: current_user.id})
      general = @server.channels.create({name: 'general'})
      general.memberships.create({user_id: current_user.id})
      render :show
    }
    else
      render json: @server.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @server = Server.find(params[:id])
    if params[:newMemberId]
      @newMemberId = params[:newMemberId]
      @server.memberships.create({user_id: @newMemberId})
      @server.channels.where(private: false).each do |channel|
        channel.memberships.create({user_id: @newMemberId})
      end
      render :show
    else (
      if @server.update(server_params)
        render :show
      else
        render @server.errors.full_messages, status: :unprocessable_entity
      end
    )
    end
  end

  def destroy
    server = Server.find(params[:id])
    server.destroy
    redirect_to :servers
  end

  private

  def server_params
    params.require(:server).permit(:name, :owner_id, :private, :icon_image)
  end
end
