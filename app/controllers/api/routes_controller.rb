class Api::RoutesController < ApplicationController

  def index
    @routes = Route.all.includes()
    render :index
  end

  def update
    @route = Route.find(params[:id])
    if @route.update(route_params)
      render 'api/routes/show'
    else
      render json: ['something went wrong'], status: 422
    end
  end

  def show
    @route = Route.find(params[:id])
    render :show
  end

  def create
    route = Route.new(route_params)
    if route.save
      render :show
    else
      render json: route.errors.full_messages, status: :unprocessable_entity
      render :new, status: 422
    end
  end

  private
  def route_params
    params.require(:route).permit(:startlat, :startlong, :endlat, :endlong)
  end
end
