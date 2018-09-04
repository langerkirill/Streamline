class Api::FollowsController < ApplicationController
  def index
    @follows = Follow.all
    render :index
  end

  def show
    @follow = Follow.find(params[:id])
    render :show
  end

  def update
    @follow = Follow.find(params[:id])
    # @follow.follows << current_user
    render :show
  end
end
