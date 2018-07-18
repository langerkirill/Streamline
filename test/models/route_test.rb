# == Schema Information
#
# Table name: routes
#
#  id            :bigint(8)        not null, primary key
#  startlat      :float
#  startlong     :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  endlat        :float
#  endlong       :float
#  created_route :float            is an Array
#  miles         :float
#  duration      :integer
#  elevation     :integer
#  user_id       :integer
#  route_type    :string
#

require 'test_helper'

class RouteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
