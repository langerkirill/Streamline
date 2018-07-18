class Api::RoutesController < ApplicationController

  def index
    debugger
    @routes = Route.all.includes(:workouts)
    render :index
  end

  def created_routes
    debugger
    @routes = Route.all(user: :markers)
  end

  def update
    @route = Route.find(params[:id])
    if @route.update(route_params)
      render "api/routes/#{route.id}"
    else
      render json: ['something went wrong'], status: 422
    end
  end

  def show

    @route = Route.find(params[:id])
    render :show
  end

  def create
    @route = Route.new(route_params)

    if @route.save

      render :show
    else
      render json: route.errors.full_messages, status: :unprocessable_entity
    end
  end

  def route_params
    params.require(:route).permit(:startlat, :startlong, :endlat, :endlong, :miles, :duration, :elevation, :user_id, :route_type)
  end
end
