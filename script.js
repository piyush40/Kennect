let originalArray = []; // Array to store the original state
let bars = []; // Array to store bar values
let animationSpeed = 50; // Default animation speed
let canvasWidth = 1000; // Default canvas width
let canvasHeight = 500; // Default canvas height

function generateBars() {
  originalArray = Array.from(
    { length: Math.floor(Math.random() * 6) + 10 },
    () => Math.floor(Math.random() * 100) + 1
  );
  bars = [...originalArray]; // Copy the original array
  drawChart();
}

function drawChart() {
  const visualizationContainer = document.getElementById(
    "visualization-container"
  );
  const arrayInfo = document.getElementById("array-info");
  const canvas = document.getElementById("array-chart");
  const ctx = canvas.getContext("2d");
  const totalBars = bars.length;
  const gap = 6; // Adjust the gap between bars

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const barWidth = (canvasWidth - gap * (totalBars - 1)) / totalBars;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bars.forEach((bar, index) => {
    const x = (barWidth + gap) * index;
    const y = canvasHeight - bar * (canvasHeight / 100);
    ctx.fillStyle = "#3498db";
    ctx.fillRect(x, y, barWidth, bar * (canvasHeight / 100));
    ctx.strokeStyle = "#2980b9";
    ctx.strokeRect(x, y, barWidth, bar * (canvasHeight / 100));

    // Display random array numbers below the bar line
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.fillText(bar, x + barWidth / 2 - 5, y + 12);
  });

  // Display array info above the array
  arrayInfo.innerHTML = bars.join(" ");

  // Ensure the info is visible
  arrayInfo.style.display = "block";
}

function randomizeArray() {
  bars = [...originalArray]; // Reset bars to the original state
  drawChart();
}

// Rest of the code remains unchanged...

async function insertionSort() {
  const len = bars.length;
  for (let i = 1; i < len; i++) {
    let current = bars[i];
    let j = i - 1;
    while (j >= 0 && bars[j] > current) {
      bars[j + 1] = bars[j];
      j--;
      drawChart();
      await delay(animationSpeed);
    }
    bars[j + 1] = current;
    drawChart();
    await delay(animationSpeed);
  }
}

async function selectionSort() {
  const len = bars.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (bars[j] < bars[minIndex]) {
        minIndex = j;
      }
    }
    swap(bars, i, minIndex);
    drawChart();
    await delay(animationSpeed);
  }
}

async function bubbleSort() {
  const len = bars.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (bars[j] > bars[j + 1]) {
        swap(bars, j, j + 1);
        drawChart();
        await delay(animationSpeed);
      }
    }
  }
}

async function quickSort(start = 0, end = bars.length - 1) {
  if (start < end) {
    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
  }
}

async function partition(start, end) {
  const pivotValue = bars[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (bars[i] < pivotValue) {
      swap(bars, i, pivotIndex);
      pivotIndex++;
      drawChart();
      await delay(animationSpeed);
    }
  }
  swap(bars, pivotIndex, end);
  drawChart();
  await delay(animationSpeed);
  return pivotIndex;
}

async function mergeSort(start = 0, end = bars.length - 1) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }
}

async function merge(start, mid, end) {
  const left = bars.slice(start, mid + 1);
  const right = bars.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      bars[k++] = left[i++];
    } else {
      bars[k++] = right[j++];
    }
    drawChart();
    await delay(animationSpeed);
  }

  while (i < left.length) {
    bars[k++] = left[i++];
    drawChart();
    await delay(animationSpeed);
  }

  while (j < right.length) {
    bars[k++] = right[j++];
    drawChart();
    await delay(animationSpeed);
  }
}

async function shellSort() {
  const len = bars.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      const temp = bars[i];
      let j;
      for (j = i; j >= gap && bars[j - gap] > temp; j -= gap) {
        bars[j] = bars[j - gap];
        drawChart();
        await delay(animationSpeed);
      }
      bars[j] = temp;
      drawChart();
      await delay(animationSpeed);
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeSize() {
  const newSize = parseInt(prompt("Enter new bar size (e.g., 10):"));
  if (!isNaN(newSize) && newSize > 0) {
    bars = Array.from(
      { length: newSize },
      () => Math.floor(Math.random() * 100) + 1
    );
    drawChart();
  } else {
    alert("Please enter a valid positive number for the new bar size.");
  }
}

function changeCanvasSize() {
  const newWidth = parseInt(prompt("Enter new canvas width (e.g., 1000):"));
  const newHeight = parseInt(prompt("Enter new canvas height (e.g., 500):"));

  if (!isNaN(newWidth) && !isNaN(newHeight) && newWidth > 0 && newHeight > 0) {
    canvasWidth = newWidth;
    canvasHeight = newHeight;
    drawChart();
  } else {
    alert("Please enter valid positive numbers for the new canvas size.");
  }
}

// Event listener for animation speed input
document
  .getElementById("animation-speed")
  .addEventListener("input", function () {
    animationSpeed = this.value;
  });

// Initialize the application
generateBars();
