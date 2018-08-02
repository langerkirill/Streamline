class Comment < ApplicationRecord

  validates :text, :user_id, :workout_id, presence: true

  belongs_to :user
  belongs_to :workout

end
