# == Schema Information
#
# Table name: markers
#
#  id         :bigint(8)        not null, primary key
#  lat        :float            not null
#  lng        :float            not null
#  route_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order      :integer
#

require 'test_helper'

class MarkerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
