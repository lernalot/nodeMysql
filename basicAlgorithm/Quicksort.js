function quickSort(arr) {
   if(arr){
      if(arr.length <1){
         return arr;
      }
      var pivotIndex = Math.floor(arr.length/2);
      var pivot = arr[pivotIndex];
      var left = [];
      var right = [];
      for(var i = 0;i<arr.length;i++){
         if(arr[i] <pivot){
            left.push(arr[i])
         }else if(arr[i]>pivot){
            right.push(arr[i])
         }
      }
      return quickSort(left).concat(pivot,quickSort(right));
   }
}
console.log(quickSort([2,5,45,5,8,6,3,1]));

module.exports = {
   quickSort:quickSort()
};