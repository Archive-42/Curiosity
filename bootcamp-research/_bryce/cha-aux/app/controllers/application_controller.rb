class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  private

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def log_out
    current_user.try(:reset_token!)
    session[:session_token] = nil
    @current_user = nil
  end

  def ensure_logged_in!
    redirect_to new_session_url unless logged_in?
  end
end
