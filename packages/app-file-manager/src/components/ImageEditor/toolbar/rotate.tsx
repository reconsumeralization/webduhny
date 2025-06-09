import React from "react";
import { IconButton, Slider, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as RotateRight } from "@webiny/icons/rotate_right.svg";
import { ImageEditorTool } from "./types";

import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

let cropper: Cropper;

class RenderForm extends React.Component<any, any> {
    public override state = {
        rangeInput: 0
    };

    public override render() {
        return (
            <div>
                <Slider
                    label={"Range Input"}
                    value={Number(this.state.rangeInput)}
                    min={0}
                    max={360}
                    step={10}
                    onValueChange={(value: number) => {
                        this.setState({ rangeInput: value }, async () => {
                            if (cropper) {
                                cropper.rotateTo(parseInt(String(value), 10));
                            }
                        });
                    }}
                />
            </div>
        );
    }
}

const tool: ImageEditorTool = {
    name: "rotate",
    icon({ activateTool }) {
        return (
            <Tooltip
                side={"bottom"}
                content={"Rotate"}
                trigger={
                    <IconButton
                        variant={"ghost"}
                        icon={<RotateRight />}
                        onClick={() => activateTool("rotate")}
                        data-testid={"rotate-item"}
                    />
                }
            />
        );
    },
    renderForm(props) {
        return <RenderForm {...props} />;
    },
    onActivate: ({ canvas }) => {
        /**
         * We can safely cast canvas.current as HTMLCanvasElement
         */
        cropper = new Cropper(canvas.current as HTMLCanvasElement, {
            background: false,
            modal: false,
            guides: false,
            dragMode: "none",
            highlight: false,
            autoCrop: false
        });
    },
    cancel: () => cropper && cropper.destroy(),
    apply: ({ canvas }) => {
        return new Promise((resolve: any) => {
            if (!cropper) {
                resolve();
                return;
            }

            const current = canvas.current;
            const src = cropper.getCroppedCanvas().toDataURL();
            if (current) {
                const image = new window.Image();
                const ctx = current.getContext("2d") as CanvasRenderingContext2D;
                image.onload = () => {
                    ctx.drawImage(image, 0, 0);
                    current.width = image.width;
                    current.height = image.height;

                    ctx.drawImage(image, 0, 0);
                };
                image.src = src;
                resolve();
            }

            cropper.destroy();
        });
    }
};

export default tool;
