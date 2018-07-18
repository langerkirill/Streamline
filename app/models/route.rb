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



class Route < ApplicationRecord
  # Setup API keys
  # gmaps = GoogleMapsService::Client.new(key: 'AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U')
  has_many :workouts
  has_many :markers
  belongs_to :user

end
