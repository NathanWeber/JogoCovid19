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
    console.log({nota})

}

// function calculaPontuacao(formId, respostas){
//     var inputs = document.getElementById(formId).elements;
//     var perguntas = inputs[0];
//     console.log({perguntas})
//     var alts = perguntas.elements;
//     console.log({alts: alts[0]})
//     let nota = 0;
//     respostas.forEach(resp => {
//         if(resp.certo) nota += resp.peso;
//     });
//     console.log({nota})
//     return nota
// }