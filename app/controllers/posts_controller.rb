class PostsController < ApplicationController

  def index
    # @posts = Post.all メモを降順、新しい順に表示される為に、編集
    @posts = Post.order(id: "DESC") #メモを降順にする

  end

  # def new→newアクションは不要の為
  # end

  def create
    # binding.pry : createアクションの中にbinding.pryを記述することで、リクエストが送信されているかどうか確認.
    # サーバーを立ち上げて、http://localhost:3000 にアクセスし,メモを投稿したら、処理が止まるので、ターミナルを確認して、正常にリクエストが送信されてるか
    # 確認をする。確認できたら、削除

  
    # 新たに投稿されたメモの内容を変数postに格納
    post = Post.create(content: params[:content])



    render json:{ post: post }
    # renderメソッドを用いて、レスポンスで返却されるデータフォーマットにJSONを指定
    # json:の部分をjsonオプションといい、これを指定することによって、直後に記述した{ post: post }というデータをJSON形式で返却
    # 直上で定義した変数postの値を、postというキーとセットでJavaScriptに送信

    # Post.create(content: params[:content])
    # redirect_to action: :index  # 追記する
    # 投稿後にトップページにリダイレクトする
  end
end
