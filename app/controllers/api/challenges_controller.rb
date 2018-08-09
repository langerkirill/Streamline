class Api::ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
    render :index
  end

  def show
    @chalenge = Chalenge.find(params[:id])
    render :show
  end
end
