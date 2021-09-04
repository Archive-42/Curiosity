require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) do 
    FactoryBot.build(:user, email: "bryce@google.com", password: "password123")
  end
  # Presence of email
  it { should validate_presence_of(:email) }
  # Presence of password_digest
  it { should validate_presence_of(:email) }
  # Length of password > 6
  it { should validate_length_of(:password).is_at_least(6) }

  describe "#reset_session_token!" do
    it "changes the session token" do
      user.valid?
      first_token = user.session_token
      user.reset_session_token!

      expect(user.session_token).to_not eq(first_token)
    end
  end

  describe "#is_password?" do
    it "verifies a correct password" do
      expect(user.is_password?("password123")).to be true
    end
    
    it "verifies that a password is incorrect" do
      expect(user.is_password?("password234")).to be false
    end
  end

  describe "::find_by_credentials" do
    before { user.save! }

    it "returns user if credentials match" do
      expect(User.find_by_credentials("bryce@google.com", "password123")).to eq(user)
    end

    it "returns nil if credentials do not match" do
      expect(User.find_by_credentials("bryce@google.com", "password234")).to eq(nil)
    end
  end

end
