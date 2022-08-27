const domLib = {
    DEFAULT_NAMESPACE: "http://www.w3.org/2000/svg",
    setAttributeNS: function(element, namespace, options) {
        for(const key in options) {
            element.setAttributeNS(namespace, key, options[key]);
        }
    },

    setAttribute(element, options) {
        for(const key in options) element.setAttribute(key, options[key])
    },

    setStyle(element, options) {
        for(const key in options) element.style[key] = options[key]
    }
}

export {domLib};