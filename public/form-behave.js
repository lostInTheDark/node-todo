let inputs = document.querySelectorAll('.input-field input');
let inputLabels = document.querySelectorAll('.input-field label');

let inputsNum = inputs.length;

window.addEventListener('load', ()=>{
    for(let i = 0; i < inputsNum; ++i){
        if(inputs[i].value){
            inputLabels[i].classList.add('active');
        }
    }
});

for(let i = 0; i < inputsNum; ++i){
    inputs[i].addEventListener('focus', ()=>{
        inputLabels[i].classList.add('active');
    });

    inputs[i].addEventListener('blur', ()=>{
        if(!inputs[i].value){
            inputLabels[i].classList.remove('active');
        }
    });
}
