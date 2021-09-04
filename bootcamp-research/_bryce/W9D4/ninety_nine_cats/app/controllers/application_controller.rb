class ApplicationController < ActionController::Base
  helper_method :current_user, :login_user

  def login_user
    user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if user
      user.reset_session_token!
      session[:session_token] = user.session_token
      current_user
      redirect_to cats_url
    else
      flash.now[:errors] = ["Wrong username or password"]
      render :new
    end
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def is_user
    redirect_to cats_url unless current_user
  end
end
