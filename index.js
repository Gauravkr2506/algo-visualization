var arr = [];
var bubble_sort_highlight_index = null;
var selection_sort_highlight_index1 = null;
var selection_sort_highlight_index2 = null;
var selection_sort_highlight_index3 = null;
var search_index = null;
var type = null;
var time = 300;

function initializeValue() {
  bubble_sort_highlight_index = null;
  selection_sort_highlight_index1 = null;
  selection_sort_highlight_index2 = null;
  selection_sort_highlight_index3 = null;
  search_index = null;
  type = null;
}

async function Search() {
  initializeValue();
  type = "linear_search";
  var search_value = prompt("Please enter value to search", "5");
  if (!!search_value) {
    var n = arr.length;
    var i = 0;
    var found = false;
    for (; i < n; i++) {
      search_index = i;
      await showDisplay();
      if (search_value == arr[i]) {
        found = true;
        break;
      }
    }
    if (found) {
      setTimeout(() => {
        alert(search_value + " is  found on index position" + i);
      }, 1000);
    } else {
      search_index = null;
      await showDisplay();
      alert(search_value + " is not found in this array");
    }
  } else {
    alert("please enter value");
    Search();
  }
}

async function BinarySearch() {
  initializeValue();
  type = "search";
  var search_value = prompt("Please enter value to search", "5");
  if (!!search_value) {
    arr = arr.sort((a, b) => a - b);
    var found = false;
    var midIndex;
    var lowIndex = 0;
    var highIndex = arr.length - 1;
    while (lowIndex <= highIndex) {
      midIndex = Math.floor((lowIndex + highIndex) / 2);
      search_index = midIndex;
      await showDisplay();
      if (arr[midIndex] == search_value) {
        found = true;
        break;
      } else if (arr[midIndex] < search_value) {
        lowIndex = midIndex + 1;
      } else {
        highIndex = midIndex - 1;
      }
    }
    if (found) {
      setTimeout(() => {
        alert(search_value + " is  found on index position" + midIndex);
      }, 1000);
    } else {
      search_index = null;
      await showDisplay();
      alert(search_value + " is not found in this array");
    }
  } else {
    alert("please enter value");
    Search();
  }
}

async function bubbleSort() {
  initializeValue();
  type = "bubble_sort";
  let len = arr.length;
  let swapped;
  do {
    swapped = false;
    for (i = 0; i < len - 1; i++) {
      bubble_sort_highlight_index = i;
      await showDisplay();
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
      }
      bubble_sort_highlight_index = null;

      await showDisplay();
    }
  } while (swapped);
  i = null;
  showDisplay();
}

async function selectionSort() {
  initializeValue();
  type = "selection_sort";
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    selection_sort_highlight_index3 = i;
    let min = i;
    selection_sort_highlight_index1 = min;
    for (let j = i + 1; j < len; j++) {
      selection_sort_highlight_index2 = j;
      if (arr[min] > arr[j]) {
        await showDisplay();
        min = j;
        selection_sort_highlight_index1 = min;
      }
      await showDisplay();
    }
    if (min !== i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
    }
    await showDisplay();
  }
  selection_sort_highlight_index1 = null;
  selection_sort_highlight_index2 = null;
  selection_sort_highlight_index3 = null;
  await showDisplay();
}

async function showDisplay() {
  await wait();
  clearDisplay();
  var display = document.getElementById("display");
  arr.forEach(function(v, index, a) {
    var div = document.createElement("div");
    div.innerHTML = v;
    div.style.height = v * 15;
    div.style["backgroundColor"] = "black";
    div.classList.add("bar");

    if (
      //bubble sort highlight condition
      bubble_sort_highlight_index !== null &&
      type === "bubble_sort" &&
      (index == bubble_sort_highlight_index ||
        index == bubble_sort_highlight_index + 1)
    ) {
      div.style["backgroundColor"] = "red";
    } else if (
      //selection sort highlight condition
      type === "selection_sort" &&
      (index === selection_sort_highlight_index1 ||
        index === selection_sort_highlight_index2 ||
        index === selection_sort_highlight_index3)
    ) {
      div.style["backgroundColor"] = "red";
    } else if (
      //search highlight condition
      type === "search" &&
      index === search_index
    ) {
      div.style["backgroundColor"] = "red";
    }

    display.appendChild(div);
  });
}

function clearDisplay() {
  var display = document.getElementById("display");
  var child = display.lastElementChild;
  while (child) {
    display.removeChild(child);
    child = display.lastElementChild;
  }
}

function wait() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, time);
  });
}

function changeSpeed() {
  var myRange = document.getElementById("myRange").value;
  time = (100 / myRange) * 50;
}

function arrayGenerator() {
  var arr_length = document.getElementById("my_array").value;
  document.getElementById("array").innerHTML = "Array Size :" + arr_length;
  arr = Array.from(
    { length: arr_length },
    () => Math.floor(Math.random() * 30) + 1
  );
  showDisplay();
}

function LoadData() {
  arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
  showDisplay();
}
