function calc(jinbun) {
    if (jinbun > 2) {
        const jinbun_value = document.getElementById('result_jinbun').value = 0;
    }else{
        const jinbun_value = document.getElementById('result_jinbun').value = 2 - parseInt(jinbun);
    }
}