require 'open-uri'

class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      @user.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/default_icon.png'), filename:'default_icon.png')
      @user.owned_servers.create({name: 'Home', private: true})
      @user.owned_servers.first.memberships.create({user_id: @user.id})
      @user.owned_servers.first.icon_image.attach(io: open('https://s3.amazonaws.com/cha-aux-seeds/default_icon.png'), filename:'default_icon.png')
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

end
