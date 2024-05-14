let svgBlob, fileName;

document.getElementById('svgFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/svg+xml') {
        fileName = file.name.split('.').slice(0, -1).join('.') + '.png'; // 元のファイル名+.png
        const reader = new FileReader();
        reader.onload = function(e) {
            const svgData = e.target.result;
            svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        };
        reader.readAsText(file);
    } else {
        alert('有効なSVGファイルを選択してください。');
    }
});

document.getElementById('convertButton').addEventListener('click', function() {
    if (!svgBlob) {
        alert('まずはSVGファイルを選択してください。');
        return;
    }

    const url = URL.createObjectURL(svgBlob);

    // Imageオブジェクトを作成してURLを設定
    const img = new Image();
    img.src = url;

    img.onload = () => {
        // ラジオボタンの選択されたモードを確認
        const mode = document.querySelector('input[name="mode"]:checked').value;

        let width, height;

        if (mode === 'size') {
            // 幅/高さモード
            const widthInput = document.getElementById('widthInput').value;
            const heightInput = document.getElementById('heightInput').value;
            width = widthInput ? parseInt(widthInput) : img.width;
            height = heightInput ? parseInt(heightInput) : img.height;
        } else {
            // 倍率モード
            const scaleInput = document.getElementById('scaleInput').value;
            const scale = scaleInput ? parseFloat(scaleInput) : 1;
            width = img.width * scale;
            height = img.height * scale;
        }

        // canvas要素を作成
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        // SVG画像をcanvasに描画
        context.drawImage(img, 0, 0, width, height);

        // canvasの内容をPNGデータURLとして取得
        const pngDataUrl = canvas.toDataURL('image/png');

        // imgタグにPNGデータURLを設定して表示
        const pngImageElement = document.getElementById('pngImage');
        pngImageElement.src = pngDataUrl;
        pngImageElement.style.display = 'block';

        // ダウンロードボタンを表示
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.style.display = 'inline';
        downloadButton.onclick = function() {
            const a = document.createElement('a');
            a.href = pngDataUrl;
            a.download = fileName;
            a.click();
        };

        // URLオブジェクトを解放
        URL.revokeObjectURL(url);
    };
});

// ラジオボタンの変更時に入力フィールドを切り替える
document.querySelectorAll('input[name="mode"]').forEach((radio) => {
    radio.addEventListener('change', function() {
        if (this.value === 'scale') {
            document.getElementById('scaleInputs').style.display = 'block';
            document.getElementById('sizeInputs').style.display = 'none';
        } else {
            document.getElementById('scaleInputs').style.display = 'none';
            document.getElementById('sizeInputs').style.display = 'block';
        }
    });
});

// スライダーの値を表示する
document.getElementById('scaleInput').addEventListener('input', function() {
    document.getElementById('scaleValue').textContent = this.value;
});
