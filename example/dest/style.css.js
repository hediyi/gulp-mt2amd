/* trace:example/src/style.css */
define(function(require, exports, module) {
    (function(global) {
        global.yomCssModuleHelper = global.yomCssModuleHelper || function(className, cssContent, moduleUri) {
            var head = document.head || document.getElementsByTagName("head")[0];
            var styleTagId = "yom-style-module-inject-tag";
            var styleTag = document.getElementById(styleTagId);
            if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.id = styleTagId;
                styleTag.type = "text/css";
                styleTag = head.appendChild(styleTag);
            }
            window._yom_style_module_injected = window._yom_style_module_injected || {};
            var injectKey = className || moduleUri;
            if (!injectKey) {
                styleTag.appendChild(document.createTextNode(cssContent + "\n"));
            } else if (!window._yom_style_module_injected[injectKey]) {
                styleTag.appendChild(document.createTextNode("/* " + injectKey + " */\n" + cssContent + "\n"));
                window._yom_style_module_injected[injectKey] = 1;
            }
            function formatClassName(cn) {
                return cn.replace(/^\s*&/, className).replace(/\s+&/g, " " + className).replace(/&/g, "");
            }
            function moduleClassNames() {
                var cns = [];
                var args = Array.prototype.slice.call(arguments);
                if (!args.length) {
                    return className;
                }
                args.forEach(function(cn) {
                    if (typeof cn == "object") {
                        Object.keys(cn).forEach(function(k) {
                            if (cn[k]) {
                                k = formatClassName(k);
                                k && cns.push(k);
                            }
                        });
                    } else {
                        cn = formatClassName(cn);
                        cn && cns.push(cn);
                    }
                });
                return cns.join(" ");
            }
            return {
                moduleClassNames: moduleClassNames,
                cssContent: cssContent
            };
        };
    })(typeof global == "undefined" ? self : global);
    var moduleUri = typeof module != "undefined" && module.uri;
    var expo = yomCssModuleHelper("", ".menu{width:30px;height:30px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAdCAYAAADoxT9SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGNUZFM0VGRjA2RTExRTNCRDNCOTE1RjdCNUU0RjQ3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGNUZFM0YwRjA2RTExRTNCRDNCOTE1RjdCNUU0RjQ3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEY1RkUzRURGMDZFMTFFM0JEM0I5MTVGN0I1RTRGNDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEY1RkUzRUVGMDZFMTFFM0JEM0I5MTVGN0I1RTRGNDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7KYWdzAAAEOklEQVR42sxXaUhUURidsXTMBTRIIlPDUlMrUakoyDIyoaDFQCsTI8O0CMmEKGjR1BZt92d7ISWmltqfNjNTy9BIK9rIdDR1dMxRZ3HezOtceQNSb5x51xn1g8Nj9N3vfOe++517r4hlWZElMTAwMFOtVucxDPNLr9czBPgtbZNKb508kb5IIraZBohHy4H/jwq+MRYVMTg4GKrT6WSskVCpVH1nsk/FoZjpgM2kFKJUKj0gooM1EQpEdFTUVk6MeFIJ6ezocNRqtQ2smdHa0tIe6OsXgaKc+cRMlBAxRBSyAqOhvv6Dk50klPTMpBCi0WgyWMooLy0rR2HzAbsJFYK+iMFTTysEjsbmXbqch+K8gKkTIoQ4FApRsmMMfFFtakpKGgqcaXCycRNC9go4VBtroejt7VWsj4yMQZGupPnHS4gEzV3HWjh+NTdLvT08V6FQp3ERMjQ0lM9aKd7V1dWj0GDA3qpCsJ6PsFaOkqLiEhTrR5zMKkLgUJvxZKwtBL2nP5+Te8HgZBYVguYOgkMpaIoiEDoOZzLNvqSkFBTtRpzMIkL6+/vdUMxPmtk9lZn1Oef0mQaasT3d3X/Wrl69BYW7/OtkNELs4FCvaAopKnwgBelVYP+bmprXNDl+fP/e7DXLPQw5HMckBA51naYAnKPkLg6O+SDdAwT4ec8Ngr1+oclVW11dixzkHiOhEoLLUCoNMS5Qynlecx6B8OCIAiTbo6NXyuXybpqcBffuFyCHD2ArSAiOHyF4aoUSwhS04SvCXoDsOLCMLIkR5yfH9GPHdmCCVBSmoUtOTDyMHO7GLmTG9ov7NA6VmJDwDkQ5wBpDk44QQhrW5faNm0dpnKy6quozxoeTnd9sIbhvy4QSXcg99wUk5CS7yWCbPPcMYqVuz548vUVxHlNjbDIwW0iP6ISQPC4rbwfBNYDcxz1HHsl5xJBNzrOpsbFK6BfHuAzAX8jS+m0uwcempj441D0Q7AV8SUOa2pvIOwE+voHtbW1m709dnZ0qjDsLLOTLaSPiiV65vEJkRsi6ujRRGzZWYieux89qoEWt12lNjSPvYI/4kXbgQIJCoegzh6vyZaUMDyXAn59P3ZWLlxZjI1SPNkNwHyYiPLyC+9zLjTWhiS/jlJmeEY/9asjEkYUJXrCwFO/vBmaZvbTwskP+nbupWGIaY4mxL9RyDrXWcCGiEEKczBUTdwhUvGJwWGV2xsW9xXtZ3IQ5CBFCCGbEbdu2q+L5i/c9PT1Kcr/GUlLjmN26NCS0nEu8zphDCRAz7GTxsbEJ4GrAGWuYq1smUz8sLmldEhxShv9nc1wzjE3Y8B/5wt5mylQ8pgM+QAAwG5gGqAAp8An4Csix5nWiMQS4pnBcvoA/4MHD9Y1wAQz4/sthVAhHIOYSugLOgC3XbP3EEwgRkrIiC4Q5XKSlObP4b/xfAQYA8ojPCidnpD4AAAAASUVORK5CYII=)}", moduleUri);
    module.exports = expo;
});