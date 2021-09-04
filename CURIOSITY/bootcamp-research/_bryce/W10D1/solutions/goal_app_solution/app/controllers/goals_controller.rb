class GoalsController < ApplicationController
  before_action :require_current_user!

  def index
    @goals = current_user.goals
  end

  def show
    @goal = Goal.find(params[:id])
  end

  def new
    @goal = Goal.new
  end

  def create
    @goal = current_user.goals.new(goal_params)

    if @goal.save
      flash[:notices] = ['Goal saved!']
      redirect_to goal_url(@goal)
    else
      flash.now[:errors] = @goal.errors.full_messages
      render :new
    end
  end

  def edit
    @goal = Goal.find(params[:id])
  end

  def update
    @goal = Goal.find(params[:id])
    if @goal.update_attributes(goal_params)
      flash[:notices] = ['Goal updated!']
      if request.referer == edit_goal_url(@goal)
        redirect_to @goal
      else
        redirect_to request.referer
      end
    else
      flash[:errors] = @goal.errors.full_messages
      render :edit
    end
  end

  def destroy
    @goal = Goal.find(params[:id])
    @goal.destroy
    flash[:notices] = ['Goal deleted!']
    redirect_to goals_url
  end

  private

  def goal_params
    params.require(:goal).permit(:title, :details, :private, :completed)
  end
end
