import React, { Component } from "react"
import Spinner from "../Spinner"
import Advice from "./Advice"

import "./style.sass"


export default class AdviceGenerator extends Component
{
    state = {
        advice: "",
        isLoading: false,
        error: null
    }
    componentDidMount () {
        this.getRandomAdvice()
    }

    getRandomAdvice () {
        
        const api = "https://api.adviceslip.com/advice"
        
        if (!this.state.isLoading) {

            const controller = new AbortController()
            
            setTimeout(() => controller.abort(), 15000)

            const OPTIONS = {
                cache: "no-cache",
                signal: controller.signal
                // signal: AbortSignal.timeout(5000)
            }
            
            this.setState({
                isLoading: true
            })

            fetch(api, OPTIONS)
                .then(res => res.json())
                .then(data => {

                    const { slip } = data

                    this.setState(slip ? {
                            error: null,
                            advice: slip
                        } : {
                            error: "wrong response",
                            advice: ""
                        }
                    )

                })
                .catch(err => {
                    console.log(err)
                    
                    this.setState({
                        error: "Network error",
                        advice: ""
                    })
                })
                .finally(() => this.setState({
                    isLoading: false
                }))
        }
    }

    randomAdviceHandler = () => this.getRandomAdvice()

    render () {

        const { isLoading, error, advice } = this.state
        
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
                    <div className="icon-wrapper" onClick={() => this.randomAdviceHandler()}>
                        <img src="images/icon-dice.svg" alt="new advice"/>
                    </div>
                </div>
            </div>
        )
    }
}
