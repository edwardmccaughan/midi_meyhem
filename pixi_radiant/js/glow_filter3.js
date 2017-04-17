var GlowFilter = function (textureWidth, textureHeight, distance, outerStrength, innerStrength, color, quality, useMipmap) {
    PIXI.AbstractFilter.call(this);

    quality = Math.pow(quality, 1/2);
    this.quality = quality;
    distance *= quality;
    textureWidth *= quality;
    textureHeight *= quality;
    var lod = useMipmap
        ? Math.log(1 / quality) / Math.log(2)
        : 0;

    this.uniforms = {
        distance: {type: '1f', value: distance},
        outerStrength: {type: '1f', value: null},
        innerStrength: {type: '1f', value: null},
        glowColor: {type: '3f', value: null},
        pixelWidth: {type: '1f', value: null},
        pixelHeight: {type: '1f', value: null},
    };

    this.color = color;
    this.outerStrength = outerStrength;
    this.innerStrength = innerStrength;
    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;

    this.fragmentSrc = [
        'precision highp float;',
        'varying vec2 vTextureCoord;',
        'uniform sampler2D texture;',
        'uniform float distance;',
        'uniform float outerStrength;',
        'uniform float innerStrength;',
        'uniform vec3 glowColor;',
        'uniform float pixelWidth;',
        'uniform float pixelHeight;',
        'vec2 px = vec2(pixelWidth, pixelHeight);',
        'void main(void) {',
        '    const float PI = 3.14159265358979323846264;',
        '    vec4 ownColor = texture2D(texture, vTextureCoord, 0.);',
        '    vec4 curColor;',
        '    float totalAlpha = 0.;',
        '    float maxTotalAlpha = 0.;',
        '    float cosAngle;',
        '    float sinAngle;',
        '    for (float angle = 0.; angle < PI * 2.; angle += ' + Math.min(0.5 / distance, Math.PI * 0.5).toFixed(7) + ') {',
        '       cosAngle = cos(angle);',
        '       sinAngle = sin(angle);',
        '       for (float curDistance = 0.; curDistance <= ' + Math.max(1., distance).toFixed(7) + '; curDistance++) {',
        '           curColor = texture2D(texture, vec2(vTextureCoord.x + cosAngle * curDistance * px.x, vTextureCoord.y + sinAngle * curDistance * px.y), ' + lod.toFixed(7) + ');',
        '           totalAlpha += (curDistance / distance) * curColor.a;',
        '           maxTotalAlpha += (curDistance / distance);',
        '       }',
        '    }',
        '    maxTotalAlpha = max(maxTotalAlpha, 0.0001);',
        '    ownColor.a = max(ownColor.a, 0.0001);',
        '    ownColor.rgb = ownColor.rgb / ownColor.a;',
        '    float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);',
        '    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;',
        '    float resultAlpha = (ownColor.a + outerGlowAlpha);',
        '    gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor, innerGlowAlpha / ownColor.a), glowColor, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);',
        '}',
    ].join('\n');
};

GlowFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
GlowFilter.prototype.constructor = GlowFilter;

Object.defineProperty(GlowFilter.prototype, 'color', {
    set: function(value) {
        this.uniforms.glowColor.value = PIXI.utils.hex2rgb(value);
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'outerStrength', {
    set: function (value) {
        this.uniforms.outerStrength.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'innerStrength', {
    set: function (value) {
        this.uniforms.innerStrength.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'textureWidth', {
    set: function(value) {
        this.uniforms.pixelWidth.value = 1 / value;
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'textureHeight', {
    set: function(value) {
        this.uniforms.pixelHeight.value = 1 / value;
        this.dirty = true;
    }
});