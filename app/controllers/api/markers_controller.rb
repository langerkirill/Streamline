class Api::MarkersController < ApplicationController

  def new
    @marker = Marker.new
    # render: show
  end

  def created_routes
    user = User.find(params[:userId])
    @markers = user.markers
    render :created_routes
  end

  def index
    @markers = Marker.where(route_id: params[:route_id])
    render :index
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
    params.require(:marker).permit(:lat, :lng, :route_id, :order, :created_at)
  end
end
