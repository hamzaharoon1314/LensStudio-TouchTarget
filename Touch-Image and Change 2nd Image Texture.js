//@input Component.Image touchObj
//@input Component.Image imgObj
//@input Asset.Texture[] imgTex

var touchtarget;
var currentTextureIndex = 0;

function changeImageTexture() {
    var texture = script.imgTex[currentTextureIndex];
    script.imgObj.mainPass.baseTex = texture;
}

function onTrigger() {
    currentTextureIndex++;
    if (currentTextureIndex >= script.imgTex.length) {
        currentTextureIndex = 0;
    }
    changeImageTexture();
}

function setupTapEvent() {
    var targetObj = touchtarget.getSceneObject();
    var touchComponent = targetObj.getComponent("Component.TouchComponent") || targetObj.createComponent("Component.TouchComponent");
    touchComponent.addMeshVisual(touchtarget);
    var targetScript = targetObj.getComponent("Component.ScriptComponent");
    if (!targetScript) {
        targetScript = targetObj.createComponent("Component.ScriptComponent");
    }
    targetScript.createEvent("TapEvent").bind(onTrigger);
}

function onTapTarget() {
    touchtarget = script.touchObj;
    setupTapEvent();
}

onTapTarget();

changeImageTexture();
