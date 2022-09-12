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

    XHR.open("POST", "/posts", true);
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

  });
 };
 
 window.addEventListener('load', post);