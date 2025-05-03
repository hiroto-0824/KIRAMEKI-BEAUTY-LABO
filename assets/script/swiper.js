const mySwiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,

    autoHeight: true, // スライドの内容に応じて高さ調整
    slidesPerView: 1.22, // コンテナ内に表示させるスライド数（CSSでサイズ指定する場合は 'auto'）
    spaceBetween: 15, // スライド間の余白（px）
    centeredSlides: true, // アクティブなスライドを中央に配置する

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,          // ユーザーがドットをクリックしてスライドを切り替えられるようにする
        type: 'bullets', 
    },

     // ブレークポイント (画面幅に応じた設定)
    breakpoints: {
    // 画面幅が 768px 以上の場合
    768: {
        slidesPerView: 3
    }},
});