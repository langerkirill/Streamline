# == Schema Information
#
# Table name: workouts
#
#  id         :bigint(8)        not null, primary key
#  type       :string
#  duration   :integer
#  miles      :integer
#  date       :date
#  route_id   :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Workout < ApplicationRecord

  validates :user_id, :workout_type, :date, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
  # belongs_to :routes

end
