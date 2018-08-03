class Api::CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
      render :new, status: 422
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.author_id == current_user.id
      comment.destroy
    else
      render json: "you can't delete another person's comment"
    end
    render json: ["Workout destroyed"]
  end

  def comment_params
    params.require(:comment).permit(:user_id, :workout_id, :text, :created_at)
  end
end
