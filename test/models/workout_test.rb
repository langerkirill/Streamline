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

require 'test_helper'

class WorkoutTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
