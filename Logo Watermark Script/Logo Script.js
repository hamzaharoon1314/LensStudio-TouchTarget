// -----JS CODE-----
// @input Asset.Texture logoPng

// @ui {"widget":"group_start", "label":"Screen Logo"}
// @input bool showScreenLogo = true
// @input int logoPosition = 2 {"showIf":"showScreenLogo", "widget": "combobox", "values":[{"label": "Top Right", "value": 0}, {"label": "Top Left", "value": 1}, {"label": "Top Middle", "value": 2}, {"label": "Bottom Right", "value": 3}, {"label": "Bottom Left", "value": 4}, {"label": "Bottom Middle", "value": 5}]}
// @input float logoAlpha = 0.8 {"showIf":"showScreenLogo", "widget":"slider", "min":0.0, "max":1.0, "step":0.01}
// @input float logoSize = 0.3 {"showIf":"showScreenLogo", "widget":"slider", "min":0.0, "max":1.0, "step":0.01}
// @input float logoOffsetX = 0.0 {"showIf":"showScreenLogo", "widget":"slider", "min":-1.0, "max":1.0, "step":0.01}
// @input float logoOffsetY = 0.0 {"showIf":"showScreenLogo", "widget":"slider", "min":-1.0, "max":1.0, "step":0.01}
// @ui {"widget":"group_end"}

// @ui {"widget":"group_start", "label":"DO NOT EDIT"}
// @input Component.ScriptComponent properties
// @ui {"widget":"group_end"}

init();

function init() {
    configureScreenLogo();
}

function configureScreenLogo() {
    if (script.properties.api.screenLogo && script.logoPng) {
        script.properties.api.screenLogo.enabled = script.showScreenLogo;
        script.properties.api.screenLogo.mainPass.baseTex = script.logoPng;
        script.properties.api.screenLogo.mainPass.baseColor = new vec4(1.0, 1.0, 1.0, script.logoAlpha);

        var screenTransform = script.properties.api.screenLogo.getSceneObject().getComponent("Component.ScreenTransform");
        var bindingPointPositions = [new vec2(0.60, 0.70),
            new vec2(-0.60, 0.70),
            new vec2(0, 0.70),
            new vec2(0.60, -0.70),
            new vec2(-0.60, -0.70),
            new vec2(0, -0.70)];

        if (script.showScreenLogo) {
            var bindingPoint = bindingPointPositions[script.logoPosition];
            bindingPoint = new vec2(bindingPoint.x + script.logoOffsetX, bindingPoint.y + script.logoOffsetY);
            setRectCenter(screenTransform.anchors, bindingPoint);

            var size = new vec2(script.logoSize, script.logoSize).uniformScale(2.0);
            setRectSize(screenTransform.anchors, size);
        }
    }
}

function setRectCenter(rect, center) {
    var offset = center.sub(rect.getCenter());
    rect.left += offset.x;
    rect.right += offset.x;
    rect.top += offset.y;
    rect.bottom += offset.y;
}

function setRectSize(rect, size) {
    var center = rect.getCenter();
    rect.left = center.x - size.x * 0.5;
    rect.right = center.x + size.x * 0.5;
    rect.top = center.y + size.y * 0.5;
    rect.bottom = center.y - size.y * 0.5;
}
