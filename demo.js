function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      // 标记是否进行了交换，用于优化
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        // 比较相邻元素
        if (arr[j] > arr[j + 1]) {
          // 交换元素
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        }
      }
      // 如果没有发生交换，则说明数组已经有序，结束排序
      if (!swapped) break;
    }
    return arr;
  }
  
  // 示例
  let arr = [64, 34, 25, 12, 22, 11, 90];
  bubbleSort(arr);
  console.log("Sorted array:", arr);
