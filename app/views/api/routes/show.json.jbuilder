
json.extract! @route, :id, :user_id, :route_type, :miles, :duration, :elevation, :name
unless @workout.nil?
  json.extract! @workout, :miles, :duration, :elevation, :workout_type, :title
end
