json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
      if user.photo.attachment.present?
        json.photoUrl url_for(user.photo)
      end
    end
  end
end
