function findKeyframesRule(rule){
        var ss = document.styleSheets;
        for (var i = 0; i < ss.length; ++i) {
          if(ss[i].href === "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css") continue;
            for (var j = 0; j < ss[i].cssRules.length; ++j) {
                if (ss[i].cssRules[j].type === window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name === rule)
                    return ss[i].cssRules[j];
            }
        }
        return null;
    }

function changeAnimationRotation(rot, rotationInDeg){
        let toRotaionDeg = rotationInDeg+360;
        var keyframes = findKeyframesRule(rot);
        keyframes.deleteRule('0%');
        keyframes.deleteRule('100%');
        keyframes.appendRule("0% { -webkit-transform: rotate("+ rotationInDeg + "deg); }");
        keyframes.appendRule("100% { -webkit-transform: rotate("+ toRotaionDeg + "deg); }");
}

export {changeAnimationRotation};
