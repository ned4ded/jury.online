// (function() {
//   const $diagram = () => $('#fees-diagram');
//   const wholeW = $diagram().width();
//   const startW = (window.getComputedStyle(document.querySelector('#fees-diagram'), ':before').width).replace(/\D/g,'');
//   const finishW = 100 - (window.getComputedStyle(document.querySelector('#fees-diagram'), ':after').width) / wholeW;
//   const percent = Number($diagram().attr('data-complete-percent'));
//
//   return $(document).ready(() => {
//     console.log(startW + " " + finishW);
//     if(percent < (wholeW/startW)) {
//
//     }
//   });
// }());
