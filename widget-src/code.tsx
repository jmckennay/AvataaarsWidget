const { widget } = figma
const { AutoLayout, SVG, Text, useSyncedState, useEffect, waitForTask, usePropertyMenu } = widget

let firstStart: boolean = true;

const loadingIconSrc = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M21.5 9H16.5L18.36 7.14C16.9 5.23 14.59 4 12 4C7.58 4 4 7.58 4 12C4 13.83 4.61 15.5 5.64 16.85C6.86 15.45 9.15 14.5 12 14.5C14.85 14.5 17.15 15.45 18.36 16.85C19.39 15.5 20 13.83 20 12H22C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C15.14 2 17.95 3.45 19.78 5.72L21.5 4V9M12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7Z"/></svg>
`

const editIconSrc = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg>
`

const randomIconSrc = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19.78,3H11.22C10.55,3 10,3.55 10,4.22V8H16V14H19.78C20.45,14 21,13.45 21,12.78V4.22C21,3.55 20.45,3 19.78,3M12.44,6.67C11.76,6.67 11.21,6.12 11.21,5.44C11.21,4.76 11.76,4.21 12.44,4.21A1.23,1.23 0 0,1 13.67,5.44C13.67,6.12 13.12,6.67 12.44,6.67M18.56,12.78C17.88,12.79 17.33,12.24 17.32,11.56C17.31,10.88 17.86,10.33 18.54,10.32C19.22,10.31 19.77,10.86 19.78,11.56C19.77,12.23 19.23,12.77 18.56,12.78M18.56,6.67C17.88,6.68 17.33,6.13 17.32,5.45C17.31,4.77 17.86,4.22 18.54,4.21C19.22,4.2 19.77,4.75 19.78,5.44C19.78,6.12 19.24,6.66 18.56,6.67M4.22,10H12.78A1.22,1.22 0 0,1 14,11.22V19.78C14,20.45 13.45,21 12.78,21H4.22C3.55,21 3,20.45 3,19.78V11.22C3,10.55 3.55,10 4.22,10M8.5,14.28C7.83,14.28 7.28,14.83 7.28,15.5C7.28,16.17 7.83,16.72 8.5,16.72C9.17,16.72 9.72,16.17 9.72,15.5A1.22,1.22 0 0,0 8.5,14.28M5.44,11.22C4.77,11.22 4.22,11.77 4.22,12.44A1.22,1.22 0 0,0 5.44,13.66C6.11,13.66 6.66,13.11 6.66,12.44V12.44C6.66,11.77 6.11,11.22 5.44,11.22M11.55,17.33C10.88,17.33 10.33,17.88 10.33,18.55C10.33,19.22 10.88,19.77 11.55,19.77A1.22,1.22 0 0,0 12.77,18.55H12.77C12.77,17.88 12.23,17.34 11.56,17.33H11.55Z"/></svg>`

function Widget() {
  const [text, setText] = useSyncedState("text", loadingIconSrc)
  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Randomise',
      propertyName: 'randomise',
      itemType: 'action',
      icon: randomIconSrc,
    },
    {
      tooltip: 'Edit',
      propertyName: 'edit',
      itemType: 'action',
      icon: editIconSrc,
    },
  ]

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'randomise') {
      waitForTask(new Promise(resolve => {
        figma.showUI(__html__, { visible: false })
        figma.ui.postMessage({ type: 'randomise' })
        figma.ui.onmessage = async (msg) => {
          // Update the widget state!
          setText(msg)
          // Resolve the task since we are done!
          firstStart = false;
          resolve(null)
        }
      }))
    }
    if (propertyName === 'edit') {
      waitForTask(new Promise(resolve => {
        figma.showUI(__html__, { visible: true, height: 300, width: 200 })
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

  useEffect(() => {
    if(firstStart){
      waitForTask(new Promise(resolve => {
        figma.showUI(__html__, { visible: true, height: 300, width: 200 })
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