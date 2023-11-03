import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { MdStyle, MdPerson, MdColorLens } from 'react-icons/md'
import { FaHatCowboy, FaSeedling, FaTshirt, FaRegEye } from 'react-icons/fa'
import { IoMdGlasses } from 'react-icons/io'
import { AiFillPicture } from 'react-icons/ai'
import { GiMustache, GiEyelashes, GiLips } from 'react-icons/gi'
import { Button, Input, Select} from 'react-figma-plugin-ds'
import ReactTooltip from 'react-tooltip'
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import "react-figma-plugin-ds/figma-plugin-ds.css";
import './App.css'
import data from './avataaars.json'

interface iCustomisation {

  name: string
  placeholder: string
  icon: string
  options?: any
  dependantOn?: string
  probability?: string | undefined
  color?: string
  selectedColor?: string
}

const customisations: iCustomisation[] = data.avataaars;

customisations.map(customisation => {
  const optionSet: { value: string; label: string; }[] = [];
  for (let index in customisation.options) { optionSet.push({value: customisation.options[index], label: customisation.options[index]})}
  customisation.options = optionSet
})

type keysToIconsMap = {[key: string]: IconType}
const keysToIconsMap = {
  MdStyle: MdStyle,
  MdPerson: MdPerson,
  MdColorLens: MdColorLens,
  FaHatCowboy: FaHatCowboy,
  FaTshirt: FaTshirt,
  FaRegEye: FaRegEye,
  IoMdGlasses: IoMdGlasses,
  AiFillPicture: AiFillPicture,
  GiMustache:GiMustache,
  GiEyelashes:GiEyelashes,
  GiLips:GiLips
}


const ColorButton = (props: any) => {
  const { name, color, onSelectColor } = props
  const [selectedColor, setSelectedColor] = useState(color)
  const [displayPicker, setDisplayPicker] = useState(false)

  const colors = ['#3c4f5c', '#65c9ff', '#262e33', '#5199e4', '#25557c', '#929598', '#a7ffc4', '#b1e2ff', '#e6e6e6', '#ff5c5c', '#ff488e', '#ffafb9', '#ffdeb5', '#ffffb1', '#ffffff']

  const handleChange = (colorObject: any) => {
    setSelectedColor(colorObject.hex)
    onSelectColor(name, colorObject.hex)
  }

  const handleClick = () => {+
    setDisplayPicker(!displayPicker)
  }

  const handleClose = () => {
    setDisplayPicker(false)
  }

  useEffect(() => {
    setSelectedColor(color)
  }, [color])

  const styles = reactCSS({
      'default': {
        color: {
          width: '12px',
          height: '12px',
          borderRadius: '2px',
        },
        swatch: {
          padding: '2px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          marginLeft: '2px',
        },
        popover: {
          position: 'fixed',
          zIndex: '2',
          top: '10px',
          right: '10px',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ Object.assign(styles.color, {backgroundColor: selectedColor} )} />
      </div>
      { displayPicker ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        <SketchPicker onChange={ handleChange } width="180px" color={selectedColor}/>
      </div> : null }
    </div>
  )
}

interface iSelectedOptions {
  [key: string]: string | undefined | number
}

function getRandomSeed():number {
  return Math.floor(Math.random() * (10000 - 1000) + 1000)
}

function getCustomisation(name: string):iCustomisation{
  return customisations.filter(customisation => {
    return customisation.name === name
  })[0]
}

function getAvataaar(options: any): void {
  if(options.seed === undefined) {options.seed = getRandomSeed()}
  let uri:string = `https://api.dicebear.com/7.x/avataaars/svg?seed=${options.seed}`
  for (let [key, value] of Object.entries(options)) {
    const customisation = getCustomisation(key);

    // Probability
    if(customisation !== undefined && customisation["probability"] !== undefined) {
      let probability = value === "none" ? 0 : 100
      uri+=`&${customisation.probability}=${probability}`
    }

    // Ignored Keys
    if(["seed", "background"].includes(key as string)) continue

    // Ignored Values
    if(["default", "none"].includes(value as string)) continue

    if(typeof value === undefined) continue
    
    // Split Composite Color Keys
    if(key.includes(",")) {
      key.split(",").map( (k) => {
        uri+=`&${k}=${(value as string).substring(1)}`
      })
      continue
    } else if(key.endsWith("Color")){
      uri+=`&${key}=${(value as string).substring(1)}`
      continue
    }
    
    uri+=`&${key}=${value}`

  }
  console.log(uri)
  fetch(uri)
  .then(svg => svg.text())
  .then(svg => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: { avataaar: svg , options: options} }, '*')
    }
  })
}

function App() {
  const [selectedOptions, setSelectedOptions] = useState<iSelectedOptions>({
    seed: getRandomSeed()
  });

  const getSelectedOption = (key: string): any => {
    let localOptions = selectedOptions
    return localOptions[key]
  }

  const updateSelectedOption = (key: string, value: any) => {
    let localOptions = selectedOptions
    localOptions[key] = value
    setSelectedOptions(localOptions)
  }

  useEffect(() => {
    setSelectedOptions(selectedOptions)
    window.addEventListener("message", (msg: MessageEvent) => {
      setSelectedOptions(msg.data.pluginMessage.options)
      if(msg.data.pluginMessage.type === "randomise"){
        getAvataaar(msg.data.pluginMessage.options)
      }
    })
  }, [selectedOptions])

  return (
    <div className='App'>
      {/* <div className="row">
        <FaSeedling data-tip="Random Seed" />
        <Input
          className="full-width"
          defaultValue={decodeURI(selectedOptions.seed ? selectedOptions.seed.toString() : "")}
          onChange={(v) => updateSelectedOption("seed", encodeURI(v))}
          placeholder="Random Seed"
        />
      </div> */}
      {customisations.map((dropdown,i) => {
        const Icon = keysToIconsMap[dropdown.icon as keyof typeof keysToIconsMap]
        return (
          <>
            <div className="row">
              <Icon  data-tip={dropdown.placeholder} />
              { dropdown.options.length > 0 ? 
                <Select 
                defaultValue={selectedOptions[dropdown.name]}
                onChange={e => updateSelectedOption(dropdown.name, e.value)}
                options={dropdown.options}
                placeholder={dropdown.placeholder}
                />
                : <span className="color-only">{dropdown.placeholder}</span>
              }
              { dropdown.color &&
                <ColorButton name={dropdown.color} color={getSelectedOption(dropdown.color)} onSelectColor={updateSelectedOption}/>
              }
            </div>
          </>
        )
      })}
      <div className='push'></div>
      <div className='fixed-bottom'>
        <Button
          className="full-width"
          onClick={() => getAvataaar(selectedOptions)}
        >Update Avataaar</Button>
      </div>
      <ReactTooltip place="left" />
    </div>
  )
}

export default App