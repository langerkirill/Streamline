class Api::LikesController < ApplicationController
  def new
    @like = Like.new
    # render: show
  end

  def create
    like = Like.new(like_params)
    if like.save
      render json: 'success'
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
      render :new, status: 422
    end
  end

  def like_params
    params.require(:like).permit(:user_id, :workout_id)
  end
end
