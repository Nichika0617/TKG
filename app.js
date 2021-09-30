function calc(jinbun, syakai, sougou,  career, ryudai) {
    //const jinbun = document.getElementById('jinbun');
    //const syakai = document.getElementById('syakai');
    const sougouryouiki = document.getElementById('sougouryouiki');

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

    if (Japanese > 2) {
        document.getElementById('result_Japanese').value = 0;
    }else{
        document.getElementById('result_Japanese').value = 2 - parseInt(sum_sougouryouiki);
    }

    
}