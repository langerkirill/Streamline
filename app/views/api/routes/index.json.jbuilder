json.routes do
  @routes.each do |route|
    json.set! route.id do
      json.extract! route, :id, :startlat, :startlong, :endlat, :endlong, :route_type, :miles, :duration, :elevation, :name
    end
  end
end
