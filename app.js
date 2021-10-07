function convertNum(n){
    n = n || '0'
    return parseInt(n)
}

function calc() {
    const health = convertNum(document.getElementById('health').value);
    const jinbun = convertNum(document.getElementById('jinbun').value);
    const syakai = convertNum(document.getElementById('syakai').value);
    const sougou = convertNum(document.getElementById('sougou').value);
    const career = convertNum(document.getElementById('career').value);
    const ryudai = convertNum(document.getElementById('ryudai').value);
    const sougouryouiki = sougou+career+ryudai;
    const Japanese = convertNum(document.getElementById('Japanese').value);
    const subTotal1 = jinbun + syakai + sougouryouiki;
    // 小計1
    const sizen = convertNum(document.getElementById('sizen').value);
    const subTotal2 = subTotal1 + sizen;
    // 小計2
    const info = convertNum(document.getElementById('info').value);
    const English = convertNum(document.getElementById('English').value);
    const German = convertNum(document.getElementById('German').value);
    const French = convertNum(document.getElementById('French').value);
    const Spanish = convertNum(document.getElementById('Spanish').value);
    const Chinese = convertNum(document.getElementById('Chinese').value);
    const etc = convertNum(document.getElementById('etc').value);
    const sum_second =  parseInt(German) + parseInt(French) + parseInt(Spanish) + parseInt(Chinese) + parseInt(etc);
    const foreignTotal = English + German + French + Spanish + Chinese + etc;
    const total1 = health + subTotal2 + info + foreignTotal;
    // 共通計
    const major_base = convertNum(document.getElementById('major_base').value);
    const out_major_base = convertNum(document.getElementById('out_major_base').value);
    const info_tec = convertNum(document.getElementById('info_tec').value);
    const ex = convertNum(document.getElementById('ex').value);
    const experiment = convertNum(document.getElementById('experiment').value);
    const math_base = convertNum(document.getElementById('math_base').value);
    const core = convertNum(document.getElementById('core').value);
    const fusion = convertNum(document.getElementById('fusion').value);
    const math_base_select = convertNum(document.getElementById('math_base_select').value);
    const adv = convertNum(document.getElementById('adv').value);
    const relation = convertNum(document.getElementById('relation').value);
    const subTotal3 = math_base_select + adv + relation;
    // 数情計
    const common_engineering = convertNum(document.getElementById('common_engineering').value);
    const free = convertNum(document.getElementById('free').value);
    const teacher = convertNum(document.getElementById('teacher').value);
    const subTotal4 = fusion + subTotal3 + common_engineering + free + teacher; 
    // 数情統計
    const total2 = info_tec + ex + experiment + math_base + core + subTotal4;
    // 専門計
    const All_total = total1 + total2 + major_base;
    // 合計 共通30 + 専門計92 + 専門基礎8 = 130

    document.getElementById('result_health').textContent=Math.max(2-health,0);
    document.getElementById('result_jinbun').textContent=Math.max(2-jinbun,0);
    document.getElementById('result_syakai').textContent=Math.max(2-syakai,0);
    document.getElementById('sougouryouiki').textContent = sougouryouiki;
    document.getElementById('result_sougouryouiki').textContent=Math.max(2-sougouryouiki,0);
    document.getElementById('subtotal1').textContent=subTotal1;
    document.getElementById('result_subtotal1').textContent=Math.max(12-subTotal1,0);
    document.getElementById('subtotal2').textContent=subTotal2;
    
    let subtotal_judge = false;
    if(subTotal2 >= 14){
        if(document.getElementById('result_jinbun').textContent==0 && document.getElementById('result_syakai').textContent==0 &&  document.getElementById('result_sougouryouiki').textContent==0){
            // 人文2社会2総合2が14単位の必要条件
            subtotal_judge = true;
        }
        
    }
    document.getElementById('result_subtotal2').textContent=Math.max(14-subTotal2,0);
    
    if (sougouryouiki > 2) {
        document.getElementById('result_sougouryouiki').textContent = 0;
    }else{
        document.getElementById('result_sougouryouiki').textContent = 2 - parseInt(sougouryouiki);
    }
    /*
    if (Japanese > 2) {
        document.getElementById('result_Japanese').value = 0;
    }else{
        document.getElementById('result_Japanese').value = 2 - parseInt(sum_sougouryouiki);
    }
    */

    // ここまで小計2__________________________________________________________________
    
    document.getElementById('result_info').textContent=Math.max(2-info,0);
    
    document.getElementById('result_eng').textContent=Math.max(8-English,0);

    document.getElementById('result_german').textContent=Math.max(4-German,0);
    document.getElementById('result_french').textContent=Math.max(4-French,0);
    document.getElementById('result_spanish').textContent=Math.max(4-Spanish,0);
    document.getElementById('result_chinese').textContent=Math.max(4-Chinese,0);
    document.getElementById('result_etc').textContent=Math.max(4-etc,0);
    document.getElementById('sum_second').textContent = sum_second;
    
    let second_foreign_judge = false;
    // 第二言語は一つの科目から4単位以上取得する必要がある部分の判定処理
    if(parseInt(German) >=4 || parseInt(French) >=4 || + parseInt(Spanish) >=4 || + parseInt(Chinese)>=4 || parseInt(etc)>=4){
        // 合計で4ではなく，一つの言語を4単位以上あるかを確かめる
        second_foreign_judge = true; // 第二言語の条件を満たした foreignTotalで使用する．
        document.getElementById('result_second').textContent = 0;
        console.log("第二言語満たした")
    }else{
        if (sum_second >= 4){
            // 一つの科目群から4単位以上でなかったとしても，とりあえずマイナスにならないように合計が4超えた時も0とする
            document.getElementById('result_second').innerHTML = "0 <br> <span class='warning'>第二言語は合計で4単位以上ではなく，<br> 1つの言語から4単位取得する必要があります．</span>"
        }else{
            document.getElementById('result_second').textContent = Math.max(4-sum_second,0)
        }
        
    }

    document.getElementById('foreignTotal').textContent=foreignTotal;
    document.getElementById('result_foreignTotal').textContent=Math.max(12-foreignTotal,0);
    
    

    console.log(English);
    console.log(second_foreign_judge);
    // foreignTotalが英語12か英語8と外国語4かどうか出力する
    if(foreignTotal >= 12){
        if(English >= 12){
            document.getElementById('result_foreignTotal').innerHTML = "0 <span class='success'><br> 英語12単位で満たされています，</span>";
            console.log("英語12");
        }else if(English >= 8 && second_foreign_judge == true){
        // 英語8単位以上かつ，第二言語1つを4単位以上とっているならば
            document.getElementById('result_foreignTotal').innerHTML = "0 <span class='success'><br> 英語8単位，第二言語4単位で満たされています．</span>"
            console.log("英語8と第二言語4")
        }else{
            document.getElementById('result_foreignTotal').innerHTML = "0 <span class='warning'><br> 言語の取得条件を満たしていません．</span>"
            
        }
    }

    // ここまで言語__________________________________________________________________

    
    document.getElementById('total1').textContent=total1;
    if (total1 >= 30) {
        console.log(`ヘルス${document.getElementById('result_health').textContent} ,小計2${document.getElementById('result_subtotal2').textContent}, 情報${document.getElementById('result_info').textContent}, 外国語計${document.getElementById('result_foreignTotal').textContent}`)
        if(Math.max(2-health,0) == 0 && Math.max(14-subTotal2,0) == 0 && Math.max(2-info,0) == 0 && Math.max(12-foreignTotal,0) == 0 && subtotal_judge == true){
            // 注意文とか追加したから document.getElementById == 0の比較はできなくなってしまった
            // 2 + 14 + 2 + 12 = 30 で条件を満たしているならば，
            document.getElementById('result_total1').innerHTML = "0 <span class='success'><br> 30単位の条件を満たしています</span>"
            console.log("共通30満たした．")
        }else{
            document.getElementById('result_total1').innerHTML = "0 <span class='warning'><br>上の各条件を確認してください．</span>"
            // マイナスにならないよう取得単位が30を超えたら0にしておくが，条件を満たせていないという注意を表示
            console.log("共通30の条件に合っていない")
            
        }
    }else{
        document.getElementById('result_total1').innerHTML = ""
        // innerHTMLのリセット
    }

    // ここまで共通__________________________________________________________________
    
    document.getElementById('result_major_base').textContent=Math.max(8-major_base,0);
    
    let info_tec_judge = false;
    document.getElementById('result_info_tec').textContent=Math.max(2-info_tec,0); 
    if(Math.max(2-info_tec,0) == 0){
        // 情報技術の不足単位が0ならば
        info_tec_judge = true;
    }

    let ex_judge = false;
    document.getElementById('result_ex').textContent=Math.max(7-ex,0); 
    if(document.getElementById('result_ex').textContent == 0){
        // 総合力演習の不足単位が0ならば
        ex_judge = true;
    }

    let exp_judge = false;
    document.getElementById('result_exp').textContent=Math.max(15-experiment,0);
    if(Math.max(15-experiment,0) == 0){
        // 研究実験の不足単位が0ならば
        exp_judge = true;
    }

    let math_base_judge = false;
    document.getElementById('result_math_base').textContent=Math.max(6-math_base,0);
    if(Math.max(6-math_base,0) == 0){
        // 数学基礎の不足単位が0ならば
        math_base_judge = true;
    }

    let core_judge = false;
    document.getElementById('result_core').textContent=Math.max(26-core,0);
    if(Math.max(26-core,0) == 0){
        // 知能情報コアの不足単位が0ならば
        core_judge = true;
    }

    document.getElementById('result_fusion').textContent=Math.max(4-fusion,0);
    
    let fusion_judge = false;// subTotal4の判定に使う
    if(Math.max(4-fusion,0) == 0){
        // 工学融合を4単位以上取得しているならば．
        // 同じ科目群から取っているかはどうやって判定すれば，，，，，
        fusion_judge = true;
    }

    document.getElementById('sub_total3').textContent = subTotal3;
    document.getElementById('result_sub_total3').textContent = Math.max(22-subTotal3,0);
    // ここまで数情計__________________________________________________________________
    document.getElementById('sub_total4').textContent = subTotal4;
    document.getElementById('result_sub_total4').textContent = Math.max(36-subTotal4,0);
    if(subTotal4 >= 36){
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
        // 36超えてないなら
        document.getElementById('result_sub_total4').innerHTML = ""
        // innerHTMLをリセットして，
        document.getElementById('result_sub_total4').textContent = Math.max(36-subTotal4,0);
        // 再設定
    }


    // ここまで数情等計__________________________________________________________________
    
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
        }else if(subTotal4 <= 36){
            // 92超えてるが，数情統計36単位を満たしていない
            document.getElementById('result_total2').innerHTML = "0 <span class='warning'><br>数情統計の単位が不足しています．</span>"
        }else{
            // おそらく全部満たしている．．
            document.getElementById('result_total2').textContent = 0
        }
    }
    // ここまで専門計__________________________________________________________________
    document.getElementById('all_total').textContent = All_total;
    document.getElementById('result_all_total').textContent = Math.max(130-All_total,0);

}

const next_input = (id) => {
    if( window.event.keyCode == 13 ){        // 13は0x0d(CRキー)
        // 次のテキストボックスへ飛ばす処理
        // window.alert('エンター押された')
        document.getElementById(id).focus();
        
    }
};
