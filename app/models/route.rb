

class Route < ApplicationRecord
  # Setup API keys
  # gmaps = GoogleMapsService::Client.new(key: 'AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U')
  has_many :workouts

end
