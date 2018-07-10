class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      debugger
      login(@user)
      debugger
      render 'api/users/show'
    else
      render json: ["invalid credentials"], status: 401
    end
  end

  def destroy
    log_out!
    render json: {}
  end
end
