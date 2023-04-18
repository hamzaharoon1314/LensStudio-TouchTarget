//@input string touchEventEventType = "TapEvent" {"values": [{"value": "TapEvent", "label": "Tap"}]}
//@input Component.BaseMeshVisual touchEventTouchTarget {"label": "Touch Target"}

var touchtarget

function onTrigger() {
    print("hello");
}

function setupTapEvent() {
    var targetScript = script;
    if (touchtarget) {
        var targetObj = touchtarget.getSceneObject();
        var touchComponent = targetObj.getComponent("Component.TouchComponent") || targetObj.createComponent("Component.TouchComponent");
        touchComponent.addMeshVisual(touchtarget);
        targetScript = targetObj.createComponent("Component.ScriptComponent");
    }
    targetScript.createEvent(script.touchEventEventType).bind(onTrigger);
}

function onTapTarget() {
    touchtarget = script.touchEventTouchTarget;
    setupTapEvent();
}

onTapTarget();
