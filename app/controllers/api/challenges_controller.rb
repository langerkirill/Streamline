class Api::ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all.includes(:users)
    render :index
  end

  def show
    @challenge = Challenge.find(params[:id])
    render :show
  end

  def update
    @challenge = Challenge.find(params[:id])
    @challenge.users << current_user
    render :show
  end
end
