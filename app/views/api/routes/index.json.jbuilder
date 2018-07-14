json.routes do
  @routes.each do |route|
    json.set! route.id do
      json.extract! route, :id, :startlat, :startlong, :endlat, :endlong
    end
  end
end
