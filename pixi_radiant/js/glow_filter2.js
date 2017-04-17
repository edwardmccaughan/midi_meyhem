glow_vert = function() {
    var string =  `attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat3 projectionMatrix;
    varying vec2 vTextureCoord;

    void main(void){
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
    }`
    return string;

}

glow_fragment = function() {
    var string =  `precision mediump float;

    varying vec2 vTextureCoord;
    varying vec4 vColor;

    uniform sampler2D uSampler;

    uniform float distance;
    uniform float outerStrength;
    uniform float innerStrength;
    uniform vec4 glowColor;
    uniform float pixelWidth;
    uniform float pixelHeight;

    vec2 px = vec2(pixelWidth, pixelHeight);

    void main(void) {
        const float PI = 3.14159265358979323846264;
        vec4 ownColor = texture2D(uSampler, vTextureCoord);
        vec4 curColor;
        float totalAlpha = 0.0;
        float maxTotalAlpha = 0.0;
        float cosAngle;
        float sinAngle;

        for (float angle = 0.0; angle <= PI * 2.0; angle += %ANGLE%) {
           cosAngle = cos(angle);
           sinAngle = sin(angle);
           for (float curDistance = 1.0; curDistance <= %DISTANCE%; curDistance++) {
               curColor = texture2D(uSampler, vec2(vTextureCoord.x + cosAngle * curDistance * px.x, vTextureCoord.y + sinAngle * curDistance * px.y));
               totalAlpha += (distance - curDistance) * curColor.a;
               maxTotalAlpha += (distance - curDistance);
           }
        }
        maxTotalAlpha = max(maxTotalAlpha, 0.0001);

        ownColor.a = max(ownColor.a, 0.0001);
        ownColor.rgb = ownColor.rgb / ownColor.a;
        float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);
        float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;
        float resultAlpha = (ownColor.a + outerGlowAlpha);
        gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);
    }`
    return string;
}


function PixiGlowFilter(viewWidth, viewHeight, distance, outerStrength, innerStrength, color, quality) {

    quality = Math.pow(quality, 1/3);

    var glowColor = [0.0, 0.0, 0.0];
    PIXI.utils.hex2rgb(color, glowColor);

    fragment = glow_fragment().replace('%DISTANCE%', distance.toFixed(7));
    fragment = fragment.replace('%ANGLE%', (1.0 / quality / distance).toFixed(7));

    PIXI.AbstractFilter.call(this, glow_vert, fragment, {
        distance:      { type: 'f',  value: distance},
        pixelWidth:    { type: 'f',  value: 1.0 / viewWidth},
        pixelHeight:   { type: 'f',  value: 1.0 / viewHeight},
        innerStrength: { type: 'f',  value: innerStrength},
        outerStrength: { type: 'f',  value: outerStrength},
        glowColor:     { type: '4f', value: glowColor},
    });
};

PixiGlowFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
PixiGlowFilter.prototype.constructor = PixiGlowFilter;
