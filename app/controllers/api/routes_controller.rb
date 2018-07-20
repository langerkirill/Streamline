class Api::RoutesController < ApplicationController

  def index
    @routes = Route.all.includes(:workouts)
    render :index
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
    @workout = Workout.find_by(route_id: @route.id)
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
    params.require(:route).permit(:startlat, :startlong, :endlat, :endlong, :miles, :duration, :elevation, :user_id, :route_type, :name)
  end
end
