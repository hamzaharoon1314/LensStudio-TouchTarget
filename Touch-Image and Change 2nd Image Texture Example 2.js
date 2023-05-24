//@input Component.Image touchObj
//@input Component.Image imgObj
//@input Asset.Texture[] imgTex

var currentTextureIndex = 0;

function setupTouchComponent() {
    var targetObj = script.touchObj.getSceneObject();
    var touchComponent = targetObj.getComponent("Component.TouchComponent");

    if (!touchComponent) {
        touchComponent = targetObj.createComponent("Component.TouchComponent");
    }

    touchComponent.addMeshVisual(script.touchObj);

    var targetScript = targetObj.getComponent("Component.ScriptComponent");
    if (!targetScript) {
        targetScript = targetObj.createComponent("Component.ScriptComponent");
    }

    function changeImageTexture() {
        script.imgObj.mainPass.baseTex = script.imgTex[currentTextureIndex];
    }

    targetScript.createEvent("TapEvent").bind(function() {
        currentTextureIndex = (currentTextureIndex + 1) % script.imgTex.length;
        changeImageTexture();
    });

    changeImageTexture();
}

setupTouchComponent();
