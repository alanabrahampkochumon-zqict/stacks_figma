import { transform } from "@svgr/core";

async function SVGToReact(svgIcon: string, componentName: string = "Icon") {
    const reactCompTransform = await transform(
        svgIcon,
        { icon: true },
        { componentName: componentName },
    );
    return reactCompTransform;
}

export default SVGToReact;
