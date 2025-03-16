import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { saveAs } from "file-saver";
import axios from "axios";

function drawBoundingBox(base64Image: string, x: number, y: number, width: number, height: number, id: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64Image;
        img.crossOrigin = "anonymous"; // To prevent CORS issues

        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;

            // Set canvas size
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Draw bounding box
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.strokeRect(x - width / 2, y - height / 2, width, height);

            // Draw ID above the bounding box
            ctx.fillStyle = "red";
            ctx.font = "16px Arial";
            ctx.fillText(id, x - width / 2, y - height / 2 - 5); // Positioning text slightly above the box

            // Convert canvas back to base64
            const newBase64 = canvas.toDataURL("image/jpeg");
            resolve(newBase64);
        };

        img.onerror = function (error) {
            reject(error);
        };
    });
}

const WebcamCapture: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [processedImgSrc, setProcessedImgSrc] = useState<string | null>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot() || null;
        setImgSrc(imageSrc);
        setProcessedImgSrc(null); // Reset processed image
    }, [webcamRef]);

    const saveImage = () => {
        if (processedImgSrc) {
            saveAs(processedImgSrc, "captured_image_with_bounding_box.jpg");
        } else if (imgSrc) {
            saveAs(imgSrc, "captured_image.jpg");
        }
    };

    const sendImageToAPI = async (image: string) => {
        try {
            const response = await axios({
                method: "POST",
                url: "https://detect.roboflow.com/my-first-project-fffxr/1",
                params: { api_key: "0bmwykP3c9fRNNS0pQ7N" },
                data: image,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            if (response.data.predictions.length > 0) {
                const { x, y, width, height, class: id } = response.data.predictions[0]; // Get object class
                const updatedBase64 = await drawBoundingBox(image, x, y, width, height, id);
                setProcessedImgSrc(updatedBase64);
                console.log(response.data);
            } else {
                console.log("No objects detected.");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    // data.predictions[0].class
    useEffect(() => {
        if (imgSrc) {
            sendImageToAPI(imgSrc);
        }
    }, [imgSrc]);

    return (
        <div className="flex flex-col items-center">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />

            <div className="flex justify-center mt-4 mb-4">
                <button className="text-white border-2 p-2 border-white rounded-lg" onClick={capture}>
                    Capture Photo
                </button>
                {imgSrc && (
                    <>
                        <button className="text-white border-2 p-2 border-black rounded-lg ml-2" onClick={saveImage}>
                            Save Photo
                        </button>
                    </>
                )}
            </div>

            {processedImgSrc ? (
                <img src={processedImgSrc} alt="Processed Image" />
            ) : imgSrc ? (
                <img src={imgSrc} alt="Captured Image" />
            ) : null}
        </div>
    );
};

export default WebcamCapture;
