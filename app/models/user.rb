# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  fname           :string
#  lname           :string
#

class User < ApplicationRecord

  #fgripe

  validates :session_token, :password_digest, :username, uniqueness:true
  validates :password, length: {minimum:6}, allow_nil:true

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :workouts,
    foreign_key: :user_id,
    class_name: :Workout

  has_many :routes

  has_many :markers,
    through: :routes,
    source: :markers

  has_many :comments

  has_one_attached :image

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def generate_session_token
    SecureRandom.base64
  end

  def reset_session_token
    self.session_token = generate_session_token
    self.save
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

end
