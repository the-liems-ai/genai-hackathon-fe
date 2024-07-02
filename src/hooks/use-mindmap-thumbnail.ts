import { getNodesBounds, getViewportForBounds, useReactFlow } from "reactflow";
import { toPng } from "html-to-image";

interface ThumbnailOptions {
    width?: number;
    height?: number;
    backgroundColor?: string;
}

const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

const useMindmapThumbnail = ({
    width = THUMBNAIL_WIDTH,
    height = THUMBNAIL_HEIGHT,
    backgroundColor = "#f5f5f5",
}: ThumbnailOptions = {}) => {
    const { getNodes } = useReactFlow();

    const getThumbnail = () => {
        const nodesBounds = getNodesBounds(getNodes());
        const { x, y, zoom } = getViewportForBounds(
            nodesBounds,
            width,
            height,
            0.5,
            2
        );

        return toPng(
            document.querySelector(".react-flow__viewport") as HTMLElement,
            {
                backgroundColor,
                width: width,
                height: height,
                style: {
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `translate(${x}px, ${y}px) scale(${zoom})`,
                },
            }
        );
    };

    return getThumbnail;
};

export default useMindmapThumbnail;
