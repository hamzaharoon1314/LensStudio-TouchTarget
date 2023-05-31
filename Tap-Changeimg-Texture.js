//@input Component.Image imgObj
//@input Asset.Texture[] imgTex

var currentTextureIndex = 0;

function changeImageTexture() {
    var texture = script.imgTex[currentTextureIndex];
    script.imgObj.mainPass.baseTex = texture;
}

function onTrigger() {
    currentTextureIndex = (currentTextureIndex + 1) % script.imgTex.length;
    changeImageTexture();
}

script.createEvent("TapEvent").bind(onTrigger);

changeImageTexture();
