/********画布布局*******/



var canvas = document.getElementById('xxx');
var context = canvas.getContext('2d');


var lineWidth = 5 //铅笔宽度默认5

autoSetCanvasSize(canvas)





//context.fillStyle = 'red';
//context.fillRect(10, 10, 150, 100);
//context.beginPath()
//context.moveTo(240,240)
//context.lineTo(300,240)
//context.lineTo(300,300)
//context.fill()

/********监听*******/

listenToUser(canvas)



/*****橡皮擦******/

var eraserEnable = false
pen.onclick = function(){
 eraserEnable = false
 pen.classList.add('active')
 eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnable = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

/*****铅笔颜色******/

black.onclick = function(){
  context.strokeStyle = 'black'
  context.fillStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  }
red.onclick = function(){
context.strokeStyle = 'red'
context.fillStyle = 'red'
red.classList.add('active')
black.classList.remove('active')
green.classList.remove('active')
blue.classList.remove('active')
}
green.onclick = function(){
context.strokeStyle = 'green'
context.fillStyle = 'green'  
green.classList.add('active')
black.classList.remove('active')
red.classList.remove('active')
blue.classList.remove('active')
}
blue.onclick = function(){
context.strokeStyle = 'blue'
context.fillStyle = 'blue'  
blue.classList.add('active')
black.classList.remove('active')
green.classList.remove('active')
red.classList.remove('active')
}

/*****铅笔粗细******/
thin.onclick = function(){
  lineWidth = 5;
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function(){
  lineWidth = 10;
  thick.classList.add('active')
  thin.classList.remove('active')
}

ziyuan.onclick = function(){
  context.font = "18px bold 黑体";
// 设置颜色
context.fillStyle = "#ff0";
// 设置水平对齐方式
context.textAlign = "center";
// 设置垂直对齐方式
context.textBaseline = "middle";
// 绘制文字（参数：要写的字，x坐标，y坐标）
context.fillText("要写的文字", 100, 100);
}

/*****撤销******/
revoke.onclick = function (e) {

  }

/*****一键清空******/
//clear.onclick = function(){
 // context.clearRect(0,0,canvas.width,canvas.height);
//}

clear.onclick = function (e) {
  localStorage.removeItem('sAllArr');
  window.history.go();
}
save.onclick = function (e) {
  var a = document.createElement('a');
  a.href = canvas.toDataURL('image/jpg');
  a.download = '未命名.jpg';
  a.click();
}
/*****保存******/
/*save.onclick = function(){
  var url = canvas.toDataURL("image/png")
  console.log(url);
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = "我的画"
  a.click()
}*/

/*****函数******/




function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }

}

//function drawCircle(x,y,radius){
//context.beginPath()
//context.fillStyle = 'black'
//context.arc(x,y,radius,0,Math.PI*2)
//context.fill()
//}

/*****画笔******/
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.lineWidth = lineWidth
  context.moveTo(x1, y1)//起点
  context.lineTo(x2, y2)//终点
  context.stroke()
  context.closePath()
}


function listenToUser(canvas) {

  var using = false
  var lastPoint = { x: undefined, y: undefined }

  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备

    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x, y);
      console.log(aaa);
      using = true
      if (eraserEnable) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = { x: x, y: y }
      }

    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
     
      if (!using) { return }
      if (eraserEnable) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint  
      }

    }
    canvas.ontouchend = function () {
      using = false
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      using = true
      if (eraserEnable) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = { x: x, y: y }
      }

    }

    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) { return }
      if (eraserEnable) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }

    canvas.onmouseup = function (aaa) {
      using = false
    }
  }
}
