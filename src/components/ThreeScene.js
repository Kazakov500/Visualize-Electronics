import React, { Component } from "react";
import * as THREE from 'three';
import { OrbitControls } from '../libs/OrbitControls';
import { GUI } from '../libs/dat.gui';

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

class ThreeScene extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // ADD SCENE
    this.scene = new THREE.Scene();

    // ADD CAMERA
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 2;

    // ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#c2c2c2');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    // MATERIAL
    const material = new THREE.MeshPhongMaterial({color: 0xcc3333a, side: THREE.DoubleSide, flatShading: true});
    this.figure = null;

    //LIGHT
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    // GUI
    const gui = new GUI();

    // CONTROLS
    const controls = new OrbitControls(this.camera, this.mount);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();

    // ADD CUBE
    const geometry = new THREE.BoxGeometry(2, 1, 3);
    this.figure = new THREE.Mesh(geometry, material);

    // ADD PARAMETRIC
    const slices = 25;
    const stacks = 25;
    const geometry2 = new THREE.ParametricBufferGeometry(this.setKlein, slices, stacks);
    this.figure = new THREE.Mesh( geometry2, material );

    this.scene.add(this.figure);
    this.start();
  }

  setKlein = (v, u, target) => {
    u *= Math.PI;
    v *= 2 * Math.PI;
    u = u * 2;

    let x;
    let z;

    if (u < Math.PI) {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
      z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
    } else {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
      z = -8 * Math.sin(u);
    }

    const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

    target.set(x, y, z).multiplyScalar(0.75);
  };

  componentWillUnmount(){
    this.stop();
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId)
  };

  animate = () => {
    this.figure.rotation.x += 0.01;
    this.figure.rotation.y += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate)
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  };

  render(){
    return(
      <div
        style={{ width: '600px', height: '600px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ThreeScene;
