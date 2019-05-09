window.onload = function () {
    initThree(); //构建渲染器
    initCamera(); //构建相机
    initScene(); //构建场景
    createUI(); //创建UI界面
    initLight(); //构建灯光
    initObject(); //构建对象
    animation(); //创建动画
    customColor();  //自定义颜色
}

//构建渲染器
var renderer;
var stats;

function initThree() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ //初始化渲染器
        antialias: true //抗锯齿
    });

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);

    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

//构建相机
var camera;

function initCamera() {
    //透视投影相机（远景投影相机）
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.x = 600;
    camera.position.y = 600;
    camera.position.z = 600;
    //camera.up：坐标轴向上方向，默认（0，1，0）。PS：要设置在camera.lookAt前才有效
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    //camera.lookAt：相机焦点方向，默认为Z轴负半轴方向
    camera.lookAt(0, 0, 0);
}



//构建场景
var scene;

function initScene() {
    scene = new THREE.Scene();

    //添加一个辅助坐标轴
    var axes = new THREE.AxisHelper(2000);
    scene.add(axes);
}

//创建UI界面
var param;
function createUI() {
    var ParamObj = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.decay = 1;
    }
    param = new ParamObj();
    var gui = new dat.GUI();
    gui.add(param, "x", -2000, 2000).name("点光源X的位置");
    gui.add(param, "y", -2000, 2000).name("点光源Y的位置");
    gui.add(param, "z", -2000, 2000).name("点光源Z的位置");
    gui.add(param, "decay", 0, 1).name("衰减");
}

//构建灯光
var light;

function initLight() {
    light = new THREE.PointLight(0xFF00000,1,1000, param.decay); //点光源,使用 MeshLambertMaterial 或 Phong网孔材料(MeshPhongMaterial) 来影响对象。
    light.position.set(param.x, param.y, param.z);
    scene.add(light);
}

//构建对象
var mesh;

function initObject() {
    // var geometry = new THREE.CubeGeometry( 200, 100, 50,4,4);
    // var material = new THREE.MeshLambertMaterial({
    //     color:0xFF0000
    // }); //一种非发光材质
    // mesh = new THREE.Mesh(geometry, material); //新建网孔对象的基类
    // mesh.position = new THREE.Vector3(0,0,0); //三维向量
    // scene.add(mesh);

    var geometry1 = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material1 = new THREE.MeshLambertMaterial({color:0xFF0000});
    mesh1 = new THREE.Mesh(geometry1, material1); //新建网孔对象的基类
    mesh1.position.set(0,0,0); //三维向量
    scene.add(mesh1);

    var geometry2 = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material2 = new THREE.MeshLambertMaterial({color:0xFF0000});
    mesh2 = new THREE.Mesh(geometry2, material2); //新建网孔对象的基类
    mesh2.position.set(-300,0,0); //三维向量
    scene.add(mesh2);

    var geometry3 = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material3 = new THREE.MeshLambertMaterial({color:0xFF0000});
    mesh3 = new THREE.Mesh(geometry3, material3); //新建网孔对象的基类
    mesh3.position.set(0,-150,0); //三维向量
    scene.add(mesh3);

    var geometry4 = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material4 = new THREE.MeshLambertMaterial({color:0xFF0000});
    mesh4 = new THREE.Mesh(geometry4, material4); //新建网孔对象的基类
    mesh4.position.set(0,150,0); //三维向量
    scene.add(mesh4);

    var geometry5 = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material5 = new THREE.MeshLambertMaterial({color:0xFF0000});
    mesh5 = new THREE.Mesh(geometry5, material5); //新建网孔对象的基类
    mesh5.position.set(300,0,0); //三维向量
    scene.add(mesh5);

    var geometry6 = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material6 = new THREE.MeshLambertMaterial({color:0xFF0000});
    mesh6 = new THREE.Mesh(geometry6, material6); //新建网孔对象的基类
    mesh6.position.set(0,0,-100); //三维向量
    scene.add(mesh6);
}



//创建动画
function animation() {
    stats.begin();
    //一、改变相机的位置，让物体移动
    // camera.position.x += 1;

    //二、改变物体自身的位置，让物体移动
    // mesh.position.x-=1;
    light.position.set(param.x, param.y, param.z);
    light.decay = param.decay;

    renderer.render(scene, camera);
    requestAnimationFrame(animation);

    stats.end();
}

//自定义颜色
function customColor(){
    $("#custom").spectrum({
        color: "#f00",
        preferredFormat: "hex",
        showInput: true,
        className: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        hide: function(tinycolor) {
            console.log(tinycolor.toHex());
            light.color.setHex('0x' + tinycolor.toHex());
            
        }
    });
} 