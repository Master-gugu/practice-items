<template>
    <div class="threeTeo">
        
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
let scene, camera, renderer;
let model = null;
let curve = null;
let progress = 0;
const velocity = 0.001;
export default {
    name: 'threeTeo',
    data () {
        return {

        }
    },
    mounted() {
        this.initThree();
        this.loadModel();
        this.makeCurve();
        this.animate();
    },
    destroyed() {
        model.removeFromParent();
    },
    methods: {
        // 初始化3d场景、渲染器、相机等部件
        initThree() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            // renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer = new THREE.WebGLRenderer();

            // 相机位置
            camera.position.set(10, 10, 10);
            camera.lookAt(scene.position);

            // 添加辅助坐标系
            const axes = new THREE.AxesHelper(20);
            scene.add(axes);

            // 调整背景颜色，边界雾化
            scene.background = new THREE.Color(0xa0a0a0);
            scene.fog = new THREE.Fog(0xa0a0a0, 10, 30);

            // 半球形光源
            const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
            hemiLight.position.set(0, 10, 0);
            scene.add(hemiLight);

            // 创建一个虚拟的球形网格 Mesh 的辅助对象来模拟 半球形光源 HemisphereLight
            const hemiLighthelper = new THREE.HemisphereLightHelper(hemiLight, 5);
            scene.add(hemiLighthelper);

            // 地面
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
            mesh.rotation.x = -Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add(mesh);

            // 平行光
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.castShadow = true;
            directionalLight.shadow.camera.near = 0.1;
            directionalLight.shadow.camera.far = 50;
            directionalLight.shadow.camera.left = -10;
            directionalLight.shadow.camera.right = 10;
            directionalLight.shadow.camera.top = 10;
            directionalLight.shadow.camera.bottom = -10;
            directionalLight.position.set(0, 5, 5);
            scene.add(directionalLight);

            // 用于模拟场景中平行光 DirectionalLight 的辅助对象, 其中包含了表示光位置的平面和表示光方向的线段
            const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
            scene.add(directionalLightHelper);

            renderer.shadowMap.enabled = true;
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // 控制器
            const controls = new OrbitControls(camera, renderer.domElement);

        },
        
        // 加载模型
        loadModel() {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load('models/walk/RobotExpressive.glb', (gltf) => {
                gltf.scene.scale.set(0.2, 0.2, 0.2)
                gltf.scene.traverse((object) => {
                    if(object.isMesh) {
                        object.castShadow = true; // 开启阴影
                        object.receiveShadow = true; // 接受别人投的阴影
                    }
                });
                scene.add(gltf.scene);
                model = gltf.scene;
                console.log('加载模型完成', model);

            }, (res) => {
                console.log('加载模型进度', res);
            })
        },
        // 创建运动轨迹
        makeCurve() {
            curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(5, 0, 0),
                new THREE.Vector3(0, 0, 5)
            ]);
            curve.curveType = 'centripetal';
            curve.closed = true; // 闭合曲线
            curve.tension = 0.5; // 曲线的张力
            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: 0x000000 });

            const curveObject = new THREE.Line(geometry, material);
            scene.add(curveObject);
        },
        // 模型跟随曲线运动
        moveOnCurve() {
            console.log('模型>>>', model)
            if(curve == null || model == null) {
                console.log('Loading')
            } else {
                if(progress <= 1 - velocity) {
                    const point = curve.getPointAt(progress); // 获取样条曲线指定点坐标
                    const pointBox = curve.getPointAt(progress + velocity); // 获取样条曲线指定点坐标

                    if(point && pointBox) {
                        model.position.set(point.x, point.y, point.z);
                        // 因为这个模型加载进来默认面部是正对Z轴负方向的，
                        // 所以直接lookAt会导致出现倒着跑的现象，这里用重新设置朝向的方法来解决。
                        model.lookAt(pointBox.x, pointBox.y, pointBox.z); // 模型朝向指定点

                        let targetPos = pointBox // 目标位置点
                        let offsetAngle = 0 // 目标移动时的朝向偏移

                        let mtx = new THREE.Matrix4(); // 创建一个4维矩阵
                        // mtx.lookAt(model.position, targetPos, model.up) // 设置朝向
                        mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)))
                        let toRot = new THREE.Quaternion().setFromRotationMatrix(mtx) // 计算出需要进行旋转的四元数值
                        model.quaternion.slerp(toRot, 0.1) // 进行模型旋转
                    }
                    progress += velocity;
                    
                }else{
                    progress = 0;
                }
            }
        },
        // 渲染3d场景
        animate() {
            requestAnimationFrame(this.animate);
            this.moveOnCurve();
            renderer.render(scene, camera);
        }
    }
}
</script>

<style lang="scss" scoped>
.threeTeo {

}
</style>