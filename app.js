let subtotal2_judge = false; // 小計2の中で，人文社会総合を2単位取っているかの判定
let second_foreign_judge = false; // foreignTotalで使用する．言語は同じものから2単位取得しているか
let info_tec_judge = false; // 情報技術を2単位取得したか，
let ex_judge = false; // 総合力演習を7単位取得したか．
let exp_judge = false; // 研究実験を15単位取得したか．
let math_base_judge = false; // 数学基礎を6単位取得したか．
let core_judge = false; // 知能情報コアを26単位取得したか．
let fusion_judge = false; // 工学融合を4単位取得したか．
// 同じ科目群から取得しているかの判定はまだできていない(10/21)
// 全てのinputにつけられたidのリスト
const idList = ["health","jinbun","syakai","sougou","career","ryudai","Japanese","sizen","info","English","German","French","Spanish","Chinese","etc","major_base","out_major_base","info_tec","ex","experiment","math_base","core","fusion","math_base_select","adv","relation","common_engineering","free","teacher"];
//pdfで取得するリスト(上のidListと同期しなければならない)
const pdfIdList = ["健康運動","人文","社会","総合","キャリア関係","琉大特色・地域創生","日本語・日本語事情","自然","情報関係","英語","ドイツ語","フランス語","スペイン語","中国語","その他","専門基礎","専門基礎指定外","情報技術","総合力演習","研究実験","数学基礎","知能情報コア","工学融合（選択）","数学基礎（選択）","知能情報アドバンスト","知能情報関連","選択（工学共通）","自由","教職"]
// 表下の前期後期の必修科目につけられたidのリスト
                        
const compulsoryIdList = ['first_year_Compulsory','first_year_2nd_Compulsory','second_year_Compulsory','second_year_2nd_Compulsory','third_year_Compulsory','third_year_2nd_Compulsory','fourth_year_Compulsory','fourth_year_2nd_Compulsory','y21_first_year_Compulsory','y21_first_year_2nd_Compulsory','y21_second_year_Compulsory','y21_second_year_2nd_Compulsory','y21_third_year_Compulsory','y21_third_year_2nd_Compulsory','y21_fourth_year_Compulsory','y21_fourth_year_2nd_Compulsory']

const highLightObjects = //イベントリスナー追加対象のid,ハイライトの対象のクラス名,ハイライトクラス
[
    [
        "high_light_subtotal1",
        "subtotal1",
        "subtotal1_bgcolor"
    ],
    [
        "high_light_subtotal2",
        "subtotal2",
        "subtotal2_bgcolor"
    ],
    [
        "high_light_subtotal3",
        "subtotal3",
        "subtotal3_bgcolor"
    ],
    [
        "high_light_subtotal4",
        "subtotal4",
        "subtotal4_bgcolor"
    ],
    [
        "high_light_total1",
        "total1",
        "total1_bgcolor"
    ],
    [
        "high_light_total2",
        "total2",
        "total2_bgcolor"
    ],
    [
        "high_light_all_total",
        "all_total",
        "all_total_bgcolor"
    ]
]

const DEBUG = true;//コンソール出力をするか否か

const log = (log) => {
    if(DEBUG==true){
        console.log(log);
    }
}

//ロード時に実行
window.onload = () =>{
    log("on load");
    addHithLightEventListeners(highLightObjects);
    setValue(JSON.parse(localStorage.getItem("TKG"))); // 値の復元
    all_calc(); // 初期化，前回の入力が復元された場合はその計算結果を出力．
}

const addHithLightEventListeners = (obj) =>{
    log("add high light enent listeners");
    for(let i=0;i<obj.length;i++){
        target = obj[i];
        addHighLightEventListner(target[0],target[1],target[2]);
    }
}

const addHighLightEventListner = (id,className,highLightColor) => {//イベントリスナー追加対象のid,ハイライトの対象のクラス名,ハイライトクラス
    log("add high light event listener"+": "+id+", "+className+", "+highLightColor);
    const targetElement = document.getElementById(id);
    const HightLightElements = document.getElementsByClassName(className);
    targetElement.addEventListener('mouseover', () => {
        for(let i=0;i<HightLightElements.length;i++){
            HightLightElements[i].classList.add(highLightColor);
        }
    },false);
    targetElement.addEventListener('mouseout',() => {
        for(let i=0;i<HightLightElements.length;i++){
            HightLightElements[i].classList.remove(highLightColor);
        }
    },false);
};

function convertNum(n){
    n = n || '0';//NaNを0にする。
    n = Math.max(0,n); //マイナスを0として扱う。
    return parseFloat(n);
}

const all_calc = ()=>{
    // 各合計を計算する関数を呼び，全て終わった後に最後の全ての合計を算出して出力する
    subtotal1_calc();
    subtotal2_calc();
    foreign_calc();    
    subtotal3_calc();
    subtotal4_calc();
    const major_base = convertNum(document.getElementById('major_base').value);
    const out_major_base = convertNum(document.getElementById('out_major_base').value);
    // これはどこに含まれる．．？ 専門基礎指定外
    const All_total = total1_calc() + total2_calc() + major_base;
    // 合計 共通30 + 専門計92 + 専門基礎8 = 130

    document.getElementById('result_major_base').textContent=Math.max(8-major_base,0);
    document.getElementById('all_total').textContent = All_total;
    document.getElementById('result_all_total').textContent = Math.max(130-All_total,0);

    saveValue();
}

// 小計1の計算↓↓______________________________________________________________________
const subtotal1_calc = ()=>{
    // 小計1の算出に必要なものを取得
    const jinbun = convertNum(document.getElementById('jinbun').value);
    const syakai = convertNum(document.getElementById('syakai').value);
    const sougou = convertNum(document.getElementById('sougou').value);
    const career = convertNum(document.getElementById('career').value);
    const ryudai = convertNum(document.getElementById('ryudai').value);
    const sougouryouiki = sougou+career+ryudai;
    
    // 日本語事情への対応はまだできていない(10/20)
    const Japanese = convertNum(document.getElementById('Japanese').value);
    const subTotal1 = jinbun + syakai + sougouryouiki;
    // それぞれの不足単位を計算，出力
    document.getElementById('result_jinbun').textContent=Math.max(2-jinbun,0);
    document.getElementById('result_syakai').textContent=Math.max(2-syakai,0);
    document.getElementById('sougouryouiki').textContent = sougouryouiki;
    document.getElementById('result_sougouryouiki').textContent=Math.max(2-sougouryouiki,0);
    document.getElementById('subtotal1').textContent=subTotal1;
    document.getElementById('result_subtotal1').textContent=Math.max(12-subTotal1,0);

}

// 小計2の計算↓↓______________________________________________________________________
const subtotal2_calc = ()=>{
    // 小計2の算出に必要なものを取得
    const jinbun = convertNum(document.getElementById('jinbun').value);
    const syakai = convertNum(document.getElementById('syakai').value);
    const sougou = convertNum(document.getElementById('sougou').value);
    const career = convertNum(document.getElementById('career').value);
    const ryudai = convertNum(document.getElementById('ryudai').value);
    const sougouryouiki = sougou+career+ryudai;
    const sizen = convertNum(document.getElementById('sizen').value);
    const subTotal1 = jinbun + syakai + sougouryouiki;
    // 小計2
    const subTotal2 = subTotal1 + sizen;
    // 小計2の結果を計算，出力

    document.getElementById('subtotal2').textContent=subTotal2;
    if(subTotal2 >= 14){
        if(document.getElementById('result_jinbun').textContent==0 && document.getElementById('result_syakai').textContent==0 &&  document.getElementById('result_sougouryouiki').textContent==0){
            // 人文2社会2総合2が14単位の必要条件
            subtotal2_judge = true;
        }else{
            subtotal2_judge = false;
        }
        
    }
    document.getElementById('result_subtotal2').textContent=Math.max(14-subTotal2,0);
}

// 外国語，第二言語の計算↓↓______________________________________________________________________
const foreign_calc = ()=>{
    // 第二言語，英語の算出に必要なものを取得
    const English = convertNum(document.getElementById('English').value);
    const German = convertNum(document.getElementById('German').value);
    const French = convertNum(document.getElementById('French').value);
    const Spanish = convertNum(document.getElementById('Spanish').value);
    const Chinese = convertNum(document.getElementById('Chinese').value);
    const etc = convertNum(document.getElementById('etc').value);
    const sum_second =  parseInt(German) + parseInt(French) + parseInt(Spanish) + parseInt(Chinese) + parseInt(etc);
    const foreignTotal = English + German + French + Spanish + Chinese + etc;
    // 第二言語計の結果を計算，出力

    document.getElementById('result_eng').textContent=Math.max(8-English,0);

    document.getElementById('result_german').textContent=Math.max(4-German,0);
    document.getElementById('result_french').textContent=Math.max(4-French,0);
    document.getElementById('result_spanish').textContent=Math.max(4-Spanish,0);
    document.getElementById('result_chinese').textContent=Math.max(4-Chinese,0);
    document.getElementById('result_etc').textContent=Math.max(4-etc,0);
    document.getElementById('sum_second').textContent = sum_second;

    // 第二言語は一つの科目から4単位以上取得する必要がある部分の判定処理
    if(parseInt(German) >=4 || parseInt(French) >=4 || + parseInt(Spanish) >=4 || + parseInt(Chinese)>=4 || parseInt(etc)>=4){
        // 合計で4ではなく，一つの言語を4単位以上あるかを確かめる
        second_foreign_judge = true; // 第二言語の条件を満たした．
        document.getElementById('result_second').textContent = 0;
        log("第二言語満たした")
    }else{
        if (sum_second >= 4){
            // 一つの科目群から4単位以上でなかったとしても，とりあえずマイナスにならないように合計が4超えた時も0とする
            document.getElementById('result_second').innerHTML = "0 <br> <span class='warning'>第二言語は合計で4単位以上ではなく，<br> 1つの言語から4単位取得する必要があります．</span>"
            second_foreign_judge = false; // 第二言語の条件を満たしていない
        }else{
            document.getElementById('result_second').textContent = Math.max(4-sum_second,0)
        }
        
    }

    document.getElementById('foreignTotal').textContent=foreignTotal;
    document.getElementById('result_foreignTotal').textContent=Math.max(12-foreignTotal,0);
    
    // foreignTotalが英語12か英語8と外国語4かどうか出力する
    if(foreignTotal >= 12){
        if(English >= 12){
            document.getElementById('result_foreignTotal').innerHTML = "0 <span class='success'><br> 英語12単位で満たされています，</span>";
            log("英語12");
        }else if(English >= 8 && second_foreign_judge == true){
        // 英語8単位以上かつ，第二言語1つを4単位以上とっているならば
            document.getElementById('result_foreignTotal').innerHTML = "0 <span class='success'><br> 英語8単位，第二言語4単位で満たされています．</span>"
            log("英語8と第二言語4")
        }else{
            document.getElementById('result_foreignTotal').innerHTML = "0 <span class='warning'><br> 言語の取得条件を満たしていません．</span>"
            
        }
    }

}

// 共通計の計算↓↓______________________________________________________________________
const total1_calc = () => {
    // 共通計の算出に必要なものを取得
    const health = convertNum(document.getElementById('health').value);
    document.getElementById('result_health').textContent=Math.max(2-health,0);
    const jinbun = convertNum(document.getElementById('jinbun').value);
    const syakai = convertNum(document.getElementById('syakai').value);
    const sougou = convertNum(document.getElementById('sougou').value);
    const career = convertNum(document.getElementById('career').value);
    const ryudai = convertNum(document.getElementById('ryudai').value);
    const sougouryouiki = sougou+career+ryudai;
    const sizen = convertNum(document.getElementById('sizen').value);
    const subTotal1 = jinbun + syakai + sougouryouiki;
    const subTotal2 = subTotal1 + sizen;
    const info = convertNum(document.getElementById('info').value);
    document.getElementById('result_info').textContent=Math.max(2-info,0);
    const English = convertNum(document.getElementById('English').value);
    const German = convertNum(document.getElementById('German').value);
    const French = convertNum(document.getElementById('French').value);
    const Spanish = convertNum(document.getElementById('Spanish').value);
    const Chinese = convertNum(document.getElementById('Chinese').value);
    const etc = convertNum(document.getElementById('etc').value);
    const foreignTotal = English + German + French + Spanish + Chinese + etc;
    const total1 = health + subTotal2 + info + foreignTotal;
    document.getElementById('total1').textContent=total1;
    
    if (total1 >= 30){
        if(Math.max(2-health,0) == 0 && Math.max(14-subTotal2,0) == 0 && Math.max(2-info,0) == 0 && Math.max(12-foreignTotal,0) == 0 && subtotal2_judge == true && English >= 8 && second_foreign_judge == true){
            // 注意文とか追加したから document.getElementById == 0の比較はできなくなってしまった
            // 2 + 14 + 2 + 12 = 30 で条件を満たしているならば，
            document.getElementById('result_total1').innerHTML = "0 <span class='success'><br> 30単位の条件を満たしています</span>"
            log("共通30満たした．")
        }else if(Math.max(2-health,0) != 0){
            // 30単位は満たしたが，健康運動を取得していない
            document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>健康運動を2単位以上取得する必要があります．</span>"
        }else if(second_foreign_judge == false){
            // 30単位は満たしたが，第二言語の取り方を間違っている．
            document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>第二言語を確認してください．</span>"
        }else if(Math.max(12-foreignTotal,0) != 0){
            // 30単位は満たしたが，外国語計を満たしていない
            document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>外国語を合計12単位取得する必要があります．</span>"
        }else if(Math.max(2-info,0) != 0){
            // 30単位は満たしたが，情報関係を取得していない
                document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>情報関係を2単位以上取得する必要があります．</span>"
        }else if(subtotal2_judge != true){
            // 小計2の判定がfalseを吐いている時，
            if(document.getElementById('result_jinbun').textContent != 0){
                // 人文を満たしていない
                document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>人文系科目を2単位以上取得する必要があります．</span>"
            }else if(document.getElementById('result_syakai').textContent != 0){
                // 社会を満たしていない
                document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>社会系科目を2単位以上取得する必要があります．</span>"
            }else if(document.getElementById('result_sougouryouiki').textContent != 0){
                // 総合領域を満たしていない
                document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>総合領域を2単位以上取得する必要があります．</span>"
            }else if(Math.max(14-subTotal2,0) != 0){
            // 30単位は満たしたが，小計2が満たされていない．(言語を取りすぎとか．)
                document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>小計2を確認してください．</span>"
            }
        }else if(English < 8){
            document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>外国語計を確認してください．</span>"
        }else{
            document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>上の各条件を確認してください．</span>"
            // マイナスにならないよう取得単位が30を超えたら0にしておくが，条件を満たせていないという注意を表示
            log("共通30の条件に合っていない")
        }
    }else{
        document.getElementById('result_total1').innerHTML = ""
        // innerHTMLのリセット
        document.getElementById('result_total1').textContent=Math.max(30-total1,0)
    }

    return total1;
}

// 数情計の計算↓↓______________________________________________________________________
const subtotal3_calc = () => {
    // 数情計の算出に必要なものを取得
    const math_base_select = convertNum(document.getElementById('math_base_select').value);
    const adv = convertNum(document.getElementById('adv').value);
    const relation = convertNum(document.getElementById('relation').value);
    const subTotal3 = math_base_select + adv + relation;
    
    //数情計の不足単位を計算，出力
    document.getElementById('sub_total3').textContent = subTotal3;
    document.getElementById('result_sub_total3').textContent = Math.max(22-subTotal3,0);
}

// 数情等計の計算↓↓______________________________________________________________________
const subtotal4_calc = () => {
    // 数情等計の算出に必要なものを取得
    const fusion = convertNum(document.getElementById('fusion').value);
    document.getElementById('result_fusion').textContent=Math.max(4-fusion,0);
    if(Math.max(4-fusion,0) == 0){
        // 工学融合を4単位以上取得しているならば．
        // 同じ科目群から取っているかはどうやって判定すれば，，，，，
        fusion_judge = true;
    }else{
        fusion_judge = false;
    }

    const math_base_select = convertNum(document.getElementById('math_base_select').value);
    const adv = convertNum(document.getElementById('adv').value);
    const relation = convertNum(document.getElementById('relation').value);
    const subTotal3 = math_base_select + adv + relation;
    const common_engineering = convertNum(document.getElementById('common_engineering').value);
    const free = convertNum(document.getElementById('free').value);
    
    const teacher = convertNum(document.getElementById('teacher').value);
    if(teacher > 10){
        document.getElementById('teacher_warning').textContent = "教職科目は10単位までしか卒業単位に含まれません";
    }else{
        document.getElementById('teacher_warning').textContent = "";
    }

    const subTotal4 = fusion + subTotal3 + common_engineering + free + teacher; 
    // 数情統計 教職もここに↑↑

    document.getElementById('sub_total4').textContent = subTotal4;
    document.getElementById('result_sub_total4').textContent = Math.max(36-subTotal4,0);
    if(subTotal4 >= 36){
        // 36満たした時，内訳を確認
        if(subTotal3 >= 22){
            if(fusion_judge == true){
            //数情計が22単位以上かつ，工学融合を4単位以上取得しているならば
                document.getElementById('result_sub_total4').innerHTML = `${Math.max(36-subTotal4,0)} <span class='success'><br> 36単位の条件を満たしています．</span>`
            }else{
                // 数は満たしているが，工学融合をとっていない
                document.getElementById('result_sub_total4').innerHTML = `${Math.max(36-subTotal4,0)} <span class='warning'><br> 工学融合科目を4単位以上取得する必要があります．</span>`
            }
        }else{
            // 36は超えてるが，数情計を22単位取っていない 融合と自由取りすぎ？
            document.getElementById('result_sub_total4').innerHTML = `${Math.max(36-subTotal4,0)} <span class='warning'><br> 数情計を22単位取得する必要があります．</span>`
        }
    }else{
        // 36超えてない値に戻した時は，一度警告を全部消すため，
        document.getElementById('result_sub_total4').innerHTML = ""
        // innerHTMLをリセットして，
        document.getElementById('result_sub_total4').textContent = Math.max(36-subTotal4,0);
        // 再設定
    }
}

// 専門計の計算↓↓______________________________________________________________________
const total2_calc = () => {
    // 専門計の算出に必要なものを取得
    const info_tec = convertNum(document.getElementById('info_tec').value);
    const ex = convertNum(document.getElementById('ex').value);
    const experiment = convertNum(document.getElementById('experiment').value);
    const math_base = convertNum(document.getElementById('math_base').value);
    const core = convertNum(document.getElementById('core').value);
    
    document.getElementById('result_info_tec').textContent=Math.max(2-info_tec,0); 
    if(Math.max(2-info_tec,0) == 0){
        // 情報技術の不足単位が0ならば
        info_tec_judge = true;
    }else{
        info_tec_judge = false;
    }

    document.getElementById('result_ex').textContent=Math.max(7-ex,0); 
    if(document.getElementById('result_ex').textContent == 0){
        // 総合力演習の不足単位が0ならば
        ex_judge = true;
    }else{
        ex_judge = false;
    }

    document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}`
    if(Math.max(15-experiment,0) == 0){
        // 研究実験の不足単位が0ならば
        exp_judge = true;
    }else{
        exp_judge = false;
    }

    document.getElementById('result_math_base').textContent=Math.max(6-math_base,0);
    if(Math.max(6-math_base,0) == 0){
        // 数学基礎の不足単位が0ならば
        math_base_judge = true;
    }else{
        math_base_judge = false;
    }

    document.getElementById('result_core').textContent=Math.max(26-core,0);
    if(Math.max(26-core,0) == 0){
        // 知能情報コアの不足単位が0ならば
        core_judge = true;
    }else{
        core_judge = false;
    }

    const fusion = convertNum(document.getElementById('fusion').value);
    const math_base_select = convertNum(document.getElementById('math_base_select').value);
    const adv = convertNum(document.getElementById('adv').value);
    const relation = convertNum(document.getElementById('relation').value);
    const subTotal3 = math_base_select + adv + relation;
    const common_engineering = convertNum(document.getElementById('common_engineering').value);
    const free = convertNum(document.getElementById('free').value);
    const teacher = convertNum(document.getElementById('teacher').value);
    const subTotal4 = fusion + subTotal3 + common_engineering + free + teacher; 
    
    const total2 = info_tec + ex + experiment + math_base + core + subTotal4;
    document.getElementById('total2').textContent = total2;
    document.getElementById('result_total2').textContent = Math.max(92-total2,0);

    
    if(total2 >= 92){
        if(info_tec_judge != true){
            // 92超えてるが，情報技術を満たしていない
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>情報技術の単位が不足しています．</span>"
        }else if(ex_judge != true){
            // 92超えてるが，総合力演習を満たしていない
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>総合力演習の単位が不足しています．</span>"
        }else if(exp_judge != true){
            // 92超えてるが，研究実験を満たしていない
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>研究実験の単位が不足しています．</span>"
        }else if(math_base_judge != true){
            // 92超えてるが，数学基礎を満たしていない
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>数学基礎の単位が不足しています．</span>"
        }else if(core_judge != true){
            // 92超えてるが，知能情報コアを満たしていない
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>知能情報コアの単位が不足しています．</span>"
        }else if(fusion_judge != true){
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>工学融合の単位が不足しています．</span>"
        }else if(subTotal4 < 36){
            // 92超えてるが，数情等計36単位を満たしていない または，数情等計36満たしているが，工学融合を満たしていない．
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>数情統計の単位が不足しています．</span>"
        }else{
            // おそらく全部満たしている．．？
            document.getElementById('result_total2').innerHTML = "0 <span class='success'> <br>92単位の条件を満たしています．</span>"
        }
    }
    return total2;
}


const nextInput = (id) => {
    // エンターキーで次のテキストボックスへ飛ばす処理
    if( window.event.keyCode == 13 ){        // 13は0x0d(CRキー)
        // window.alert('エンター押された')
        document.getElementById(id).focus();
    }
}

// 研究室配属条件を満たしているかを示すメッセージ部分＿＿＿＿＿＿＿＿＿＿

function valueChange(event){
    // y18 y19 y20
    if (more90Checkbox_y18_y19_y20.checked && more110Checkbox_y18_y19_y20.checked && takeAllCheckbox_y18_y19_y20.checked){
        document.getElementById('result_lab_req_y18_y19_y20').innerHTML = "<span class='success'>研究室配属条件を満たしています．</span>"
    }else{
        document.getElementById('result_lab_req_y18_y19_y20').innerHTML = "<span class='warning'>研究室配属条件を満たしていません．</span>"
    }
    // y21
    if (more90Checkbox_y21.checked && more110Checkbox_y21.checked && takeAllCheckbox_y21.checked){
        document.getElementById('result_lab_req_y21').innerHTML = "<span class='success'>研究室配属条件を満たしています．</span>"
    }else{
        document.getElementById('result_lab_req_y21').innerHTML = "<span class='warning'>研究室配属条件を満たしていません．</span>"
    }
  }
  // y18 y19 y20
  let more90Checkbox_y18_y19_y20 = document.getElementById('more90Checkbox_y18_y19_y20');
  let more110Checkbox_y18_y19_y20 = document.getElementById('more110Checkbox_y18_y19_y20');
  let takeAllCheckbox_y18_y19_y20 = document.getElementById('takeAllCheckbox_y18_y19_y20');
  more90Checkbox_y18_y19_y20.addEventListener('change', valueChange);
  more110Checkbox_y18_y19_y20.addEventListener('change', valueChange);
  takeAllCheckbox_y18_y19_y20.addEventListener('change', valueChange);
  // y21
  let more90Checkbox_y21 = document.getElementById('more90Checkbox_y21');
  let more110Checkbox_y21 = document.getElementById('more110Checkbox_y21');
  let takeAllCheckbox_y21 = document.getElementById('takeAllCheckbox_y21');
  more90Checkbox_y21.addEventListener('change', valueChange);
  more110Checkbox_y21.addEventListener('change', valueChange);
  takeAllCheckbox_y21.addEventListener('change', valueChange);

// セレクトボックスの値の変化によって表示を変更する関数をまとめて発火するための関数
const ChangeBySelect = () =>{
    TableChangeReqLab();
    admissionYearTableChange();
    TableChangeSubjectClassificationImage();
}

const admissionYearTableChange = () =>{
    // 入学年度選択による分岐
    const element = document.getElementById('select_admission_year');
    const options = element.options;
    hidingCompulsorySubjects(); // 表下の必修科目は全部非表示に．
    if(options[1].selected == true){
        // 2018年度入学
        befor2021ChengeGraduationReq();
        before2021GradeTableChange();
    }else if(options[2].selected == true){
        // 2019年度入学
        befor2021ChengeGraduationReq();
        before2021GradeTableChange();
    }else if(options[3].selected == true){
        // 2020年度入学
        befor2021ChengeGraduationReq();
        before2021GradeTableChange();
    }else if(options[4].selected == true){
        // 2021年度入学
        log("2021年度以降入学に対する処理")
        onAndAfter2021ChengeGraduationReq();
        onAndAfter2021GradeTableChange();
    }
}

const befor2021ChengeGraduationReq = () =>{
    // 必須単位数を2021年度より前の卒業要件に合わせる
    // 専門基礎
    document.getElementById('req_major_base').innerHTML = "8";
    const major_base = convertNum(document.getElementById('major_base').value);
    document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}`
    // 研究実験
    document.getElementById('req_experiment').innerHTML = "15";
    const experiment = convertNum(document.getElementById('experiment').value);
    document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}`
    // 数情等計
    document.getElementById('req_sub_total4').innerHTML = "36";
    const sub_total4 = convertNum(document.getElementById('sub_total4').textContent);
    document.getElementById('result_sub_total4').innerHTML=`${Math.max(36-sub_total4,0)}`
}

const onAndAfter2021ChengeGraduationReq = () =>{
    // 必須単位数を2021年度以降の卒業要件に合わせる
    // 専門基礎
    document.getElementById('req_major_base').innerHTML = "6";
    const major_base = convertNum(document.getElementById('major_base').value);
    document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}`
    // 研究実験
    document.getElementById('req_experiment').innerHTML = "16";
    const experiment = convertNum(document.getElementById('experiment').value);
    document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}`
    // 数情等計
    document.getElementById('req_sub_total4').innerHTML = "37";
    const sub_total4 = convertNum(document.getElementById('sub_total4').textContent);
    document.getElementById('result_sub_total4').innerHTML=`${Math.max(37-sub_total4,0)}`
}

const before2021GradeTableChange = () =>{
    // 2021年度より前に入学した学生対象の計算
    let element = document.getElementById('select_grade');
    let options = element.options;
    if(options[1].selected == true){
        // 1年
        before2021FirstTableChange();
        before2021DisplayedFirstCompulsorySubjects();
    }else if(options[2].selected == true){
        // 2年
        befor2021SecondTableChange();
        befor2021DisplayedSecondCompulsorySubjects();
    }else if(options[3].selected == true){
        // 3年
        befor2021ThirdTableChange();
        befor2021DisplayedThirdCompulsorySubjects();
    }else if(options[4].selected == true){
        // 4年
        befor2021FourthTableChange();
        befor2021DisplayedFourthCompulsorySubjects();
    }
}

const onAndAfter2021GradeTableChange = () =>{
    // 2021年度入学以降に入学した学生対象の計算
    let element = document.getElementById('select_grade');
    let options = element.options;
    if(options[1].selected == true){
        // 1年
        onAndAfter2021FirstTableChange();
        onAndAfter2021DisplayedFirstCompulsorySubjects();
    }else if(options[2].selected == true){
        // 2年
        onAndAfter2021SecondTableChange();
        onAndAfter2021DisplayedSecondCompulsorySubjects();
    }else if(options[3].selected == true){
        // 3年
        onAndAfter2021ThirdTableChange();
        onAndAfter2021DisplayedThirdCompulsorySubjects();
    }else if(options[4].selected == true){
        // 4年
        onAndAfter2021FourthTableChange();
        onAndAfter2021DisplayedFourthCompulsorySubjects();
    }
} 

const before2021FirstTableChange = () =>{
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに
    const options = element.options;
    // その中のoptionsだけを取ってくる
    // options[1] が前期 [2]が後期
    
    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(15)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(7)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(26)</span>`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}<span class='warning'>(8)</span>`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}<span class='warning'>(6)</span>`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}<span class='warning'>(2)</span>`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}<span class='warning'>(2)</span>`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}<span class='warning'>(8)</span>`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(15)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(4)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(22)</span>`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}<span class='warning'>(4)</span>`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}<span class='warning'>(4)</span>`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}<span class='warning'>(2)</span>`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}<span class='warning'>(1)</span>`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}<span class='warning'>(4)</span>`

    }
}

const befor2021SecondTableChange = () =>{
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに
    const options = element.options;
    // その中のoptionsだけを取ってくる
    // options[1] が前期 [2]が後期
    
    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(15)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(4)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(20)</span>`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}<span class='warning'>(2)</span>`

        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(13.5)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(2)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(10)</span>`

        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }
}

const befor2021ThirdTableChange = () =>{
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに
    const options = element.options;
    // その中のoptionsだけを取ってくる
    // options[1] が前期 [2]が後期
    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(12)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(2)</span>`
        
        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(10)</span>`
        
        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }
}

const befor2021FourthTableChange = () =>{
    let element = document.getElementById('select_term')
    let options = element.options;
    // options[1] が前期 [2]が後期

    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(8)</span>`
        
        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(15-experiment,0)}<span class='warning'>(4)</span>`

        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(8-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }
}

const onAndAfter2021FirstTableChange = () =>{
    // 2021年度入学以降の1年の計算式
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに
    const options = element.options;
    // その中のoptionsだけを取ってくる
    // options[1] が前期 [2]が後期
    
    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}<span class='warning'>(2)</span>`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}<span class='warning'>(8)</span>`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎 変更済み
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}<span class='warning'>(6)</span>`
        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}<span class='warning'>(2)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(7)</span>`

        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(16)</span>`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}<span class='warning'>(6)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(26)</span>`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(16)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(4)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(22)</span>`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}<span class='warning'>(4)</span>`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}<span class='warning'>(4)</span>`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}<span class='warning'>(2)</span>`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}<span class='warning'>(1)</span>`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}<span class='warning'>(2)</span>`

    }
}

const onAndAfter2021SecondTableChange = () =>{
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに
    const options = element.options;
    // その中のoptionsだけを取ってくる
    // options[1] が前期 [2]が後期
    
    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(16)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(4)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(20)</span>`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}<span class='warning'>(2)</span>`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(14)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(2)</span>`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}<span class='warning'>(10)</span>`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }
}

const onAndAfter2021ThirdTableChange = () =>{
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに
    const options = element.options;
    // その中のoptionsだけを取ってくる
    // options[1] が前期 [2]が後期
    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(12)</span>`

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}<span class='warning'>(2)</span>`
        
        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(10)</span>`
        
        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }
}

const onAndAfter2021FourthTableChange = () =>{
    let element = document.getElementById('select_term')
    let options = element.options;
    // options[1] が前期 [2]が後期

    if(options[1].selected == true){
        // 前期がドロップダウンで選択された
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(8)</span>`
        
        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }else if(options[2].selected == true){
        const experiment = convertNum(document.getElementById('experiment').value);
        // 研究実験
        document.getElementById('result_exp').innerHTML=`${Math.max(16-experiment,0)}<span class='warning'>(4)</span>`

        // __以下，全て今後の必修は無し．()を消して数字のみに．

        const ex = convertNum(document.getElementById('ex').value);
        // 総合力演習
        document.getElementById('result_ex').innerHTML=`${Math.max(7-ex,0)}`

        const core = convertNum(document.getElementById('core').value);
        // 知能情報コア
        document.getElementById('result_core').innerHTML = `${Math.max(26-core,0)}`

        const English = convertNum(document.getElementById('English').value);
        // 英語
        document.getElementById('result_eng').innerHTML=`${Math.max(8-English,0)}`

        const math_base = convertNum(document.getElementById('math_base').value);
        // 数学基礎
        document.getElementById('result_math_base').innerHTML=`${Math.max(6-math_base,0)}`

        const major_base = convertNum(document.getElementById('major_base').value);
        // 専門基礎
        document.getElementById('result_major_base').innerHTML=`${Math.max(6-major_base,0)}`

        const info = convertNum(document.getElementById('info').value);
        // 情報関係
        document.getElementById('result_info').innerHTML= `${Math.max(2-info,0)}`

        const info_tec = convertNum(document.getElementById('info_tec').value);
        // 情報技術
        document.getElementById('result_info_tec').innerHTML=`${Math.max(2-info_tec,0)}`

    }
}



const hidingCompulsorySubjects = () => {
    // 表下の必修科目を"全て"非表示にする関数
    for(let i=0;i<compulsoryIdList.length;i++){
        id = compulsoryIdList[i]
        if(document.getElementById(id).style.display != 'none'){
            // noneでないものをnoneに
            document.getElementById(id).style.display = 'none';
        }
    }
}

const before2021DisplayedFirstCompulsorySubjects = () =>{
    // 一年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('first_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('first_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}

const befor2021DisplayedSecondCompulsorySubjects = () =>{
    // 二年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('second_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('second_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}

const befor2021DisplayedThirdCompulsorySubjects = () =>{
    // 三年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('third_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('third_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}

const befor2021DisplayedFourthCompulsorySubjects = () =>{
    // 四年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('fourth_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('fourth_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}

const onAndAfter2021DisplayedFirstCompulsorySubjects = () =>{
    // y21以降入学の1年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('y21_first_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('y21_first_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}

const onAndAfter2021DisplayedSecondCompulsorySubjects = () =>{
    // y21以降入学の1年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('y21_second_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('y21_second_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}


const onAndAfter2021DisplayedThirdCompulsorySubjects = () =>{
    // y21以降入学の1年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('y21_third_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('y21_third_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}

const onAndAfter2021DisplayedFourthCompulsorySubjects = () =>{
    // y21以降入学の1年次の必修科目を表下に表示する関数
    let Compulsory_element = document.getElementById('y21_fourth_year_Compulsory');    
    let Second_Compulsory_element = document.getElementById('y21_fourth_year_2nd_Compulsory');
    
    Compulsory_element.style.display = 'block';
    Second_Compulsory_element.style.display = 'block';
    // 前期後期未選択時には前期後期の必修科目どちらも表示するように
    const element = document.getElementById('select_term')
    // セレクト要素を全部elementに格納
    const options = element.options;
    // その中のoptions要素だけを取ってくる
    // options[1]が前期 [2]が後期を指す

    if(options[1].selected == true){
        // 前期
        Compulsory_element.style.display = 'block';
        Second_Compulsory_element.style.display = 'none';
    }else if(options[2].selected == true){
        // 後期
        Compulsory_element.style.display = 'none';
        Second_Compulsory_element.style.display = 'block';
    }
}

const confirmDeleteValue = () => {
    value = window.confirm("本当に削除してよろしいでしょうか？");
    if(value){
        deleteValue();
    }
}

const deleteValue = () =>{
    localStorage.clear();
    // localStorageの値を全削除
    location.reload();
    // ページを再読み込みし，入学年度選択画面へ
}
const saveValue = () =>{
    json = generateJson();
    localStorage.setItem("TKG",JSON.stringify(json));
    log("saveValue");
}

const setValue = (json) =>{
    log("setValue");
    // log(json == null)
    if(json != null){
        for(let i=0;i<idList.length;i++){
            id=idList[i]
            document.getElementById(id).value=json[id]
        }
        const options = document.getElementById("select_admission_year").options;
        if(options[json["admission_year"]] != undefined){
            options[json["admission_year"]].selected = true;//入学年度の復元
            // 値を削除した後，pdfを読み込もうとすると，このadmission_yearでエラー起きます．
            // setValuesFromPdfObject でadmission_year抜きの科目群だけのobjが引数で渡されるから，
            // undefinedになる．だからadmission_yearがないときは
            document.getElementById("select_admission_year").onchange();
        }
    }
}

const generateJson = () =>{
    obj={}
    //入学年度の追加
    const options = document.getElementById("select_admission_year").options;
    console.log(options.length);
    for(let i=0;i<options.length;i++){
        log(options[i])
        if(options[i].selected==true){
            obj["admission_year"] = i;
            log(`選択された学年の番号(admission_year)は${obj["admission_year"]}`)
        }
    }
    //単位要素の追加
    for(let i=0;i<idList.length;i++){
        id=idList[i]
        value=document.getElementById(id).value
        obj[id] = value;
    }
    return obj;
}

const TableChangeReqLab = () =>{
    // 研究室配属条件の表示非表示切り替え
    let element_admission_year = document.getElementById('select_admission_year')
    let options_admission_year = element_admission_year.options;

    let req_lab_y18_y19_y20_element = document.getElementById('req_lab_y18_y19_y20')
    let req_lab_y21_element = document.getElementById('req_lab_y21')

    if(options_admission_year[1].selected == true){
        req_lab_y18_y19_y20_element.style.display = 'block';
        req_lab_y21_element.style.display = 'none';
    }else if(options_admission_year[2].selected == true){
        req_lab_y18_y19_y20_element.style.display = 'block';
        req_lab_y21_element.style.display = 'none';
    }else if(options_admission_year[3].selected == true){
        req_lab_y18_y19_y20_element.style.display = 'block';
        req_lab_y21_element.style.display = 'none';
    }else if(options_admission_year[4].selected == true){
        req_lab_y18_y19_y20_element.style.display = 'none';
        req_lab_y21_element.style.display = 'block';
    }
}

const TableChangeSubjectClassificationImage = () =>{
    // 専門科目分類表の表示非表示切り替え
    let element_admission_year = document.getElementById('select_admission_year')
    let options_admission_year = element_admission_year.options;

    let y19_subject_classification_image_element = document.getElementById('y19_subject_classification_image')
    let y21_subject_classification_image_element = document.getElementById('y21_subject_classification_image')

    if(options_admission_year[1].selected == true){
        y19_subject_classification_image_element.style.display = 'block';
        y21_subject_classification_image_element.style.display = 'none';
    }else if(options_admission_year[2].selected == true){
        y19_subject_classification_image_element.style.display = 'block';
        y21_subject_classification_image_element.style.display = 'none';
    }else if(options_admission_year[3].selected == true){
        y19_subject_classification_image_element.style.display = 'block';
        y21_subject_classification_image_element.style.display = 'none';
    }else if(options_admission_year[4].selected == true){
        y19_subject_classification_image_element.style.display = 'none';
        y21_subject_classification_image_element.style.display = 'block';
    }
}

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
    obj={}
    for (let i=0;i<objectArray.length;i++){
        let baseObject = objectArray[i];
        if(baseObject.str==pdfIdList[target]){//スタートを探す
            log("match:"+baseObject.str);
            const basePos = baseObject.transform.slice(4);
            let value = 0;
            for(let j = i+1;j<objectArray.length;j++){
                const targetObject = objectArray[j];
                const targetPos = targetObject.transform.slice(4);
                /*
                545.4788          :左側の科目名
                628.2959 82.8171  :必修単位
                662.3119 116.8331 :取得単位
                667.8221 122.3433 :右側の科目名
                */

                const posDiff = targetPos[0]-basePos[0];
                if(Math.abs(basePos[1]-targetPos[1])<4){
                    if(PDFWIDTHMAX>posDiff&&posDiff>PDFWIDTHMIN){
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
}
              
document.getElementById("pdfInput").onchange = function(event) {

    let file = event.target.files[0];
    let fileReader = new FileReader();  

    fileReader.onload = function() {

        let typedarray = new Uint8Array(this.result);

        const loadingTask = pdfjsLib.getDocument(typedarray);
        loadingTask.promise.then(pdf => {
            log("pdf loaded");
            pdf.getPage(1).then(page =>{
                log("page loaded");
                page.getTextContent().then(textContent =>{
                    setValuesFromPdfObject(textContent);
                });
            });
        });
    };
    fileReader.readAsArrayBuffer(file);
}

const DisplayTable = () =>{
    // let below_the_select = document.getElementById("below_the_select")
    // below_the_select.display = 'block';
 
    // let table_below_the_select = document.getElementById("table_below_the_select")
    // table_below_the_select.style.display = 'table-row';
    // // 年次選択以外のドロップダウンを表示↓↓
    let below_the_select = document.getElementById("below_the_select");
    below_the_select.style.opacity = 1;
    
    
    // Tableを表示↓↓
    let tableElement = document.querySelector('table');
    // querySelector()指定されたセレクターまたはセレクターのグループに一致する
    // 文書内の最初の Elementを返す
    tableElement.className -= 'd-none';
    // // 全部消しているd-noneクラスを取ることでいろいろ表示させる

    // 年次選択のドロップダウンを削除↓↓
    let aboveTheTableElement = document.querySelector('#Above_the_table');
    aboveTheTableElement.className += 'd-none';
    
}

