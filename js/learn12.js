window.onload = function () {
    //兼容性检测
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
        return;
    }

    init();
    animate();
}


var renderer, camera, scene, light;
var geometry, mesh;
var stats, controls;
var mesh = null;

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1.0);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1e10)
    camera.position.z = 0.4;
    scene = new THREE.Scene();

    scene.add( camera );  

    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);



    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    //设置相机距离原点的最远距离
    controls.minDistance = 0.3;
    //设置相机距离原点的最远距离
    controls.maxDistance = 1;
    //是否开启右键拖拽
    controls.enablePan = true;

    

    light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(200, 200, 1000).normalize();

    camera.add(light);

    var material = new THREE.MeshLambertMaterial({ //光反色均匀
        color: 0xFFFFFF,
        side: THREE.DoubleSide //双边绘制
    });

    var loader = new THREE.VTKLoader();
    loader.load("../models/bunny.vtk", function (geometry) {
        geometry.computeVertexNormals(); //计算法向量
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.setY(-0.09);
        scene.add(mesh);
    });



    window.addEventListener("resize", onWindowResize, false);
}

var param;

function onWindowResize() {
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
    controls.update();
}