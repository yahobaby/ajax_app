class PostsController < ApplicationController

  def index
    # @posts = Post.all メモを降順、新しい順に表示される為に、編集
    @posts = Post.order(id: "DESC") #メモを降順にする

  end

  # def new→newアクションは不要の為
  # end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index  # 追記する
    # 投稿後にトップページにリダイレクトする
  end
end
