// ブラウザバック時処理（スマホ対応）
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

// スクロール用
let timer;
let sceneId = 1;
const maxId = 5;
const duration = 250;

/**
 * 初期化
 */
$(document).ready(function () {
  // ホイールイベントをwindowに追加
  window.addEventListener("wheel", handleWheel, { passive: false });

  // 最上段へスクロール
  sceneId = 1;
  scrollBarActivate(sceneId);
  window.scroll({
    top: 0,
  });
});

// --------------------------------------------------
// ホイールイベント
// --------------------------------------------------
function handleWheel(event = null) {
  // デフォルトのスクロール処理をキャンセル
  event.preventDefault();

  // 前のスクロール処理をキャンセル
  clearTimeout(timer);

  // ホイールの移動量を取得
  const delta = event.deltaY || event.detail || event.wheelDelta || -1;

  // スクロールする画面ＩＤを指定
  if (delta > 0) {
    sceneId++;
    if (sceneId > maxId) {
      sceneId = maxId;
      return;
    }
  } else {
    sceneId--;
    if (sceneId <= 0) {
      sceneId = 1;
      return;
    }
  }

  // スクロール処理
  const scrollableDiv = document.getElementById("sect-" + sceneId);
  $("html, body").animate(
    {
      scrollTop: $(scrollableDiv).offset().top,
    },
    duration
  );

  // イベント作動中判定
  timer = setTimeout(function () {
    timer = null;
  }, duration);

  // スクロールバー用
  scrollBarActivate(sceneId);
}

function scrollBarActivate(sceneId) {
  const elements = document.getElementsByClassName("scrolBar");
  for (const element of elements) {
    if (element.id === "sc-" + sceneId) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }
}
