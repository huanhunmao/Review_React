import React, { useState, useEffect } from 'react'

const Counter = () => {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const savedCount = localStorage.getItem('counter')
        console.log('savedCount',savedCount);
        if(savedCount){
            setCounter(parseInt(savedCount, 10))
        }
    },[])

    const increaseCounter = () => {
        const newCounter = counter + 1
        setCounter(newCounter)
        localStorage.setItem('counter', newCounter.toString())
    }

    return (
        <div>
            <p>Counter:{counter}</p>
            <button onClick={increaseCounter}>点击增加</button>
        </div>
    )
}


export default Counter