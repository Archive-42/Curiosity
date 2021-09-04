
@app.route("/", methods=["POST"])
def upload_file():
    """"""
    # A
    if "user_file" not in request.files:
        print("\n\nuser_file not in request.files")
        return ""
        
    # B
    file = request.files["user_file"]
    """
    These attributes are also available:
        file.filename
        file.content_type
        file.content_length
        file.mimetype
    """

    # C
    if file.filename == "":
        return "Please select a file"
        
    # D
    if file and allowed_file(file.filename):
        file.filename = secure_filename(file.filename)
        output = upload_file_to_s3(file, app.config["S3_BUCKET"])
        return str(output)
        
    else:
        return redirect("/")
