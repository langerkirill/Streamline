json.workouts do
  @workouts.each do |workout|
    json.set! workout.id do
      json.extract! workout, :id, :user_id, :date, :workout_type, :miles, :duration, :title, :elevation, :route_id
    end
  end
end

json.users do
  @workouts.each do |workout|
    json.set! workout.user.id do
      json.extract! workout.user, :id, :username
      if workout.user.image.present?
        json.photoUrl url_for(workout.user.image)
      end
      json.workoutIds workout.user.workouts.order('date DESC').ids
    end
  end
end

json.routes do
  @workouts.each do |workout|
    if workout.route.present?
      json.set! workout.route.id do
        json.extract! workout.route, :id, :startlat, :startlong, :endlat, :endlong
      end
    end
  end
end
