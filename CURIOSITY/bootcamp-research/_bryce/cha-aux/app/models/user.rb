# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  
  has_many :owned_servers,
    foreign_key: :owner_id,
    class_name: :Server,
    dependent: :destroy

  has_many :memberships,
    foreign_key: :user_id,
    class_name: :Membership,
    dependent: :destroy

  has_many :joined_servers,
    through: :memberships,
    source: :joinable,
    source_type: :Server

  has_many :joined_channels,
    through: :memberships,
    source: :joinable,
    source_type: :Channel

  has_one_attached :icon_image
  
  attr_reader :password
  
  after_initialize :ensure_session_token
  
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def reset_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end
  
  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end
  
  private
  
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
