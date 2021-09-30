function calc() {
    const jinbun = parseInt(document.getElementById('jinbun').value);
    const syakai = parseInt(document.getElementById('syakai').value);
    const sougouryouiki = parseInt(document.getElementById('sougouryouiki'));
    console.log(jinbun);
    if (jinbun > 2) {
        document.getElementById('result_jinbun').value = 0;
    }else{
        document.getElementById('result_jinbun').value = 2 - parseInt(jinbun);
    }

    if (syakai > 2) {
        document.getElementById('result_syakai').value = 0;
    }else{
        document.getElementById('result_syakai').value = 2 - parseInt(syakai);
    }

    const sum_sougouryouiki = document.getElementById('sougouryouiki').value = parseInt(sougou) + parseInt(career) + parseInt(ryudai) + 0;

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
