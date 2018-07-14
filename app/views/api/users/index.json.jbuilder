json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
      if user.image.attachment.present?
        json.photoUrl url_for(user.image)
      end
    end
  end
end
