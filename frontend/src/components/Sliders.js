import React from "react";
import styled from "styled-components";

const SlidersDiv = styled.div`
    color: black;
    width: 100%;
    display: grid;
    grid-template-rows: auto;
    /* The slider itself */
    p {
        grid-column: 1;
    }
    input {
        grid-column: 2;
        -webkit-appearance: none; /* Override default CSS styles */
        appearance: none;
        width: 100%; /* Full-width */
        height: 25px; /* Specified height */
        background: #d3d3d3; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
        transition: opacity 0.2s;
    }

    /* Mouse-over effects */
    input:hover {
        opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    input::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #4caf50; /* Green background */
        cursor: pointer; /* Cursor on hover */
    }

    input::-moz-range-thumb {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #4caf50; /* Green background */
        cursor: pointer; /* Cursor on hover */
    }
`;
const Sliders = ({ titles, settings }) => {
    const { value1, setValue1, value2, setValue2 } = settings
    return <SlidersDiv>
        <div>
        <p>{titles[0]}: {value1}</p>

        <input
            onChange={(e) => {
                if (!isNaN(e.target.value)) {
                    setValue1(+e.target.value);
                }
            }}
            type="range"
            min="1"
            max="1000"
                value={value1} /></div>
        <div>
        <p>{titles[1]} {value2}</p>

        <input
            onChange={(e) => {
                if (!isNaN(e.target.value)) {
                    setValue2(+e.target.value);
                }
            }}
            type="range"
            min="1"
            max="2.5"
            step="0.06"
                value={value2} />
            </div>
    </SlidersDiv>;
};
export default Sliders
