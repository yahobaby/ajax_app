//コードを見やすく整理
const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
  // 関数buildHTMLの返り値にhtmlを指定&ここでいうhtmlとは、4〜12行目で定義した変数htmlのこと。つまり、投稿後に新たに生成されたHTMLのこと。
};



function post (){
  //リクエストを送信する処理

  // console.log("イベント発火");
// localhost:3000に接続し、読み込みが終わったときにイベント発火していることが確認できたので、console.log("イベント発火");は削除

  const submit = document.getElementById("submit");
// getElementByIdメソッドで取得した投稿ボタンの要素を変数submitに格納

  submit.addEventListener("click", (e) => {
  // eはイベントオブジェクトといい、イベント発生時の情報を持ったオブジェクト
  // 「投稿ボタンをクリックした」という情報を持ったオブジェクト
  // 慣例的にeventの頭文字eが多い

  e.preventDefault();
  // preventDefault()の対象をeとすることにより、「投稿ボタンをクリックした」という現象を無効化して、重複投稿を防ぐ

  // submit.addEventListener("click", () => { →メモが重複投稿されないようにコード修正の為、削除
    // 「投稿ボタンがクリックされたこと」を認識するために、submit.addEventListenerと記述
    // 「クリックされた」というイベントを認識したいため、addEventListenerメソッドの第一引数にはclickイベントを指定
    // console.log("イベント発火");クリック時イベント発火されるか確認の為だったので、削除
    const form = document.getElementById("form");
    // getElementByIdメソッドで取得したフォームの要素を変数formに格納

    const formData = new FormData(form);
    // new FormData(フォームの要素);のように記述することでオブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得
    // 新たに生成したFormDataオブジェクトを変数formDataに格納

    const XHR = new XMLHttpRequest();
    // 非同期通信を行うためにXMLHttpRequestオブジェクトを生成
    // 変数名のXHRはXMLHttpRequestの略
    // 「new XMLHttpRequest」と記述することで、新しくオブジェクトを生成

    XHR.open("POST", "/posts", true);    //「posts」→「post」にすることで、404エラーが出るようにコード修正して確認してみる。404はルーティングに問題がある場合に起こるエラー
    // クエストの内容を指定
    // 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述
    // XMLHttpRequestオブジェクトのメソッドの一種

    XHR.responseType = "json";
    // responseTypeプロパティを使用して、受け取るレスポンスのデータフォーマットを指定
    // responseTypeプロパティとは、レスポンスのデータフォーマット（＝どのような形式のデータにするか）を指定するプロパティ
    // リクエストを送信する際に、レスポンスで欲しいデータフォーマットをあらかじめ指定しておく必要があるため、使用
    // JSONとは、JavaScriptをもとにして構成されたデータフォーマットのことで、動作が軽いことやモダンなフロント言語と親和性が高く管理がしやすいなどのメリットがある

    XHR.send(formData);
    // リクエストを送信するメソッド
    // XMLHttpRequestオブジェクトのメソッドの一種

    XHR.onload = () => {
      // console.log(XHR.response);
      // responseプロパティとは、サーバーからのレスポンスに関する情報が格納されたプロパティのことでXMLHttpRequestオブジェクトのプロパティの一種
      // レスポンス内容確認できたので、上記削除


      // レスポンスに何らかの問題があった場合の処理
      if (XHR.status != 200) {
        // XHR.statusには、HTTPステータスコードが格納
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // XHR.statusTextには、ステータスコードに応じたメッセージが格納
        return null;
        // return null;によってJavaScriptの処理から抜け出すことができる。エラーが出た場合に、これ以降に記述されている処理を行わないようにすることが目的。
      };



      // 新しいメモを挿入するための要素を取得して、変数listに格納
      const list = document.getElementById("list");
      //

      //入力フォームの値リセットの為
      const formText = document.getElementById("content");
      // リセットの対象となるフォームの要素contentを取得して、変数formTextに格納

      // console.log(formText.value);→formTextのvalue属性の値を確認できたので、削除

      // 新たに投稿されたメモのHTMLを生成
      const item = XHR.response.post;
      // XHR.response.postと記述することで、レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
      // XHR.response.postで値が取れるのは、postsコントローラーのcreateアクションにrender json: {post: post}と記述されていることで、postというキーと投稿されたメモの内容が紐付いているから


      // こちら、onloadプロパティの中で新規メモのHTMLを生成しており、HTMLの生成は処理の本質部分ではないため、投稿したメモのHTMLを生成する部分を関数buildHTMLとして、外に切り出す。
      // item内に格納されたメモの情報を元にして、ブラウザに描画するためのHTMLを生成し、変数htmlに格納
      // const html = `
      //   <div class="post">
      //     <div class="post-date">
      //       投稿日時：${item.created_at}
      //     </div>
      //     <div class="post-content">
      //       ${item.content}
      //     </div>
      //   </div>`;


      list.insertAdjacentHTML("afterend", buildHTML(XHR));

        // buildHTMLの関数を生成、外に切り出したので、削除
        // insertAdjacentHTMLメソッドの第一引数にafterendを指定することで、変数listに格納された要素の直後に生成したHTMLを挿入
        // list.insertAdjacentHTML("afterend", html);
        // afterbegin	要素内部の、最初の子要素の直前
        //

        // formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセット
        formText.value = "";

    };

    // onloadプロパティとは、リクエストの送信が成功したときに呼び出されるプロパティ。
    // XMLHttpRequestオブジェクトのプロパティの一種
    // レスポンスの受信に成功したときの処理を記述

  });
 };
 
 window.addEventListener('load', post);