// function buildFunction() {
//     var arr = [];

//     for (let index = 0; index < 3; index++) {
//       arr.push(function () {
//         console.log(index);
//       });
//     }
//     return arr;
//   }

//   var fs = buildFunction();

//   fs[0]();
//   fs[1]();
//   fs[2]();

function buildFunction() {
  var arr = [];

  for (var index = 0; index < 3; index++) {
    (function (idx) {
      arr.push(function () {
        console.log(this);
        console.log(idx);
      });
    })(index);
  }
  return arr;
}
var fs = buildFunction();

//   var fs = buildFunction();

fs[0]();
fs[1]();
fs[2]();
