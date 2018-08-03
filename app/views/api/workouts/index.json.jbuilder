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
      if workout.user.image.attached?
        json.photoUrl url_for(workout.user.image)
      else
        json.photoUrl "http://cdn.marketplaceimages.windowsphone.com/v8/images/b8f268a6-6818-4a19-b857-bf1ed2f26962?imageType=ws_icon_medium"
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

json.comments do
  @workouts.each do |workout|
    if workout.comments.present?
      workout.comments.each do |comment|
        json.set! comment.id do
          json.extract! comment, :text, :user_id, :workout_id
        end
      end
    end
  end
end
