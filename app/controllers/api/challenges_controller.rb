class Api::ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
    render :index
  end

  def show
    @challenge = Challenge.find(params[:id])
    render :show
  end

  def update
    @challenge = Challenge.find(params[:id])
    unless @challenge.users.include?(current_user)
      @challenge.users << current_user
      render :show
    end
  end
end
