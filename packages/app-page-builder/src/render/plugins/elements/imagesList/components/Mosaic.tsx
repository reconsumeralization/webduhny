import * as React from "react";
import Lightbox, { Image } from "react-images";
/**
 * Package react-columned does not have types.
 */
// @ts-expect-error
import Columned from "react-columned";

const { useReducer } = React;

interface State {
    open: boolean;
    currentIndex: number;
}
interface Action {
    type: "open" | "close" | "next" | "prev";
    index?: number;
}
const reducer = (state: State, action: Action) => {
    const next = { ...state };
    switch (action.type) {
        case "open":
            next.open = true;
            next.currentIndex = action.index || 0;
            break;
        case "close":
            next.open = false;
            break;
        case "next":
            next.currentIndex = next.currentIndex + 1;
            break;
        case "prev":
            next.currentIndex = next.currentIndex - 1;
            break;
    }
    return next;
};

const useLightbox = () => {
    const [state, dispatch] = useReducer(reducer, {
        open: false,
        currentIndex: 0
    });

    return {
        opened: state.open,
        currentIndex: state.currentIndex,
        open: (index: number) => dispatch({ type: "open", index }),
        close: () => dispatch({ type: "close" }),
        next: () => dispatch({ type: "next" }),
        prev: () => dispatch({ type: "prev" })
    };
};

export interface MosaicProps {
    data: Image[];

    // Number of columns, per max screen size, eg. { "320": 1, "480": 2, "800": 3, "1366": 4 }.
    columns?: {
        [key: string]: number;
    };

    // Custom class for the mosaic container.
    className?: string;
}
const MosaicComponent = (props: MosaicProps) => {
    const { data, columns = { 320: 1, 480: 2, 800: 3, 1366: 4 }, className } = props;
    const { opened, open, close, next, prev, currentIndex } = useLightbox();

    if (Array.isArray(data)) {
        return (
            <>
                <Columned columns={columns} className={className}>
                    {data.map((item, i) => (
                        <img
                            onClick={() => open(i)}
                            style={{ width: "100%", display: "block" }}
                            key={i + item.src}
                            src={item.src}
                        />
                    ))}
                </Columned>

                <Lightbox
                    images={data}
                    currentImage={currentIndex}
                    isOpen={opened}
                    onClickPrev={prev}
                    onClickNext={next}
                    onClose={close}
                />
            </>
        );
    }

    return <span>No images to display.</span>;
};

export const Mosaic: React.ComponentType<MosaicProps> = React.memo(MosaicComponent);
