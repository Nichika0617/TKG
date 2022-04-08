const PDFWIDTHMIN = 100;
const PDFWIDTHMAX = 118;

const setValuesFromPdfObject = (textContent) => {
    /*
    pdfObject has page objects
    page object has textContent() 
    textContent return has items and styles
    pdfobject.items is object array
    theobject has str, transform[], etc...  
    */
    const objectArray = textContent.items
    let target = 0;
    obj = {}
    for (let i = 0; i < objectArray.length; i++) {
        let baseObject = objectArray[i];
        if (baseObject.str == pdfIdList[target]) {//スタートを探す
            log("match:" + baseObject.str);
            const basePos = baseObject.transform.slice(4);
            let value = 0;
            for (let j = i + 1; j < objectArray.length; j++) {
                const targetObject = objectArray[j];
                const targetPos = targetObject.transform.slice(4);
                /*
                545.4788          :左側の科目名
                628.2959 82.8171  :必修単位
                662.3119 116.8331 :取得単位
                667.8221 122.3433 :右側の科目名
                */

                const posDiff = targetPos[0] - basePos[0];
                if (Math.abs(basePos[1] - targetPos[1]) < 4) {
                    if (PDFWIDTHMAX > posDiff && posDiff > PDFWIDTHMIN) {
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
    setValue(obj);
    all_calc();
    ChangeBySelect();
}

document.getElementById("pdfInput").onchange = function (event) {

    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.onload = function () {

        let typedarray = new Uint8Array(this.result);

        const loadingTask = pdfjsLib.getDocument(typedarray);
        loadingTask.promise.then(pdf => {
            log("pdf loaded");
            pdf.getPage(1).then(page => {
                log("page loaded");
                page.getTextContent().then(textContent => {
                    setValuesFromPdfObject(textContent);
                });
            });
        });
    };
    fileReader.readAsArrayBuffer(file);
}