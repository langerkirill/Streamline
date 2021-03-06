
  json.search do
    @users.each do |user|
      json.set! user.id do
        json.extract! user, :id, :username
        if user.image.attachment.present?
          json.photoUrl url_for(user.image)
        else
          json.photoUrl "http://cdn.marketplaceimages.windowsphone.com/v8/images/b8f268a6-6818-4a19-b857-bf1ed2f26962?imageType=ws_icon_medium"
        end
      end
    end
  end
