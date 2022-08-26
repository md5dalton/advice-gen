import React, { useState } from "react"
import useFetch from "../../hooks/useFetch"
import Spinner from "../Spinner"
import Advice from "./Advice"

import "./style.sass"

export default () => {

    const controller = new AbortController()
            
    setTimeout(() => controller.abort(), 10000)

    const OPTIONS = {
        cache: "no-cache",
        signal: controller.signal
        // signal: AbortSignal.timeout(10000)
    }
    
    const [ count, setCount ] = useState(0)

    const { isLoading, error, data } = useFetch("https://api.adviceslip.com/advice", OPTIONS, count)

    const { slip: advice } = data

    const randomAdviceHandler = () => setCount(count+1)
    
    return (
        <div id="generator">
            <div id="advice-wrapper">
                {
                    isLoading ?
                    <div id="loader">
                        <Spinner />
                    </div>
                    : error ?
                    <div className="mgs error">{error}</div>
                    :
                    <Advice {...advice} />
                }
            </div>
            <div id="bottom">
                <div id="divider">
                    <picture>
                        <source srcSet="images/pattern-divider-desktop.svg" media="(min-width: 576px)" />
                        <img src="images/pattern-divider-mobile.svg" alt="divider"/>
                    </picture>
                </div>
                <div className="icon-wrapper" onClick={randomAdviceHandler}>
                    <img src="images/icon-dice.svg" alt="new advice"/>
                </div>
            </div>
        </div>
    )
}
