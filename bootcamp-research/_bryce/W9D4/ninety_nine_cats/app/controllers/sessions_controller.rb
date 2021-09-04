class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new, :create]

  def new
    render :new
  end

  def create
    login_user
  end

  def destroy
    if !!current_user
      current_user.reset_session_token!
      session[:session_token] = nil
      @current_user = nil
    end
    redirect_to cats_url
  end

  def redirect_if_logged_in
    if current_user
      redirect_to cats_url
    end
  end
end
