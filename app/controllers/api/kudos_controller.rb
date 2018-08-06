class Api::KudosController < ApplicationController
  def new
    @kudo = Kudo.new
  end

  def create
    kudo = Kudo.new(kudo_params)
    if kudo.save
      # render 'api/routes/show'
      render json: 'success'
    else
      render json: kudo.errors.full_messages, status: :unprocessable_entity
      render :new, status: 422
    end
  end

  def kudo_params
    params.require(:kudo).permit(:user_id, :workout_id)
  end
end
