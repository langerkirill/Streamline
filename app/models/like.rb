class Like < ApplicationRecord

  validates :user_id, :workout_id, presence:true

  belongs_to :workout
  belongs_to :user

end
