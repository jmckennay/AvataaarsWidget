const { widget } = figma
const { AutoLayout, SVG, Text, useSyncedState, useEffect, waitForTask, usePropertyMenu } = widget

const biggerIconSrc = `
<svg width="36" height="36" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <g fill="#fff">
  <path d="m840 337.5h-152.5c-10 0-17.5 5-20 15-2.5 7.5-2.5 17.5 5 25l42.5 42.5-65 65c-5 5-7.5 10-7.5 15s2.5 12.5 7.5 15l35 35c5 5 10 7.5 15 7.5s12.5-2.5 15-7.5l65-65 42.5 42.5c5 5 10 7.5 15 7.5 2.5 0 5 0 7.5-2.5 7.5-2.5 15-12.5 15-20v-152.5c2.5-12.5-7.5-22.5-20-22.5z"/>
  <path d="m485 420 42.5-42.5c7.5-7.5 7.5-17.5 5-25s-12.5-15-20-15h-152.5c-12.5 0-22.5 10-22.5 22.5v152.5c0 10 5 17.5 15 20 2.5 0 5 2.5 7.5 2.5 5 0 12.5-2.5 15-7.5l42.5-42.5 65 65c5 5 10 7.5 15 7.5s12.5-2.5 15-7.5l35-35c5-5 7.5-10 7.5-15s-2.5-12.5-7.5-15z"/>
  <path d="m847.5 665c-7.5-2.5-17.5-2.5-25 5l-42.5 42.5-65-65c-7.5-7.5-22.5-7.5-32.5 0l-35 35c-5 5-7.5 10-7.5 15s2.5 12.5 7.5 15l65 65-42.5 42.5c-7.5 7.5-7.5 17.5-5 25s12.5 15 20 15h152.5c12.5 0 22.5-10 22.5-22.5v-152.5c2.5-7.5-2.5-15-12.5-20z"/>
  <path d="m517.5 647.5c-7.5-7.5-22.5-7.5-32.5 0l-65 65-42.5-42.5c-7.5-7.5-17.5-7.5-25-5s-15 12.5-15 20v152.5c0 12.5 10 22.5 22.5 22.5h152.5c10 0 17.5-5 20-15 2.5-7.5 2.5-17.5-5-25l-42.5-42.5 65-65c5-5 7.5-10 7.5-15s-2.5-12.5-7.5-15z"/>
 </g>
</svg>
`

const smallerIconSrc = `
<svg width="36" height="36" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <g fill="#fff">
  <path d="m670 555h160c10 0 17.5-5 20-15 2.5-7.5 2.5-17.5-5-25l-45-45 70-70c10-10 10-22.5 0-32.5l-35-35c-10-10-22.5-10-32.5 0l-72.5 67.5-45-45c-7.5-7.5-17.5-7.5-25-5s-15 12.5-15 20v160c0 15 10 25 25 25z"/>
  <path d="m540 350c-7.5-2.5-17.5-2.5-25 5l-45 45-70-67.5c-10-10-22.5-10-32.5 0l-35 35c-10 10-10 22.5 0 32.5l70 70-45 45c-7.5 7.5-7.5 17.5-5 25s12.5 15 20 15h160c12.5 0 22.5-10 22.5-22.5v-160c0-10-7.5-20-15-22.5z"/>
  <path d="m530 645h-160c-10 0-17.5 5-20 15-2.5 7.5-2.5 17.5 5 25l45 45-67.5 70c-10 10-10 22.5 0 32.5l35 35c5 5 10 7.5 15 7.5s12.5-2.5 15-7.5l70-70 45 45c5 5 10 7.5 15 7.5 2.5 0 5 0 10-2.5 7.5-2.5 15-12.5 15-20v-160c2.5-12.5-7.5-22.5-22.5-22.5z"/>
  <path d="m800 730 45-45c7.5-7.5 7.5-17.5 5-25s-12.5-15-20-15h-160c-12.5 0-22.5 10-22.5 22.5v160c0 10 5 17.5 15 20 2.5 0 5 2.5 10 2.5s12.5-2.5 15-7.5l45-45 70 70c5 5 10 7.5 15 7.5s12.5-2.5 15-7.5l35-35c10-10 10-22.5 0-32.5z"/>
 </g>
</svg>
`

const loadingIconSrc = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M21.5 9H16.5L18.36 7.14C16.9 5.23 14.59 4 12 4C7.58 4 4 7.58 4 12C4 13.83 4.61 15.5 5.64 16.85C6.86 15.45 9.15 14.5 12 14.5C14.85 14.5 17.15 15.45 18.36 16.85C19.39 15.5 20 13.83 20 12H22C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C15.14 2 17.95 3.45 19.78 5.72L21.5 4V9M12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7Z"/></svg>
`

const editIconSrc = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg>
`

const randomIconSrc = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19.78,3H11.22C10.55,3 10,3.55 10,4.22V8H16V14H19.78C20.45,14 21,13.45 21,12.78V4.22C21,3.55 20.45,3 19.78,3M12.44,6.67C11.76,6.67 11.21,6.12 11.21,5.44C11.21,4.76 11.76,4.21 12.44,4.21A1.23,1.23 0 0,1 13.67,5.44C13.67,6.12 13.12,6.67 12.44,6.67M18.56,12.78C17.88,12.79 17.33,12.24 17.32,11.56C17.31,10.88 17.86,10.33 18.54,10.32C19.22,10.31 19.77,10.86 19.78,11.56C19.77,12.23 19.23,12.77 18.56,12.78M18.56,6.67C17.88,6.68 17.33,6.13 17.32,5.45C17.31,4.77 17.86,4.22 18.54,4.21C19.22,4.2 19.77,4.75 19.78,5.44C19.78,6.12 19.24,6.66 18.56,6.67M4.22,10H12.78A1.22,1.22 0 0,1 14,11.22V19.78C14,20.45 13.45,21 12.78,21H4.22C3.55,21 3,20.45 3,19.78V11.22C3,10.55 3.55,10 4.22,10M8.5,14.28C7.83,14.28 7.28,14.83 7.28,15.5C7.28,16.17 7.83,16.72 8.5,16.72C9.17,16.72 9.72,16.17 9.72,15.5A1.22,1.22 0 0,0 8.5,14.28M5.44,11.22C4.77,11.22 4.22,11.77 4.22,12.44A1.22,1.22 0 0,0 5.44,13.66C6.11,13.66 6.66,13.11 6.66,12.44V12.44C6.66,11.77 6.11,11.22 5.44,11.22M11.55,17.33C10.88,17.33 10.33,17.88 10.33,18.55C10.33,19.22 10.88,19.77 11.55,19.77A1.22,1.22 0 0,0 12.77,18.55H12.77C12.77,17.88 12.23,17.34 11.56,17.33H11.55Z"/></svg>`

const setAll = (obj: any, val: any) => Object.keys(obj).forEach(k => obj[k] = val);

interface iSelectedOptions {
  [key: string]: string | undefined | number
}

function Widget() {
  const [firstRun, setFirstRun] = useSyncedState("firstRun", true)
  const [avataaar, setAvataaar] = useSyncedState("avataaar", loadingIconSrc)
  const [opacity, setOpacity] = useSyncedState("opacity", 1)
  const [size, setSize] = useSyncedState("size", 200)
  const [selectedOptions, setSelectedOptions] = useSyncedState<iSelectedOptions>(
    "selectedOptions",
    {
    seed: undefined,
    style: "circle",
    }
  );

  const updateSelectedOption = (key: string, value: any) => {
    let localOptions = selectedOptions
    localOptions[key] = value
    setSelectedOptions(localOptions)
  }

  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Smaller',
      propertyName: 'smaller',
      itemType: 'action',
      icon: smallerIconSrc,
    },
    {
      tooltip: 'Random',
      propertyName: 'randomise',
      itemType: 'action',
      icon: randomIconSrc,
    },
    {
      tooltip: 'Custom',
      propertyName: 'customise',
      itemType: 'action',
      icon: editIconSrc,
    },
    {
      tooltip: 'Bigger',
      propertyName: 'bigger',
      itemType: 'action',
      icon: biggerIconSrc,
    },
  ]
  
  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    return new Promise( (resolve) => {
      if (propertyName === 'randomise') {
        setOpacity(0.5)
        figma.showUI(__html__, {visible: false})
        setAll(selectedOptions, undefined)
        updateSelectedOption("style", "circle")
        figma.ui.postMessage({ type: 'randomise', options: selectedOptions })
      }
      if (propertyName === 'customise') {
        figma.showUI(__html__, { visible: true, height: 400, width: 200 })
        figma.ui.postMessage({ type: 'customise', options: selectedOptions })
      }
      if (propertyName === 'bigger') {
        setSize(size*1.25)
        resolve()
      }
      if (propertyName === 'smaller') {
        setSize(size*0.75)
        resolve()
      }
      figma.ui.onmessage = async (msg) => {
        setAvataaar(msg.avataaar)
        setSelectedOptions(msg.options)
        setOpacity(1)
        figma.ui.close()
        setOpacity(1)
        resolve()
      }
    })
  })

  useEffect(() => {
    if(firstRun){
      waitForTask(new Promise(resolve => {
        setFirstRun(false);
        setOpacity(.5)
        figma.showUI(__html__, { visible: false })
        setAll(selectedOptions, undefined)
        selectedOptions.style = "circle"
        figma.ui.postMessage({ type: 'randomise', options: selectedOptions })
        figma.ui.onmessage = (msg):void => {
          setAvataaar(msg.avataaar)
          setSelectedOptions(msg.options)
          setOpacity(1)
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
      <SVG src={avataaar} width={size} height={size} opacity={opacity}></SVG>
    </AutoLayout>
  )
}
widget.register(Widget)