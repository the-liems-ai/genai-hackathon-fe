import { getNodesBounds, getViewportForBounds, useReactFlow } from "reactflow";
import { toPng } from "html-to-image";

const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

const useMindmapThumbnail = () => {
    const { getNodes } = useReactFlow();

    const getThumbnail = () => {
        const nodesBounds = getNodesBounds(getNodes());
        const { x, y, zoom } = getViewportForBounds(
            nodesBounds,
            THUMBNAIL_WIDTH,
            THUMBNAIL_HEIGHT,
            0.5,
            2
        );

        return toPng(
            document.querySelector(".react-flow__viewport") as HTMLElement,
            {
                backgroundColor: "#f5f5f5",
                width: THUMBNAIL_WIDTH,
                height: THUMBNAIL_HEIGHT,
                style: {
                    width: `${THUMBNAIL_WIDTH}px`,
                    height: `${THUMBNAIL_HEIGHT}px`,
                    transform: `translate(${x}px, ${y}px) scale(${zoom})`,
                },
            }
        );
    };

    return getThumbnail;
};

export default useMindmapThumbnail;