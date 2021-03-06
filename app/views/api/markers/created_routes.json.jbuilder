json.markers do
  @markers.each do |marker|
    json.set! marker.id do
      json.extract! marker, :id, :route_id, :lat, :lng, :created_at, :order
    end
  end
end
