let nota = 0;
const contabilizadas = [];

function calculaPontuacao(key, peso, certo){
    console.log({key, peso, certo,nota})
    if(certo){
        if(!contabilizadas.includes(key)) {
            contabilizadas.push(key)
            nota +=peso;
        }
    } else{
        if(contabilizadas.includes(key)) {
            contabilizadas.pop(key)
            nota -=peso;
        }
    }
    document.getElementById("nota").value = nota
    console.log({nota})
}