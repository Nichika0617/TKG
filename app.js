function calc(jinbun, syakai, sougou,  career, ryudai) {
    if (jinbun > 2) {
        const jinbun_value = document.getElementById('result_jinbun').value = 0;
    }else{
        const jinbun_value = document.getElementById('result_jinbun').value = 2 - parseInt(jinbun);
    }

    if (syakai > 2) {
        const syakai_value = document.getElementById('result_syakai').value = 0;
    }else{
        const syakai_value = document.getElementById('result_syakai').value = 2 - parseInt(syakai);
    }

    const sum_sougouryouiki = document.getElementById('sougouryouiki').value = parseInt(sougou) + parseInt(career) + parseInt(ryudai);

    if (sum_sougouryouiki > 2) {
        const sougouryouiki_value = document.getElementById('result_sougouryouiki').value = 0;
    }else{
        const sougouryouiki_value = document.getElementById('result_sougouryouiki').value = 2 - parseInt(sum_sougouryouiki);
    }
}