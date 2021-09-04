class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if user
      log_in_user!(user)
      redirect_to bands_url
    else
      flash.now[:errors] = "Invalid login information"
      render :new
    end
  end

  def destroy
    log_out!
    render :new
  end
end
