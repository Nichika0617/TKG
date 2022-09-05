//pdf読み込み機能
document.getElementById("pdfInput").addEventListener('change', onLoadPdfAndApply);

/**
 * addEventListnerのコールバック関数。pdfの読み込みと値をテーブルへ保存する両方行う。
 * @param {Event} event Inputで選択されたファイル一覧
 * @return {void}
 */
function onLoadPdfAndApply(event) {
    loadPdf(event).catch((e) => {}).then(file => {
        return getPdfDataArray(file);
    }).then(pdfDataArray => {
        return setNumberOfCreditsToTableFromPdfObject(pdfDataArray);
    })
}

/**
 * Pdfを読み込みfileDataを返す。
 *
 * @param {Event} event Inputで選択されたファイル一覧
 * @return {Promise<fileReader>} fileReaderを返します。
 */
function loadPdf(event) {
    return new Promise((resolve, reject) => {
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader);
        fileReader.onerror = (e) => reject(e);
        fileReader.readAsArrayBuffer(file);
    });
}

/**
 * fileRaderから文字や座標の情報を含んだ配列を取得する。
 * @param {FileReader} file 読み込んだファイル
 * @return {Promise<Array>} pdfから文字や座標の情報を含んだ配列 itemsのこと
 */
function getPdfDataArray(file) {
    return new Promise(resolve => {
        let typedarray = new Uint8Array(file.result);
        const loadingTask = pdfjsLib.getDocument(typedarray);
        loadingTask.promise.then(pdf => {
            pdf.getPage(1).then(page => {
                page.getTextContent().then(textContent => {
                    resolve(textContent.items);
                });
            });
        });
    });
}

//TODO: pdfIdList と idList をオブジェクト化し、tableListを引数にとるようにする
/**
 * pdfから読み込んだ値をテーブルにセットする
 * @param {pdfObject} pdfObject pdf.js で読み込まれたpdfObject
 */
function setNumberOfCreditsToTableFromPdfObject(items) {
    /*
    pdfObject has page objects
    page object has textContent()
    textContent return items and styles
    items is object array
    item has str, transform[], etc...
    */
    const POSITIONWIDTHMIN = 100;
    const POSITIONWIDTHMAX = 118;
    const POSITIONHEIGHTMAX = 4;

    let target = 0;
    obj = {}
    for (let i = 0; i < items.length; i++) {
        const baseObject = items[i];
        if (baseObject.str == pdfIdList[target]) {
            const basePos = baseObject.transform.slice(4);//xy座標のみ取り出す
            let value = 0;
            for (let j = i + 1; j < items.length; j++) {
                const targetObject = items[j];
                const targetPos = targetObject.transform.slice(4);
                /*
                x        y
                545.4788          :左側の科目名
                628.2959 82.8171  :必修単位
                662.3119 116.8331 :取得単位
                667.8221 122.3433 :右側の科目名
                */
                const posDiff = targetPos[0] - basePos[0];
                if (Math.abs(basePos[1] - targetPos[1]) < POSITIONHEIGHTMAX) {
                    if (POSITIONWIDTHMAX > posDiff && posDiff > POSITIONWIDTHMIN) {
                        value = targetObject.str
                        break;
                    }
                }
            }
            //keyとvalueがそろう。
            obj[idList[target]] = value;
            target++;
        }
    }
    //TODO: 以下のクソコードは直す
    setValue(obj);
    all_calc();
    ChangeBySelect();
}