window.onload = function(){
    initThree();    //构建渲染器
    initCamera();   //构建相机
    initScene();    //构建场景
    initLight();    //构建灯光
    initObject();   //构建对象
    initTween();    //初始化动画库
    animation();    //创建动画
}

//构建渲染器
var renderer;
var stats;
function initThree(){
    width = window.innerWidth;
    height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({   //初始化渲染器
        antialias: true    //抗锯齿
    });

    renderer.setSize(width,height);
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
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10000);
    camera.position.x = -200;
    camera.position.y = 500;
    camera.position.z = 1500;
    //camera.up：坐标轴向上方向，默认（0，1，0）。PS：要设置在camera.lookAt前才有效
    camera.up.x = 0;  
    camera.up.y = 1;
    camera.up.z = 0;
    //camera.lookAt：相机焦点方向，默认为Z轴负半轴方向
    camera.lookAt(0,1,0); 
}

//构建场景
var scene;
function initScene(){
    scene = new THREE.Scene();

    //添加一个辅助坐标轴
    var axes = new THREE.AxisHelper(2000);
    scene.add(axes);
}    

//构建灯光
var light;
function initLight(){
    // light = new THREE.AmbientLight(0xFFFFFF); //环境光,这种光的颜色被应用到全局范围内的所有对象。
    // light.position.set(100, 100, 200);
    // scene.add(light);
    light = new THREE.PointLight(0x00FF00);  //点光源,使用 MeshLambertMaterial 或 Phong网孔材料(MeshPhongMaterial) 来影响对象。
    light.position.set(0, 0, 300);
    scene.add(light);
}

//构建对象
var cube;
var mesh;
function initObject(){
    var geometry = new THREE.CylinderGeometry(100, 150, 400, 30);  //创建一个圆柱体
    var material = new THREE.MeshLambertMaterial({});  //一种非发光材质
    mesh = new THREE.Mesh(geometry, material);   //新建网孔对象的基类
    mesh.position = new THREE.Vector3(0,0,0);   //三维向量
    scene.add(mesh);
}   

//初始化动画库
function initTween(){
    new TWEEN.Tween(camera.position).to({
        x: 400
    },3000).repeat(Infinity).start();
}

//创建动画
function animation(){
    stats.begin();
    //一、改变相机的位置，让物体移动
    // camera.position.x += 1;

    //二、改变物体自身的位置，让物体移动
    // mesh.position.x-=1;

    TWEEN.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animation);

    stats.end();
}