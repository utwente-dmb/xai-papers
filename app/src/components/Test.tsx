import React from 'react'
import { Button } from 'antd'
import { useAppSelector } from '../hooks'

function TestComponent() {
    const papers = useAppSelector((state) => state.papers)

    const onClick = () => {
        console.log("Click", papers[0].Authors)
      }

    return (
        <Button onClick={onClick}>
            button
        </Button>
    )
}
export default TestComponent