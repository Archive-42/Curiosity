require 'json'

class Flash

  attr_reader :req

  def initialize(req)
    @req = req
    current_cookie = req.cookies["_rails_lite_app_flash"]
    @flash = {}
    @flash_now = current_cookie ? JSON.parse(current_cookie) : {}
  end

  def [](key)
    {}.merge(@flash).merge(@flash_now)[key.to_s]
  end

  def []=(key, value)
    @flash[key.to_s] = value
  end

  def store_flash(res)
    res.set_cookie("_rails_lite_app_flash", {path: :/, value: @flash.to_json})
  end

  def now
    @flash_now
  end

end
