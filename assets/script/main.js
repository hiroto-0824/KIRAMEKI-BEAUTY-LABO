//main.js


/**
 * HeightReplacement クラス
 * 
 * 第１引数のオブジェクトのheightを取得し、
 * 第２引数のオブジェクトにそのheightを上書きする
 */
class HeightReplacement{
    /**
     * HeightReplacement クラスのインスタンスを作成します。
     * 
     * @param {string} replace_sorce - heightを取得
     * @param {string} target - 取得したheightで上書き
     */
    constructor(replace_sorce, target) {
        this.replace_sorce = document.querySelector(replace_sorce)
        this.target = document.querySelector(target)
        this.init_HeightReplacement();
        this.attachResizeEvent();
    }

    init_HeightReplacement(){
        if (this.replace_sorce && this.target) {
            const height = this.replace_sorce.offsetHeight; // ピクセル単位で取得
            this.target.style.height = `${height}px`; // 高さをセット
        }
    }

    attachResizeEvent(){
        window.addEventListener('resize', () => {
            this.init_HeightReplacement();
        })
    }
}

class ResponsiveFontSize {
    constructor(threshold, smallSize, largeSize) {
        this.threshold = threshold;       // 例: 389
        this.smallSize = smallSize;       // 例: '12px'
        this.largeSize = largeSize;       // 例: '16px'
        this.mediaQuery = window.matchMedia(`(max-width: ${threshold}px)`);
        // bindした関数を使わないと、thisがクラス外を指してしまう
        this.handleChange = this.handleChange.bind(this);

        // 初期化処理
        this.applyFontSize(this.mediaQuery);
        this.mediaQuery.addEventListener('change', this.handleChange);
        }

    handleChange(e) {
        this.applyFontSize(e);
    }

    applyFontSize(e) {
        if (e.matches) {
            document.documentElement.style.fontSize = this.smallSize;
            console.log(`画面幅 <= ${this.threshold}px: フォントサイズ → ${this.smallSize}`);
        } else {
            document.documentElement.style.fontSize = this.largeSize;
            console.log(`画面幅 > ${this.threshold}px: フォントサイズ → ${this.largeSize}`);
        }
    }
}

class FontStyleController {
    constructor(className, options) {
    this.className = className;
    this.fontSize = options.fontSize;         // 変更後のfont-size
    this.lineHeight = options.lineHeight;     // 変更後のline-height
    this.mediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1400px)');
    this.handleChange = this.handleChange.bind(this);

    // 初回実行＋監視
    this.applyStyles(this.mediaQuery.matches);
    this.mediaQuery.addEventListener('change', this.handleChange);
    }

    handleChange(e) {
    this.applyStyles(e.matches);
    }

    applyStyles(apply) {
        const elements = document.querySelectorAll(`.${this.className}`);
        elements.forEach(el => {
        if (apply) {
            el.style.fontSize = this.fontSize;
            el.style.lineHeight = this.lineHeight;
            console.log(el.style.fontSize); // スタイルが設定されているか確認
        } else {
            el.style.fontSize = '';
            el.style.lineHeight = '';
        }
    });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeightReplacement('.comparison__logo img', '.comparison__label');
    // font-size変更
    new ResponsiveFontSize(389, 'clamp(1px, 2vw, 20px)', 'clamp(8px, 2vw, 20px)');
    // font-size, line-height変更   
    new FontStyleController('main-visual__feature', {
        fontSize: 'calc(1.4rem - 5px)',
        lineHeight: 'clamp(1rem, 5vw - 10px, 3.5rem)'
    });
});