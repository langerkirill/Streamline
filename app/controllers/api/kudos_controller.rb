class Api::KudosController < ApplicationController
  def new
    @kudo = Kudo.new
  end

  def create
    @kudo = Kudo.new(kudo_params)
    @kudo.user_id = current_user.id
    if @kudo.save
      # render 'api/routes/show'
      render :show
    else
      render json: @kudo.errors.full_messages, status: :unprocessable_entity
    end
  end

  def kudo_params
    params.require(:kudo).permit(:user_id, :workout_id)
  end
end
