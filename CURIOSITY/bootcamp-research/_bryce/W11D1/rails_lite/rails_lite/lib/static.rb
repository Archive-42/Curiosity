require 'byebug'
class Static
  
  CONTENT_TYPES = {
    "txt" => "text/plain",
    "jpg" => "image/jpeg",
    "png" => "image/png",
    "zip" => "application/zip",
  }

  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    path = env["PATH_INFO"][1..-1]
    if File.readable?(path)
      contents = File.read(path)
      [ "200", "Content-type" => CONTENT_TYPES[ File.extname(path) ], [contents] ]
    else
      [ "404", "Content-type" => "text/html", ["Not Found"] ]
    end
  end

end
