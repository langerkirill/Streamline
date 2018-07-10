class Api::SessionsController < ApplicationController
  def create
    debugger
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      log_in!(@user)
      #render 'api/workouts'
    else
      render json: ["invalid credentials"], status: 401
    end
  end

  def destroy
    log_out!
    render json: {}
  end
end
