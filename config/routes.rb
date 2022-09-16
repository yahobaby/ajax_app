Rails.application.routes.draw do
  root to: 'posts#index'  
  # get 'posts', to: 'posts#index'→posts#indexへのパスをルートパスへ変更の為、編集

 # get 'posts/new', to: 'posts#new'
 # 新規投稿ページへの遷移は行わない為、こちらは削除

  post 'posts', to: 'posts#create'
end
