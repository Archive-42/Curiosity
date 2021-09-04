class CommentsController < ApplicationController
    before_action :ensure_logged_in

    def new
        render :new
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id
        if @comment.save
            redirect_to post_url(@comment.post_id)
        else
            flash.now[:errors] = @comment.errors.full_messages
            render :new
        end
    end

    def show
        @comment = Comment.find(params[:id])
        render :show
    end

    private

    def comment_params
        params.require(:comment).permit(:content, :parent_comment_id, :post_id)
    end

end
