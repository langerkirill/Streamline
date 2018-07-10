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

  validates :user_id, :type, :date, presence: true

  belongs_to :user
  # belongs_to :routes

end
