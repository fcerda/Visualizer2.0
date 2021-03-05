import React, { createRef, useState, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import { Button, Page } from "../components/common";
import animationLooper from "./animationLooper";
import Sliders from "./Sliders";


let rafId;
let audio;
let audioContext;
let source;
let analyser;
let frequency_array;
const createAudioContext = () => {
    audio = new Audio();
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    frequency_array = new Uint8Array(analyser.frequencyBinCount);
};

const Visualizer = () => {
    const [width, height] = [window.innerWidth, window.innerHeight];
    const [canvas, setCanvas] = useState(createRef());
    const [isPaused, setIsPaused] = useState(true);
    const [songSelect, setSongSelect] = useState([]);
    const [numBars, setNumBars] = useState(300);
    const [heightVar, setHeightVar] = useState(3);
    const [visualizerType, setVisualizerType] = useState("bars");

    const center_x = width / 2;
    const center_y = height / 2;
    useEffect(() => {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(tick);
        }
    }, [numBars, heightVar, visualizerType]);

    const getSong = async (song) => {
        if (audio) {
            audio.pause()
            setIsPaused(true);
        }
        createAudioContext();
        audio.src = song;
        audio.load();
        
        if (audio) {
            togglePlay()
        }
    };
    const openFullscreen = () => {
        document.getElementById("canvas").requestFullscreen();
    };

    const togglePlay = () => {
        if (audio.paused) {
            audioContext.resume();
            audio.play();
            setIsPaused(false);
            rafId = requestAnimationFrame(tick);
        } else {
            audio.pause();
            setIsPaused(true);
            cancelAnimationFrame(rafId);
        }
    };

    function tick() {
        animationLooper(
            canvas.current,
            visualizerType,
            width,
            height,
            numBars,
            heightVar,
            center_x,
            center_y,
            frequency_array
        );
        analyser.getByteTimeDomainData(frequency_array);
        rafId = requestAnimationFrame(tick);
    }

    return (
        <Page>
            <ButtonWrapper>
                <Sliders
                    titles={["Number of Bars", "Height of Bars"]}
                    settings={{
                        value1: numBars,
                        setValue1: setNumBars,
                        value2: heightVar,
                        setValue2: setHeightVar,
                    }}
                />
                <input
                    onChange={(e) => {
                        setSongSelect((prev) => [
                            ...prev,
                            [
                                URL.createObjectURL(e.target.files[0]),
                                e.target.files[0].name,
                            ],
                        ]);
                    }}
                    type="file"
                />
                <Button
                    color={isPaused ? "#00ff00" : "#ffff00"}
                    onClick={() => {
                        if (audio) {
                            togglePlay();
                        }
                    }}>
                    {isPaused ? "Play" : "Pause"}
                </Button>
                <button onClick={openFullscreen}>Full Screen</button>

                <select
                    onChange={(e) => {
                        getSong(e.target.value);
                    }}>
                    <option>Choose A Song</option>
                    {songSelect &&
                        songSelect.map((song) => {
                            return <option value={song[0]}>{song[1]}</option>;
                        })}
                </select>
                <button
                    onClick={() => {
                        setVisualizerType((curr) => {
                            if (curr === "circle") {
                                return "bars";
                            }
                            return "circle";
                        });
                    }}>
                    {visualizerType}
                </button>
            </ButtonWrapper>
            <StyledDiv>
                <CanvasElement id="canvas" ref={canvas} />
            </StyledDiv>
        </Page>
    );
};

export default Visualizer;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction:column;
    width: 300px;
`
const StyledDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const CanvasElement = styled.canvas`
    width: 100%;
    height: 100%;
    `;
