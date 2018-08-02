class Api::CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    comment = Marker.new(comment_params)
    comment.user_id = current_user.id
    if comment.save
      render json: 'success'
    else
      render json: comment.errors.full_messages, status: :unprocessable_entity
      render :new, status: 422
    end
  end

  def destroy
  end

  def comment_params
    params.require(:comment).permit(:user_id, :workout_id, :text, :created_at)
  end
end
