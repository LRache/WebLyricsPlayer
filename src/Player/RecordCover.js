import {useEffect, useRef, useState} from "react";

const config = {
    acrWidth: 2,
    arcSplit: 3,
    arcCount: 15,
};

function RecordCover({size, imagePath, timer, cycle}) {
    const canvasRef = useRef(null);
    const imageRef = useRef(new Image());
    const [imageLoadFinished, setImageLoadFinished] = useState(false);
    const step = useRef(null);

    useEffect(() => {
        imageRef.current.src = imagePath;
        imageRef.current.onload = () => {
            setImageLoadFinished(true);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const centerX = size / 2;
        const centerY = size / 2;
        const recordR = size / 2

        const arcWidth = size * 0.003;
        const arcSplit = size * 0.008;

        context.clearRect(0, 0, size, size);
        context.fillStyle = "#000000";

        context.beginPath();
        context.arc(centerX, centerY, recordR, 0, 2 * Math.PI);
        context.fill();

        context.strokeStyle = "#242527";
        context.lineWidth = arcWidth;
        for (let i = 0; i < config.arcCount; i++) {
            const r = recordR - arcSplit - i * (arcSplit + arcWidth);
            context.beginPath();
            context.arc(centerX, centerY, r, 0, 2 * Math.PI);
            context.stroke();
        }
    }, [size]);

    function update_rotating_cover() {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const centerX = size / 2;
        const centerY = size / 2;
        const arcWidth = size * 0.003;
        const arcSplit = size * 0.008;
        context.save();

        const imgSize = size - 2 * config.arcCount * (arcSplit + arcWidth) - arcSplit;
        const imageR = imgSize / 2;
        context.translate(centerX, centerY);
        context.rotate((timer % cycle) / cycle * 2 * Math.PI);

        context.beginPath();
        context.arc(0, 0, imageR, 0, 2 * Math.PI);
        context.clip();

        context.drawImage(imageRef.current, -imageR, -imageR, imgSize, imgSize);

        context.restore();
    }

    useEffect(() => {
        if (imageLoadFinished) {
            const currentStep = Math.floor(timer / 50);
            if (currentStep === step.current) return;
            step.current = currentStep;
            update_rotating_cover();
        }
    }, [timer, cycle]);

    useEffect(() => {
        if (imageLoadFinished) {
            step.current = Math.floor(timer / 50);
            update_rotating_cover();
        }
    }, [size, imageLoadFinished])

    return (
        <canvas ref={canvasRef} width={size} height={size} className="cover"></canvas>
    );
}

export default RecordCover;
