class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)
    @follow.user_id = current_user.id
    if @follow.save
      render :show
    else
      render json: @follow.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @follows = Follow.all
    render :index
  end

  def show
    @follow = Follow.find(params[:id])
    render :show
  end

  def follow_params
    params.require(:follow).permit(:user_id, :following_id)
  end
end
