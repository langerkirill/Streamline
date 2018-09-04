class Follow < ApplicationRecord

  validates :user_id, :following_id, presence: true
  validates :following_id, uniqueness: {scope: :user_id, message: 'you cannot follow the same person twice'}

  belongs_to :follower, foreign_key: 'user_id', class_name: 'User'
  belongs_to :following, foreign_key: 'following_id', class_name: 'User'

end
