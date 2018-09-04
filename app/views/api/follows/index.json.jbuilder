json.follows do
  @follows.each do |follow|
    json.set! follow.id do
      json.followingIds follow.following.ids
      json.followerIds follow.followers.ids
    end
  end
end
