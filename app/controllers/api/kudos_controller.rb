class Api::KudosController < ApplicationController
  def new
    @kudos = Kudos.new
  end

  def create
    kudos = Kudos.new(kudos_params)
    if kudos.save
      # render 'api/routes/show'
      render json: 'success'
    else
      render json: kudos.errors.full_messages, status: :unprocessable_entity
      render :new, status: 422
    end
  end

  def kudos_params
    params.require(:kudos).permit(:user_id, :workout_id)
  end
end
