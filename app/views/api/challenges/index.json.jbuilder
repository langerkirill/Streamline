json.challenges do
  @challenges.each do |challenge|
    json.set! challenge.id do
      json.extract! challenge, :id, :text, :title, :img, :workout_type
      json.userIds challenge.users.ids
    end
  end
end
