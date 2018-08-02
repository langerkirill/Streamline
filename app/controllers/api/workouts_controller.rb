class Api::WorkoutsController < ApplicationController

  def index
    if params[:user_id]
      @workouts = Workout.where(user_id: params[:user_id])
    else
      @workouts = Workout.all.includes(user: :workouts, route: :workouts, comments: :workout)
    end
    render :index
  end

  def show
    @workout = Workout.find(params[:id])
    render :show
  end

  def new
    @workout = Workout.new
    render :new
  end

  def create
    @workout = Workout.new(workout_params)
    @workout.user_id = current_user.id

    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: :unprocessable_entity
    end
  end

  def edit
    @workout = Workout.find(params[:id])
  end

  def update
    workout = Workout.find(params[:id])
    if workout.update(workout_params)
      render json: workout
    else
      render json: workout.errors.full_messages, status: 422
    end
  end

  def destroy
    workout = Workout.find(params[:id])
    if workout.author_id == current_user.id
      workout.destroy
      redirect_to workout_url
    else
      render json: "you can't delete another person's workout"
    end
    render json: ["Workout destroyed"]
  end

  private
  def workout_params
    params.require(:workout).permit(:elevation, :title, :workout_type, :duration, :miles, :date, :route_id, :user_id)
  end
end
