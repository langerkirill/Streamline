json.extract! @workout, :id, :user_id, :date, :workout_type, :miles, :duration, :title, :elevation, :route_id
if @workout.image.attached?
  json.photoUrl url_for(@workout.image)
end
