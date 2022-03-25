const { widget } = figma
const { AutoLayout, SVG, Text, useSyncedState, useEffect, waitForTask, usePropertyMenu } = widget

let firstStart: boolean = true;

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

const randomIconSrc = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19.78,3H11.22C10.55,3 10,3.55 10,4.22V8H16V14H19.78C20.45,14 21,13.45 21,12.78V4.22C21,3.55 20.45,3 19.78,3M12.44,6.67C11.76,6.67 11.21,6.12 11.21,5.44C11.21,4.76 11.76,4.21 12.44,4.21A1.23,1.23 0 0,1 13.67,5.44C13.67,6.12 13.12,6.67 12.44,6.67M18.56,12.78C17.88,12.79 17.33,12.24 17.32,11.56C17.31,10.88 17.86,10.33 18.54,10.32C19.22,10.31 19.77,10.86 19.78,11.56C19.77,12.23 19.23,12.77 18.56,12.78M18.56,6.67C17.88,6.68 17.33,6.13 17.32,5.45C17.31,4.77 17.86,4.22 18.54,4.21C19.22,4.2 19.77,4.75 19.78,5.44C19.78,6.12 19.24,6.66 18.56,6.67M4.22,10H12.78A1.22,1.22 0 0,1 14,11.22V19.78C14,20.45 13.45,21 12.78,21H4.22C3.55,21 3,20.45 3,19.78V11.22C3,10.55 3.55,10 4.22,10M8.5,14.28C7.83,14.28 7.28,14.83 7.28,15.5C7.28,16.17 7.83,16.72 8.5,16.72C9.17,16.72 9.72,16.17 9.72,15.5A1.22,1.22 0 0,0 8.5,14.28M5.44,11.22C4.77,11.22 4.22,11.77 4.22,12.44A1.22,1.22 0 0,0 5.44,13.66C6.11,13.66 6.66,13.11 6.66,12.44V12.44C6.66,11.77 6.11,11.22 5.44,11.22M11.55,17.33C10.88,17.33 10.33,17.88 10.33,18.55C10.33,19.22 10.88,19.77 11.55,19.77A1.22,1.22 0 0,0 12.77,18.55H12.77C12.77,17.88 12.23,17.34 11.56,17.33H11.55Z"/></svg>`

function Widget() {
  const [text, setText] = useSyncedState("text", "initial")
  const [count, setCount] = useSyncedState('count', 0)
  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Randomise',
      propertyName: 'randomise',
      itemType: 'action',
      icon: randomIconSrc,
    },
  ]

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'randomise') {
      setCount(count + 1)
    }
  })

  useEffect(() => {
    if(firstStart){
      waitForTask(new Promise(resolve => {
        figma.showUI(__html__, { visible: false })
        // figma.ui.postMessage({ type: 'networkRequest' })
  
        figma.ui.onmessage = async (msg) => {
          // Update the widget state!
          setText(msg)
          // Resolve the task since we are done!
          firstStart = false;
          resolve(null)
        }
      }))
    }
  })


  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={8}
      cornerRadius={8}
      spacing={12}

    >
      {text !== "initial" &&
        <SVG src={text} width={200} height={200}></SVG>
      }
    </AutoLayout>
  )
}
widget.register(Widget)