class PostsController < ApplicationController
    before_action :ensure_logged_in, except: :show

    def new
        @subs = Sub.all
        render :new
    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id

        if @post.save
            redirect_to @post
        else
            flash.now[:errors] = @post.errors.full_messages
            render :new
        end
    end

    def show
        @post = Post.find(params[:id])
        render :show
    end
    
    def edit
        @subs = Sub.all
        @post = Post.find(params[:id])
        render :edit
    end

    def update
        @post = Post.find(params[:id])
        if @post.author_id == current_user.id && @post.update(post_params)
            redirect_to @post
        else
            flash.now[:errors] = @post.errors.full_messages
            render :edit
        end
    end

    def destroy
        @post = Post.find(params[:id])
        @post.destroy
        redirect_to sub_url(@post.subs.first)
    end

    private
    
    def post_params
        params.require(:post).permit(:title, :url, :content, sub_ids: [])
    end
end
