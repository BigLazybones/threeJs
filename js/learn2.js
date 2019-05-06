window.onload = function(){
    threeStart();
}

var renderer;
function initThree(){
    width = document.getElementById("canvas-frame").clientWidth;
    height = document.getElementById("canvas-frame").clientHeight;
    renderer = new THREE.WebGLRenderer({   //初始化渲染器
        antialias: true     //抗锯齿
    });
    renderer.setSize(width, height);
    document.getElementById("canvas-frame").appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 1000;
    camera.up.z = 0;
    camera.lookAt(0, 0, 0);
}

var scene;
function initScene() {
    scene = new THREE.Scene();

    //添加一个辅助坐标轴
    var axes = new THREE.AxisHelper(200);
    scene.add(axes);
}

var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);  //方向光源
    light.position.set(100, 100, 200);
    scene.add(light);
}

var cube;
function initObject() {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );  //线材质
    // var material = new THREE.LineBasicMaterial({
    //     vertexColors: false,   //不使用顶点颜色
    //     color: 0xFF0000        //颜色设置为红色
    // });
    var color1 = new THREE.Color( 0x00CED1 ), color2 = new THREE.Color( 0xFFA500 ), color3 = new THREE.Color( 0xF80000 ), color4 = new THREE.Color( 0x000000 );

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( -100, 0, 100 );  //三维向量, 一个三维向量表示的是一个有顺序的、三个为一组的数字组合（标记为x、y和z）
    var p2 = new THREE.Vector3(  100, 0, -100 );
    var p3 = new THREE.Vector3(  200, 0, 100 );
    var p4 = new THREE.Vector3(  200, 0, 200 );
    geometry.vertices.push(p1,p2,p3,p4);
    geometry.colors.push( color1, color2, color3, color4);

    // var line = new THREE.LineSegments( geometry, material);   
    // var line = new THREE.Line( geometry, material);   
    var line = new THREE.LineLoop( geometry, material);   

    scene.add(line);
}

function render()
{
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    render();
}