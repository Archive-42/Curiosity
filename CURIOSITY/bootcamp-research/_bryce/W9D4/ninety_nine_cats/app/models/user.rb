class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, presence: true

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :cats, foreign_key: :user_id, class_name: :Cat, dependent: :destroy
  has_many :requests, foreign_key: :user_id, class_name: :CatRentalRequest, dependent: :destroy
  def self.find_by_credentials(user_name, password)
    user = User.find_by(username: user_name)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= self.reset_session_token!
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end
end
