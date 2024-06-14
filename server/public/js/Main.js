import Layout from "./Components/Layout.js";

let layout = new Layout({
    props: {},
    container: document.querySelector('#app'),
});

layout.renderUpdate();
console.log("main.js");