require 'erb'
require 'byebug'
class ShowExceptions
  attr_reader :app
  
  def initialize(app)
    @app = app
  end

  def call(env)
    begin
      app.call(env)
    rescue RuntimeError => e
      render_exception(e)
    end
  end

  private

  def render_exception(e)
    ['500', {'Content-type' => 'text/html'}, [e.message]]
  end

end
