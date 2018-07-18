json.markers do
  @markers.each do |marker|
    json.set! marker do
      json.extract! marker, :id, :route_id, :lat, :lng
    end
  end
end
