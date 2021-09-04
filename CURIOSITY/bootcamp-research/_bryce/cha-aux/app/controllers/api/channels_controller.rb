class Api::ChannelsController < ApplicationController
  def index
    if params[:server_id]
      @channels = Channel.where(server_id: params[:server_id])
    elsif params[:dm_user_id]
      @channels = Channel.joins(:members).where(members: {id: params[:dm_user_id]})
    end
    render :index
  end

  def show
    @channel = Channel.find(params[:id])
    render :show
  end

  def create
    @channel = Channel.new(channel_params)
    @userId = current_user.id
    if @channel.save
      if @channel.private
        @channel.memberships.create({user_id: current_user.id})
        @channel.memberships.create({user_id: params[:dm_other_user_id]}) if params[:dm_other_user_id]
      else
        @channel.server.member_ids.each do |member_id|
          @channel.memberships.create({user_id: member_id})
        end
      end
      render :show
    else
      render json: @channel.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render @channel.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    channel = Channel.find(params[:id])
    channel.destroy
    redirect_to api_server_url(channel.server)
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :private, :server_id)
  end
end
