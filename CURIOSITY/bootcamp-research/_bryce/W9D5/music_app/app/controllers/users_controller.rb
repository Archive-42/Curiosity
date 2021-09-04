class UsersController < ApplicationController
  def new
    # @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    # debugger
    if @user.save
      log_in_user!(@user)
      redirect_to bands_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      flash[:errors] = "Invalid user"
      redirect_to new_session_url #####CHANGE THIS TO INDEX WHEN IMPLEMENTED
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
