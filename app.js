function convertNum(n){
    n = n || '0'
    return parseInt(n)
}

function calc() {
    const jinbun = convertNum(document.getElementById('jinbun').value);
    const syakai = convertNum(document.getElementById('syakai').value);
    const sougou = convertNum(document.getElementById('sougou').value);
    const career = convertNum(document.getElementById('career').value);
    const ryudai = convertNum(document.getElementById('ryudai').value);
    const sougouryouiki = sougou+career+ryudai;
    const Japanese = convertNum(document.getElementById('Japanese').value);
    const subTotal1 = jinbun + syakai + sougouryouiki;
    const sizen = convertNum(document.getElementById('sizen').value);
    const subTotal2 = subTotal1 + sizen;
    const info = convertNum(document.getElementById('info').value);
    const English = convertNum(document.getElementById('English').value);
    const German = convertNum(document.getElementById('German').value);
    const French = convertNum(document.getElementById('French').value);
    const Spanish = convertNum(document.getElementById('Spanish').value);
    const Chinese = convertNum(document.getElementById('Chinese').value);
    const etc = convertNum(document.getElementById('etc').value);
    const foreignTotal = English; //+ German + French + Spanish + 
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
    const common_engineering = convertNum(document.getElementById('common_engineering').value);
    const free = convertNum(document.getElementById('free').value);
    const teacher = convertNum(document.getElementById('teacher').value);


    document.getElementById('result_jinbun').value=Math.max(2-jinbun,0);
    document.getElementById('result_syakai').value=Math.max(2-syakai,0);
    document.getElementById('result_sougouryouiki').value=Math.max(2-sougouryouiki,0);
    document.getElementById('subtotal1').value=subTotal1;
    document.getElementById('result_subtotal1').value=Math.max(12-subTotal1,0);
    document.getElementById('subtotal2').value=subTotal2;
    document.getElementById('result_subtotal2').value=Math.max(14-subTotal2,0);
    document.getElementById('result_info').value=Math.max(2-info,0);
    document.getElementById('foreignTotal').value=foreignTotal;
    document.getElementById('result_foreignTotal').value=Math.max(12-foreignTotal,0);
    //document.getElementById('English').value=Math.max(2-English,0);

    const sum_sougouryouiki = document.getElementById('sougouryouiki').value = parseInt(sougou) + parseInt(career) + parseInt(ryudai);

    if (sum_sougouryouiki > 2) {
        document.getElementById('result_sougouryouiki').value = 0;
    }else{
        document.getElementById('result_sougouryouiki').value = 2 - parseInt(sum_sougouryouiki);
    }
    /*
    if (Japanese > 2) {
        document.getElementById('result_Japanese').value = 0;
    }else{
        document.getElementById('result_Japanese').value = 2 - parseInt(sum_sougouryouiki);
    }
    */
    
}

const next_input = (id) => {
    if( window.event.keyCode == 13 ){        // 13は0x0d(CRキー)
        // 次のテキストボックスへ飛ばす処理
        // window.alert('エンター押された')
        document.getElementById(id).focus();
        
    }
};
