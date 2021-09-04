class BandsController < ApplicationController
  before_action :ensure_logged_in, except: [:index]

  def index
    @bands = Band.all
    render :index
  end

  def create
    @band = Band.new(band_params)
    if @band.save
      redirect_to band_url(@band)
    else
      flash.now[:errors] = @band.errors.full_messages
      render :new
    end
  end

  def new
    @band = Band.new
    render :new
  end

  def edit
    @band = Band.find_by(id: params[:id])
    if @band
      render :edit
    else
      flash[:errors] = "Invalid band"
      redirect_to bands_url
    end
  end

  def show
    @band = Band.includes(:albums).find_by(id: params[:id])
    if @band
      render :show
    else
      flash[:errors] = "Invalid band"
      redirect_to bands_url
    end
  end

  def update
    @band = Band.find(params[:id])
    if @band.update(band_params)
      render :show
    else
      flash.now[:errors] = @band.errors.full_messages
      render :edit
    end
  end

  def destroy
    band = Band.find(params[:id])
    band.destroy
    redirect_to bands_url
  end

  private

  def band_params
    params.require(:band).permit(:name)
  end
end
