class Api::MarkersController < ApplicationController

  def new
    @marker = Marker.new
    # render: show
  end

  def create
    marker = Marker.new(marker_params)
    if marker.save
      # render 'api/routes/show'
      render json: 'success'
    else
      render json: marker.errors.full_messages, status: :unprocessable_entity
      render :new, status: 422
    end
  end

  def show
    @marker = Marker.find(params[:id])
    render :show
  end

  def marker_params
    params.require(:marker).permit(:lat, :lng, :route_id)
  end
end
