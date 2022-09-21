class ApplicationController < ActionController::Base
  # ↓ RailsアプリケーションにBasic認証を導入
  before_action :basic_auth
  # Basic認証によるログインの要求は、すべてのコントローラーで行いたく、Basic認証の処理をapplication_controller.rbのprivate以下にメソッドとして定義し、
  # before_actionで呼び出し

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|

      # 環境変数を使って、Basic認証を行えるユーザー名とパスワードを定義
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]  # 環境変数を読み込む記述に変更

      # username == 'admin' && password == '2222'
      # adminというユーザー名と2222というパスワードにて、設定してみる
      
    end
  end
  # ↑ RailsアプリケーションにBasic認証を導入
end
