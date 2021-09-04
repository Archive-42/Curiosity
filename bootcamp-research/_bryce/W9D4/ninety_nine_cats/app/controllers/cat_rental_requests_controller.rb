class CatRentalRequestsController < ApplicationController
  before_action :cat_owner, only: [:approve, :deny]

  def approve
    debugger
    current_cat_rental_request.approve!
    redirect_to cat_url(current_cat)
  end

  def create
    @rental_request = CatRentalRequest.new(cat_rental_request_params)
    @rental_request.user_id = current_user.id
    if @rental_request.save
      redirect_to cat_url(@rental_request.cat)
    else
      flash.now[:errors] = @rental_request.errors.full_messages
      render :new
    end
  end

  def deny
    current_cat_rental_request.deny!
    redirect_to cat_url(current_cat)
  end

  def new
    @rental_request = CatRentalRequest.new
  end

  private

  def current_cat_rental_request
    @rental_request ||=
      CatRentalRequest.includes(:cat).find(params[:id])
  end

  def current_cat
    current_cat_rental_request.cat
  end

  def cat_rental_request_params
    params.require(:cat_rental_request).permit(:cat_id, :end_date, :start_date, :status)
  end

  def cat_owner
    # debugger
    cat_id = current_cat.id
    cat = current_user.cats.find_by(id: cat_id)
    if cat.nil?
      flash[:errors] = ["You are not this cat's owner"]
      redirect_to cat_url(cat_id)
    end
  end
end
