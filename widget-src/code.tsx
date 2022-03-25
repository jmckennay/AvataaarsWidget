const { widget } = figma
const { AutoLayout, SVG, Text, useSyncedState, useEffect, waitForTask, usePropertyMenu } = widget

const buttonSrc = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>
  </svg>
`

const downIconSrc = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.08 0.079998H9.08L9.08 12.08L14.58 6.58L16 8L8.08 15.92L0.160004 8L1.58 6.58L7.08 12.08L7.08 0.079998Z" fill="white"/>
  </svg>
`

const upIconSrc = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.08001 15.92L7.08001 15.92L7.08001 3.92002L1.58001 9.42002L0.160007 8.00002L8.08001 0.0800171L16 8.00002L14.58 9.42002L9.08001 3.92002L9.08001 15.92Z" fill="white"/>
  </svg>
`

function getAvataaar() {
  
}

function Widget() {
  const [text, setText] = useSyncedState("text", "initial")
  const [count, setCount] = useSyncedState('count', 0)
  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Increment',
      propertyName: 'increment',
      itemType: 'action',
      icon: upIconSrc,
    },
  ]
  if (count > 0) {
    propertyMenu.push({
      tooltip: 'Decrement',
      propertyName: 'decrement',
      itemType: 'action',
      icon: downIconSrc,
    })
  }

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'decrement') {
      setCount(count - 1)
    } else if (propertyName === 'increment') {
      setCount(count + 1)
    }
  })
  // useEffect(() => {
  //   waitForTask(new Promise(resolve => {
  //     figma.showUI(__html__, { visible: true })
  //     // figma.ui.postMessage({ type: 'networkRequest' })

  //     figma.ui.onmessage = async (msg) => {
  //       // Update the widget state!
  //       setText(msg)
  //       // Resolve the task since we are done!
  //       resolve(null)
  //     }
  //   }))
  // })


  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={8}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
      onClick={async () => {
        await new Promise((resolve) => {
          figma.showUI(__html__)
          figma.ui.on('message', (msg) => {
            setText(msg)
            figma.closePlugin()
          })
        })
      }}
    >
      {text === "initial" &&
      <Text fontSize={32} horizontalAlignText="center">
        Click Me
      </Text>
      }
      {text !== "initial" &&
        <SVG src={text} width={200} height={200}></SVG>
      }
    </AutoLayout>
  )
}
widget.register(Widget)